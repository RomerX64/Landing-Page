import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MercadoPagoConfig, PreApproval, Payment } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { CreateSubscriptionDto, CancelSubscriptionDto } from './dto/subscription.dto';
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
    this.client = new MercadoPagoConfig({
      accessToken: this.configService.get<string>('MERCADO_PAGO_ACCESS_TOKEN'),
      options: { timeout: 5000 },
    });
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    // Validar la existencia del plan
    const plan = await this.planRepository.findOne({
      where: { id: createSubscriptionDto.planId },
    });
    if (!plan) {
      throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
    }
    if (!createSubscriptionDto.userEmail || !createSubscriptionDto.paymentMethodToken) {
      throw new HttpException(
        'Datos incompletos para la suscripción',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Generar una clave única de idempotencia para cada solicitud
    this.client.options.idempotencyKey = uuidv4();
    const preApproval = new PreApproval(this.client);
    try {
      const response = await preApproval.create({
        body: {
          payer_email: createSubscriptionDto.userEmail,
          card_token_id: createSubscriptionDto.paymentMethodToken,
          status: 'authorized',
          auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
            transaction_amount: plan.precio,
            currency_id: 'USD', // Cambio a USD
          },
        },
      });

      if (!response || !response.id) {
        throw new HttpException(
          'No se recibió ID de suscripción de Mercado Pago',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newSubscription = this.subscriptionRepository.create({
        plan,
        fechaInicio: new Date(),
        mercadopagoSubscriptionId: response.id,
        status: SubscriptionStatus.ACTIVE,
      });
      await this.subscriptionRepository.save(newSubscription);

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
      throw new HttpException(
        'Error inesperado al crear la suscripción',
        HttpStatus.BAD_REQUEST,
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

    // Generar una clave única para la operación de cancelación
    this.client.options.idempotencyKey = uuidv4();
    const preApproval = new PreApproval(this.client);
    try {
      await preApproval.update({
        id: dto.subscriptionId,
        body: { status: 'cancelled' },
      });

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
