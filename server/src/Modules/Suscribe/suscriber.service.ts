import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MercadoPagoConfig, PreApproval } from 'mercadopago'; // Importación correcta
import {
  CreateSubscriptionDto,
  CancelSubscriptionDto,
} from './dto/subscription.dto';
import { Subscripcion, SubscriptionStatus } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';

// Configurar Mercado Pago correctamente
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_PUBLIC_KEY,
});

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscripcion)
    private readonly subscriptionRepository: Repository<Subscripcion>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async createSubscription(dto: CreateSubscriptionDto) {
    const plan = await this.planRepository.findOne({
      where: { id: dto.planId },
    });

    if (!plan) {
      throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
    }

    // Verifica que los datos del DTO son correctos
    if (!dto.userEmail || !dto.paymentMethodToken) {
      throw new HttpException(
        'Datos incompletos para la suscripción',
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log('Plan encontrado:', plan);

    const preApproval = new PreApproval(client); // Asegúrate de que 'client' esté correctamente configurado
    console.log('PreApproval creado:', preApproval);

    try {
      const response = await preApproval.create({
        body: {
          payer_email: dto.userEmail,
          card_token_id: dto.paymentMethodToken,
          status: 'authorized',
          auto_recurring: {
            frequency: 1, // Frecuencia del pago (ej. mensual)
            frequency_type: 'months', // Puede ser "days", "months", etc.
            transaction_amount: plan.precio, // Precio del plan
            currency_id: 'ARS', // Moneda de pago
          },
        },
      });

      console.log('Respuesta de Mercado Pago:', response);

      // Verifica si la respuesta contiene la suscripción y el ID de Mercado Pago
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

      console.log('Nueva suscripción creada:', newSubscription);

      await this.subscriptionRepository.save(newSubscription);

      return {
        message: 'Suscripción creada correctamente',
        subscription: newSubscription,
      };
    } catch (error) {
      console.error(
        'Error al crear la suscripción en Mercado Pago:',
        error.message || error.response?.data,
      );

      // Proporciona un error más detallado si la respuesta de Mercado Pago está presente
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

    const preApproval = new PreApproval(client);
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
      console.error(
        'Error al cancelar la suscripción en Mercado Pago:',
        error.message || error.response?.data,
      );
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
