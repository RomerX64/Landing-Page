// src/subscriptions/subscriptions.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateSubscriptionDto,
  CancelSubscriptionDto,
} from './dto/subscription.dto';
import { Subscripcion, SubscriptionStatus } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';

// Configuración de la API de Mercado Pago mediante variables de entorno
const MERCADO_PAGO_API_URL =
  process.env.MERCADO_PAGO_API_URL || 'https://api.mercadopago.com';
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscripcion)
    private readonly subscriptionRepository: Repository<Subscripcion>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  /**
   * Crea una suscripción:
   * 1. Valida que el plan exista.
   * 2. Llama a la API de Mercado Pago para crear la suscripción (ej.: "preapproval").
   * 3. Guarda la suscripción en la BD.
   */
  async createSubscription(dto: CreateSubscriptionDto) {
    // Validar que el plan exista
    const plan = await this.planRepository.findOne({
      where: { id: dto.planId },
    });
    if (!plan) {
      throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
    }

    // Construir el payload para Mercado Pago según su documentación
    const mpPayload = {
      plan_id: plan.mercadopagoPlanId, // ID del plan en Mercado Pago
      payer_email: dto.userEmail,
      token: dto.paymentMethodToken,
      // Puedes agregar más campos o metadata si es necesario
    };

    try {
      // Llamada a la API de Mercado Pago para crear la suscripción
      const response = await axios.post(
        `${MERCADO_PAGO_API_URL}/preapproval`,
        mpPayload,
        {
          params: {
            access_token: MERCADO_PAGO_ACCESS_TOKEN,
          },
        },
      );

      // Procesar la respuesta. Se asume que la respuesta tiene la propiedad "id"
      const mpSubscriptionId = response.data.id;
      const currentDate = new Date();

      // Crear la suscripción en la base de datos
      const newSubscription = this.subscriptionRepository.create({
        plan,
        fechaInicio: currentDate,
        fechaUltimaPaga: currentDate,
        fechaVencimiento: this.calculateExpiryDate(
          currentDate,
          plan.billingCycle,
        ),
        mercadopagoSubscriptionId: mpSubscriptionId,
        status: SubscriptionStatus.ACTIVE,
        // Aquí podrías relacionar el usuario, si lo creas o gestionas de otra forma
      });
      await this.subscriptionRepository.save(newSubscription);

      return {
        message: 'Suscripción creada correctamente',
        subscription: newSubscription,
      };
    } catch (error) {
      console.error(
        'Error al crear la suscripción en Mercado Pago:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        'Error al crear la suscripción en Mercado Pago',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Cancela una suscripción:
   * 1. Busca la suscripción en la base de datos.
   * 2. Llama a la API de Mercado Pago para cancelar la suscripción.
   * 3. Actualiza el estado en la BD.
   */
  async cancelSubscription(dto: CancelSubscriptionDto) {
    // Buscar la suscripción por su ID de Mercado Pago
    const subscription = await this.subscriptionRepository.findOne({
      where: { mercadopagoSubscriptionId: dto.subscriptionId },
    });
    if (!subscription) {
      throw new HttpException(
        'Suscripción no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      // Llamada a la API de Mercado Pago para cancelar la suscripción
      await axios.put(
        `${MERCADO_PAGO_API_URL}/preapproval/${dto.subscriptionId}`,
        {
          status: 'cancelled', // Parámetro de cancelación según la documentación
        },
        {
          params: {
            access_token: MERCADO_PAGO_ACCESS_TOKEN,
          },
        },
      );

      // Actualizar la suscripción en la BD
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
        error.response?.data || error.message,
      );
      throw new HttpException(
        'Error al cancelar la suscripción en Mercado Pago',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Procesa las notificaciones (webhooks) enviadas por Mercado Pago.
   * La lógica dependerá del contenido del payload recibido.
   */
  async handleWebhook(notification: any) {
    // Ejemplo: se asume que el notification contiene "id" y "action"
    const { id, action } = notification;

    // Buscar la suscripción asociada al ID de Mercado Pago
    const subscription = await this.subscriptionRepository.findOne({
      where: { mercadopagoSubscriptionId: id },
    });
    if (!subscription) {
      throw new HttpException(
        'Suscripción no encontrada para el webhook',
        HttpStatus.NOT_FOUND,
      );
    }

    // Actualizar la suscripción según la acción notificada
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

  /**
   * Calcula la fecha de vencimiento de la suscripción según el ciclo de facturación.
   */
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
