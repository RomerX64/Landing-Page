import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MercadoPagoConfig, PreApproval, User } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { User as UserEntity } from '../User/User.entity';
import { ConfigService } from '@nestjs/config';
import { Subscripcion, SubscriptionStatus } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';
import { UserService } from '../User/users.service';
import CreateSubscriptionDto from './dto/createSubscription.dto';
import CancelSubscriptionDto from './dto/cancelSubscription.dto';
import { ErrorHandler } from 'src/Utils/Error.Handler';

@Injectable()
export class SubscriptionsService {
  private client: MercadoPagoConfig;
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(
    @InjectRepository(Subscripcion)
    private readonly subscriptionRepository: Repository<Subscripcion>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {
    this.initializeMercadoPago();
  }

  private initializeMercadoPago() {
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
   * @param createSubscriptionDto Datos para crear la suscripción
   * @returns Objeto con mensaje y datos de la suscripción creada
   */
  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    this.logger.log(
      `Creando suscripción para: ${createSubscriptionDto.userEmail}`,
    );

    // Validaciones
    this.validateSubscriptionData(createSubscriptionDto);

    // Obtener plan
    const plan = await this.getPlanById(createSubscriptionDto.planId);

    // Crear suscripción en Mercado Pago
    const preApproval = new PreApproval(this.client);
    const idempotencyKey = uuidv4();

    try {
      const response = await preApproval.create({
        body: {
          payer_email: createSubscriptionDto.userEmail,
          reason: `Subscripción a Assetly - Plan ${plan.name || 'Premium'}`,
          card_token_id: createSubscriptionDto.paymentMethodToken,
          status: 'authorized',
          back_url:
            this.configService.get<string>('SUBSCRIPTION_SUCCESS_URL') ||
            'https://assetly-m977.onrender.com/success',
          auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
            transaction_amount: plan.precio || 200,
            currency_id: 'ARS',
          },
        },
        requestOptions: {
          idempotencyKey: idempotencyKey,
        },
      });

      this.logger.debug('Respuesta de Mercado Pago:', response);

      if (!response || !response.id) {
        throw new Error('No se recibió ID de suscripción de Mercado Pago');
      }

      // Obtener usuario y crear suscripción local
      return await this.saveSubscriptionData(
        createSubscriptionDto.userEmail,
        plan,
        response,
      );
    } catch (error) {
      this.handleSubscriptionError(error);
    }
  }

