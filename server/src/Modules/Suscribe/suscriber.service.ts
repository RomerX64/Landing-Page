import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import {
  CreateSubscriptionDto,
  CancelSubscriptionDto,
} from './dto/subscription.dto';
import { Subscripcion, SubscriptionStatus } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';

@Injectable()
export class SubscriptionsService {
  private client: MercadoPagoConfig;

  constructor(
    @InjectRepository(Subscripcion)
    private readonly subscriptionRepository: Repository<Subscripcion>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    private configService: ConfigService,
  ) {
    const accessToken = this.configService.get<string>(
      'MERCADO_PAGO_ACCESS_TOKEN',
    );
    if (!accessToken) {
      throw new Error(
        'MERCADO_PAGO_ACCESS_TOKEN no está definido en las variables de entorno',
      );
    }
    this.client = new MercadoPagoConfig({
      accessToken,
      options: { timeout: 5000 },
    });
  }

  /**
   * Crea una suscripción utilizando la API de preaprobaciones.
   * Esta API (https://api.mercadopago.com/preapproval) se encarga de gestionar pagos recurrentes.
   */
  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    if (!createSubscriptionDto.planId) {
      throw new HttpException(
        'ID del plan es requerido',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      !createSubscriptionDto.userEmail ||
      !createSubscriptionDto.paymentMethodToken
    ) {
      throw new HttpException(
        'Datos incompletos para la suscripción',
        HttpStatus.BAD_REQUEST,
      );
    }

    const plan = await this.planRepository.findOne({
      where: { id: createSubscriptionDto.planId },
    });
    if (!plan) {
      throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
    }

    // Instanciamos el objeto PreApproval, el cual utilizará la API /preapproval de Mercado Pago.
    const preApproval = new PreApproval(this.client);
    const idempotencyKey = uuidv4();
    console.log('preApproval', preApproval);

    try {
      const response = await preApproval.create({
        body: {
          payer_email: createSubscriptionDto.userEmail,
          reason: 'Subscripción a Assetly',
          card_token_id: createSubscriptionDto.paymentMethodToken,
          status: 'authorized',
          back_url:
            'https://assetly-landing-page-backend.onrender.com/payment/success',
          auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
            transaction_amount: 100,
            currency_id: 'ARS',
          },
        },
        requestOptions: {
          idempotencyKey: idempotencyKey,
        },
      });

      console.log('response', response);

      if (!response || !response.id) {
        throw new Error('No se recibió ID de suscripción de Mercado Pago');
      }

      // Se guarda la suscripción en la base de datos
      const newSubscription = this.subscriptionRepository.create({
        plan,
        fechaInicio: new Date(),
        mercadopagoSubscriptionId: response.id,
        status: SubscriptionStatus.ACTIVE,
      });

      await this.subscriptionRepository.save(newSubscription);

      console.log(`Suscripción creada con ID: ${newSubscription.id}`);

      return {
        message: 'Suscripción creada correctamente',
        subscription: newSubscription,
      };
    } catch (error) {
      if (error.response?.data) {
        throw new HttpException(
          `Error al crear la suscripción en Mercado Pago: ${error.response.data.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      console.error('Error inesperado al crear la suscripción:', error);
      throw new HttpException(
        'Error inesperado al crear la suscripción',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async cancelSubscription(dto: CancelSubscriptionDto) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { mercadopagoSubscriptionId: dto.subscriptionId },
    });
    if (!subscription) {
      throw new HttpException(
        'Suscripción no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    // Se genera una clave idempotente para la cancelación
    this.client.options.idempotencyKey = uuidv4();
    const preApproval = new PreApproval(this.client);
    try {
      // Se actualiza la suscripción en Mercado Pago estableciendo el estado "cancelled"
      await preApproval.update({
        id: dto.subscriptionId,
        body: { status: 'cancelled' },
      });

      // Actualizamos el registro local
      subscription.status = SubscriptionStatus.CANCELLED;
      subscription.cancellationDate = new Date();
      subscription.cancellationReason = dto.cancellationReason;
      await this.subscriptionRepository.save(subscription);

      return {
        message: 'Suscripción cancelada correctamente',
        subscription,
      };
    } catch (error) {
      throw new HttpException(
        'Error al cancelar la suscripción',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async handleWebhook(notification: any) {
    const { id, action } = notification;
    const subscription = await this.subscriptionRepository.findOne({
      where: { mercadopagoSubscriptionId: id },
    });
    if (!subscription) {
      throw new HttpException(
        'Suscripción no encontrada para el webhook',
        HttpStatus.NOT_FOUND,
      );
    }

    if (action === 'payment_approved') {
      subscription.fechaUltimaPaga = new Date();
      subscription.fechaVencimiento = this.calculateExpiryDate(
        new Date(),
        subscription.plan.billingCycle,
      );
      subscription.status = SubscriptionStatus.ACTIVE;
    } else if (action === 'payment_failed') {
      subscription.status = SubscriptionStatus.PAUSED;
    } else if (action === 'subscription_cancelled') {
      subscription.status = SubscriptionStatus.CANCELLED;
      subscription.cancellationDate = new Date();
      subscription.cancellationReason =
        notification.reason || 'No especificado';
    }
    await this.subscriptionRepository.save(subscription);
  }

  private calculateExpiryDate(startDate: Date, billingCycle: string): Date {
    const expiryDate = new Date(startDate);
    if (billingCycle === 'monthly') {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (billingCycle === 'yearly') {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }
    return expiryDate;
  }
}