  /**
   * Cancela una suscripción en Mercado Pago y actualiza su estado en la base de datos
   * @param dto Datos para cancelar la suscripción
   * @returns Objeto con mensaje y datos de la suscripción cancelada
   */
  async cancelSubscription(dto: CancelSubscriptionDto) {
    this.logger.log(`Cancelando suscripción: ${dto.subscriptionId}`);

    const subscription = await this.subscriptionRepository.findOne({
      where: { mercadopagoSubscriptionId: dto.subscriptionId },
      relations: ['user'],
    });

    if (!subscription) {
      throw new HttpException(
        'Suscripción no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    const preApproval = new PreApproval(this.client);

    try {
      await preApproval.update({
        id: dto.subscriptionId,
        body: { status: 'cancelled' },
        requestOptions: {
          idempotencyKey: uuidv4(),
        },
      });

      // Actualizar estado de suscripción local
      subscription.status = SubscriptionStatus.CANCELLED;
      subscription.cancellationDate = new Date();
      subscription.cancellationReason =
        dto.cancellationReason || 'Cancelado por el usuario';
      await this.subscriptionRepository.save(subscription);

      // Notificar al usuario si es necesario
      if (subscription.user && subscription.user.email) {
        // Aquí podrías implementar el envío de notificaciones por email
        this.logger.log(
          `Notificación de cancelación enviada a: ${subscription.user.email}`,
        );
      }

      return {
        message: 'Suscripción cancelada correctamente',
        subscription,
      };
    } catch (error) {
      this.logger.error('Error al cancelar suscripción:', error);
      throw new HttpException(
        `Error al cancelar la suscripción: ${error.message || 'Error desconocido'}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Aprueba manualmente una suscripción que está en estado pendiente
   * @param subscriptionId ID de la suscripción en Mercado Pago
   * @returns Objeto con mensaje y datos de la suscripción aprobada
   */
  async approveSubscription(subscriptionId: string) {
    this.logger.log(`Aprobando suscripción: ${subscriptionId}`);

    const subscription = await this.subscriptionRepository.findOne({
      where: { mercadopagoSubscriptionId: subscriptionId },
      relations: ['user', 'plan'],
    });

    if (!subscription) {
      throw new HttpException(
        'Suscripción no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    if (subscription.status !== SubscriptionStatus.PENDING) {
      throw new HttpException(
        `La suscripción no está en estado pendiente. Estado actual: ${subscription.status}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Actualizar estado en la base de datos
    subscription.status = SubscriptionStatus.ACTIVE;
    subscription.fechaUltimaPaga = new Date();
    subscription.fechaVencimiento = this.calculateExpiryDate(
      new Date(),
      subscription.plan.billingCycle,
    );

    await this.subscriptionRepository.save(subscription);

    // Activar beneficios del plan para el usuario
    if (subscription.user) {
      this.logger.log(
        `Activando beneficios para usuario ${subscription.user.id}`,
      );
      // Aquí podrías implementar la lógica para activar beneficios
    }

    return {
      message: 'Suscripción aprobada correctamente',
      subscription,
    };
  }

  /**
   * Maneja los webhooks entrantes de Mercado Pago para actualizar el estado de las suscripciones
   * @param notification Datos de la notificación de Mercado Pago
   */
  async handleWebhook(notification: any) {
    this.logger.log(`Webhook recibido: ${JSON.stringify(notification)}`);

    try {
      const { id, action, data } = notification;

      // Obtener el ID correcto dependiendo del formato del webhook
      const subscriptionId = id || (data && data.id);

      if (!subscriptionId) {
        throw new HttpException(
          'ID de suscripción no encontrado en la notificación',
          HttpStatus.BAD_REQUEST,
        );
      }

      const subscription = await this.subscriptionRepository.findOne({
        where: { mercadopagoSubscriptionId: subscriptionId },
        relations: ['plan', 'user'],
      });

      if (!subscription) {
        this.logger.warn(
          `Suscripción no encontrada para el webhook: ${subscriptionId}`,
        );
        throw new HttpException(
          'Suscripción no encontrada para el webhook',
          HttpStatus.NOT_FOUND,
        );
      }

      // Actualizar estado según la acción del webhook
      await this.updateSubscriptionStatus(subscription, action, notification);

      return { success: true, message: 'Webhook procesado correctamente' };
    } catch (error) {
      this.logger.error('Error al procesar webhook:', error);
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Métodos privados auxiliares
   */

  private validateSubscriptionData(
    createSubscriptionDto: CreateSubscriptionDto,
  ) {
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
        'Datos incompletos para la suscripción. Se requiere email de usuario y token de método de pago.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async getPlanById(planId: number) {
    const plan = await this.planRepository.findOne({
      where: { id: planId },
    });

    if (!plan) {
      throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
    }

    return plan;
  }

  private async saveSubscriptionData(
    userEmail: string,
    plan: Plan,
    mpResponse: any,
  ) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
      relations: ['subscripcion'],
    });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Si el usuario ya tiene una suscripción activa, la cancelamos
    if (
      user.subscripcion &&
      [SubscriptionStatus.ACTIVE, SubscriptionStatus.PENDING].includes(
        user.subscripcion.status,
      )
    ) {
      await this.handleExistingSubscription(user);
    }

    const newSubscription = this.subscriptionRepository.create({
      plan,
      fechaInicio: new Date(),
      mercadopagoSubscriptionId: mpResponse.id,
      status: SubscriptionStatus.PENDING, // Siempre inicia como pendiente
      user: user,
      fechaVencimiento: this.calculateExpiryDate(new Date(), plan.billingCycle),
      paymentMethodId: mpResponse.payment_method_id,
    });

    const savedSubscription =
      await this.subscriptionRepository.save(newSubscription);

    user.subscripcion = savedSubscription;
    await this.userRepository.save(user);

    return {
      message: 'Suscripción creada correctamente en estado pendiente',
      subscription: savedSubscription,
    }; 
  }

  private async handleExistingSubscription(user: UserEntity) {
    this.logger.log(
      `Cancelando suscripción existente para usuario: ${user.email}`,
    );
    try {
      if (user.subscripcion.mercadopagoSubscriptionId) {
        // Cancelar en Mercado Pago
        const preApproval = new PreApproval(this.client);
        await preApproval.update({
          id: user.subscripcion.mercadopagoSubscriptionId,
          body: { status: 'cancelled' },
          requestOptions: {
            idempotencyKey: uuidv4(),
          },
        });
      }

      // Actualizar estado en BD
      user.subscripcion.status = SubscriptionStatus.CANCELLED;
      user.subscripcion.cancellationDate = new Date();
      user.subscripcion.cancellationReason =
        'Reemplazado por nueva suscripción';
      await this.subscriptionRepository.save(user.subscripcion);
    } catch (error) {
      this.logger.error('Error al cancelar suscripción existente:', error);
      // Continuamos con la nueva suscripción aunque falle la cancelación de la anterior
    }
  }

  private handleSubscriptionError(error: any) {
    this.logger.error('Error al crear suscripción:', error);

    if (error.response?.data) {
      throw new HttpException(
        `Error al crear la suscripción en Mercado Pago: ${error.response.data.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    throw new HttpException(
      `Error inesperado al crear la suscripción: ${error.message || 'Error desconocido'}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private async updateSubscriptionStatus(
    subscription: Subscripcion,
    action: string,
    notification: any,
  ) {
    const previousStatus = subscription.status;
    let statusChanged = false;

    switch (action) {
      case 'payment.created':
      case 'payment.updated':
      case 'payment_approved':
        // Registramos la fecha del pago pero mantenemos el estado como PENDING
        subscription.status = SubscriptionStatus.APPROVED;
        subscription.fechaUltimaPaga = new Date();
        // Solo actualizamos la fecha de vencimiento
        subscription.fechaVencimiento = this.calculateExpiryDate(
          new Date(),
          subscription.plan.billingCycle,
        );
        this.logger.log(
          'Pago recibido, la suscripción permanece en estado pendiente hasta aprobación manual',
        );
        break;

      case 'payment.failed':
      case 'payment_failed':
        subscription.status = SubscriptionStatus.REJECTED;
        statusChanged = true;
        break;

      case 'subscription.cancelled':
      case 'subscription_cancelled':
        subscription.status = SubscriptionStatus.CANCELLED;
        subscription.cancellationDate = new Date();
        subscription.cancellationReason =
          notification.reason || 'Cancelado por Mercado Pago';
        statusChanged = true;
        break;

      case 'subscription.expired':
      case 'subscription_expired':
        subscription.status = SubscriptionStatus.EXPIRED;
        statusChanged = true;
        break;

      case 'subscription.renewed':
      case 'subscription_renewed':
        // Solo actualizamos fechas, mantenemos el estado como PENDING
        subscription.fechaUltimaPaga = new Date();
        subscription.fechaVencimiento = this.calculateExpiryDate(
          new Date(),
          subscription.plan.billingCycle,
        );
        this.logger.log(
          'Suscripción renovada, permanece en estado pendiente hasta aprobación manual',
        );
        break;

      case 'subscription.paused':
      case 'subscription_paused':
        subscription.status = SubscriptionStatus.PAUSED;
        statusChanged = true;
        break;

      case 'subscription.updated':
      case 'subscription_updated':
        // Aquí podríamos actualizar otros campos según sea necesario
        this.logger.log(
          `Actualización de suscripción: ${JSON.stringify(notification)}`,
        );
        break;

      default:
        this.logger.warn(`Acción de webhook no manejada: ${action}`);
        break;
    }

    await this.subscriptionRepository.save(subscription);

    if (statusChanged && previousStatus !== subscription.status) {
      this.logger.log(
        `Cambio de estado en suscripción ${subscription.id}: ${previousStatus} -> ${subscription.status}`,
      );

      // Notificaciones adicionales según el cambio de estado
      if (
        subscription.user &&
        subscription.status === SubscriptionStatus.CANCELLED
      ) {
        this.logger.log(
          `Notificando cancelación al usuario ${subscription.user.id}`,
        );
        // Implementar notificación de cancelación
      }
    }
  }

  /**
   * Obtiene todas las suscripciones pendientes
   * @returns Lista de suscripciones en estado pendiente
   */
  async getPendingSubscriptions() {
    return await this.subscriptionRepository.find({
      where: { status: SubscriptionStatus.PENDING },
      relations: ['user', 'plan'],
    });
  }

  /**
   * Obtiene las suscripciones de un usuario
   * @param userId ID del usuario
   * @returns Lista de suscripciones del usuario
   */
  async getUserSubscriptions(userId: string) {
    return await this.subscriptionRepository.find({
      where: { user: { id: userId } },
      relations: ['plan'],
    });
  }

  private calculateExpiryDate(startDate: Date, billingCycle: string): Date {
    const expiryDate = new Date(startDate);
    if (!billingCycle || billingCycle === 'monthly') {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (billingCycle === 'yearly') {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else if (billingCycle === 'weekly') {
      expiryDate.setDate(expiryDate.getDate() + 7);
    } else if (billingCycle === 'biweekly') {
      expiryDate.setDate(expiryDate.getDate() + 14);
    }
    return expiryDate;
  }
}
