import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';

// Entity Imports
import { User as UserEntity } from '../User/User.entity';
import { Subscripcion, SubscriptionStatus } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';

// Service Imports
import { MailService } from '../Mail/mail.service';
import { ConfigService } from '@nestjs/config';

// DTO Imports
import CreateSubscriptionDto from './dto/createSubscription.dto';
import CancelSubscriptionDto from './dto/cancelSubscription.dto';

// Utility Imports
import { ErrorHandler } from 'src/Utils/Error.Handler';

interface MercadoPagoWebhookNotification {
  id?: string;
  action: string;
  data?: {
    id?: string;
  };
}

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
    @Inject(forwardRef(() => MailService))
    private readonly mailService: MailService,
    private configService: ConfigService,
  ) {
    this.initializeMercadoPago();
  }

  // Mercado Pago Initialization
  private initializeMercadoPago(): void {
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
   * Crea una suscripción utilizando la API de preaprobaciones de Mercado Pago
   * @param createSubscriptionDto Datos para crear la suscripción
   * @returns Objeto con mensaje y datos de la suscripción creada
   */
  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    console.log(`Creando suscripción para: ${createSubscriptionDto.userEmail}`);

    // Validaciones
    this.validateSubscriptionData(createSubscriptionDto);

    // Obtener plan
    const plan = await this.getPlanById(createSubscriptionDto.planId);

    // Crear suscripción en Mercado Pago
    const preApproval = new PreApproval(this.client);
    const idempotencyKey = uuidv4();

    try {
      // Fetch plan details directly from Mercado Pago API
      const planResponse = await this.fetchMercadoPagoPlanDetails(
        plan.mercadopagoPlanId,
      );

      try {
        const response = await preApproval.create({
          body: {
            payer_email: createSubscriptionDto.userEmail,
            reason: `Suscripcion a Assetly - ${planResponse.reason}`,
            card_token_id: createSubscriptionDto.paymentMethodToken,
            status: 'pending',
            preapproval_plan_id: planResponse.id,
            back_url: planResponse.back_url,
          },
          requestOptions: {
            idempotencyKey: idempotencyKey,
          },
        });

        console.debug('Respuesta de Mercado Pago:', response);

        if (!response || !response.id) {
          throw new Error('No se recibió ID de suscripción de Mercado Pago');
        }

        // Obtener usuario y crear suscripción local
        return await this.saveSubscriptionData(
          createSubscriptionDto.userId,
          plan,
          response,
        );
      } catch (error) {
        // Verificar específicamente si el error es por usuario no existente
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message.includes('payer_email')
        ) {
          // Reintentar sin especificar el correo electrónico
          const response = await preApproval.create({
            body: {
              reason: planResponse.reason,
              card_token_id: createSubscriptionDto.paymentMethodToken,
              status: 'pending',
              preapproval_plan_id: planResponse.id,
              back_url: planResponse.back_url,
            },
            requestOptions: {
              idempotencyKey: idempotencyKey,
            },
          });

          console.debug('Respuesta de Mercado Pago (sin email):', response);

          if (!response || !response.id) {
            throw new Error('No se recibió ID de suscripción de Mercado Pago');
          }

          // Obtener usuario y crear suscripción local
          return await this.saveSubscriptionData(
            createSubscriptionDto.userEmail,
            plan,
            response,
          );
        }

        // Si es otro tipo de error, manejarlo como antes
        return this.handleSubscriptionError(error);
      }
    } catch (error) {
      return this.handleSubscriptionError(error);
    }
  }

  // Método privado para obtener detalles del plan desde Mercado Pago
  private async fetchMercadoPagoPlanDetails(planId: string) {
    try {
      const response = await fetch(
        `https://api.mercadopago.com/preapproval_plan/${planId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.configService.get<string>('MERCADO_PAGO_ACCESS_TOKEN')}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new HttpException(
          `Error al obtener detalles del plan de Mercado Pago: ${response.statusText}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const planDetails = await response.json();

      // Validar que el plan esté activo
      if (planDetails.status !== 'active') {
        throw new HttpException(
          `El plan ${planId} no está activo. Estado actual: ${planDetails.status}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return planDetails;
    } catch (error) {
      console.error(
        'Error al obtener detalles del plan de Mercado Pago:',
        error,
      );
      throw new HttpException(
        `Error al obtener detalles del plan: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Cancela una suscripción en Mercado Pago y actualiza su estado en la base de datos
   * @param dto Datos para cancelar la suscripción
   * @returns Objeto con mensaje y datos de la suscripción cancelada
   */
  async cancelSubscription(dto: CancelSubscriptionDto) {
    console.log(`Cancelando suscripción: ${dto.subscriptionId}`);

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

      return {
        message: 'Suscripción cancelada correctamente',
        subscription,
      };
    } catch (error) {
      console.error('Error al cancelar suscripción:', error);
      throw new HttpException(
        `Error al cancelar la suscripción: ${error.message || 'Error desconocido'}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Webhook de Mercado Pago para procesar eventos de suscripción
   * @param notification Datos de la notificación de Mercado Pago
   */
  async handleWebhook(notification: MercadoPagoWebhookNotification) {
    console.log(`Webhook recibido: ${JSON.stringify(notification)}`);

    try {
      const subscriptionId = notification.data?.id;

      if (!subscriptionId) {
        throw new HttpException(
          'ID de suscripción no encontrado en la notificación',
          HttpStatus.BAD_REQUEST,
        );
      }

      const subscription = await this.findSubscriptionById(subscriptionId);

      if (!subscription) {
        console.warn(
          `Suscripción no encontrada para el webhook: ${subscriptionId}`,
        );
        throw new HttpException(
          'Suscripción no encontrada para el webhook',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.processWebhookAction(
        subscription,
        notification.action,
        notification,
      );

      return {
        success: true,
        message: 'Webhook procesado correctamente',
        subscriptionId,
      };
    } catch (error) {
      console.error('Error al procesar webhook:', error);
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Procesa la acción específica del webhook
   */
  private async processWebhookAction(
    subscription: Subscripcion,
    action: string,
    notification: MercadoPagoWebhookNotification,
  ) {
    const statusMap = {
      'payment.created': () => this.handlePaymentCreated(subscription),
      'payment.updated': () => this.handlePaymentUpdated(subscription),
      payment_approved: () => this.handlePaymentApproved(subscription),
      'payment.failed': () => this.handlePaymentFailed(subscription),
      payment_failed: () => this.handlePaymentFailed(subscription),
      'subscription.cancelled': () =>
        this.handleSubscriptionCancelled(subscription, notification),
      subscription_cancelled: () =>
        this.handleSubscriptionCancelled(subscription, notification),
      'subscription.expired': () =>
        this.handleSubscriptionExpired(subscription),
      subscription_expired: () => this.handleSubscriptionExpired(subscription),
      'subscription.renewed': () =>
        this.handleSubscriptionRenewed(subscription),
      subscription_renewed: () => this.handleSubscriptionRenewed(subscription),
      'subscription.paused': () => this.handleSubscriptionPaused(subscription),
      subscription_paused: () => this.handleSubscriptionPaused(subscription),
    };

    const handler = statusMap[action];
    if (handler) {
      await handler();
    } else {
      console.warn(`Acción de webhook no manejada: ${action}`);
    }
  }

  // Handlers para diferentes eventos de webhook
  // Handlers para diferentes eventos de webhook
  private async handlePaymentCreated(subscription: Subscripcion) {
    subscription.status = SubscriptionStatus.APPROVED;
    subscription.fechaUltimaPaga = new Date();
    await this.subscriptionRepository.save(subscription);
    console.log('Pago creado, suscripción aprobada');

    // Enviar correo de notificación
    try {
      await this.mailService.subscriptionStatusChange(
        subscription.user.email,
        SubscriptionStatus.APPROVED,
        subscription.plan.name,
      );
    } catch (error) {
      console.error('Error al enviar correo de aprobación:', error);
    }
  }

  private async handlePaymentUpdated(subscription: Subscripcion) {
    subscription.status = SubscriptionStatus.APPROVED;
    await this.subscriptionRepository.save(subscription);
    console.log('Pago actualizado');

    // No enviamos correo aquí, ya que es solo una actualización interna
  }

  private async handlePaymentApproved(subscription: Subscripcion) {
    subscription.status = SubscriptionStatus.ACTIVE;
    subscription.fechaUltimaPaga = new Date();
    await this.subscriptionRepository.save(subscription);
    console.log('Pago aprobado, suscripción activada');

    // Enviar correo de notificación de pago y activación
    try {
      // Notificar sobre el pago recibido
      await this.mailService.paymentReceived(
        subscription.user.email,
        subscription.plan.name,
        subscription.plan.precio,
        subscription.fechaUltimaPaga,
      );

      // Notificar sobre el cambio de estado
      await this.mailService.subscriptionStatusChange(
        subscription.user.email,
        SubscriptionStatus.ACTIVE,
        subscription.plan.name,
      );
    } catch (error) {
      console.error('Error al enviar correos de pago aprobado:', error);
    }
  }

  private async handlePaymentFailed(subscription: Subscripcion) {
    subscription.status = SubscriptionStatus.REJECTED;
    await this.subscriptionRepository.save(subscription);
    console.log('Pago fallido, suscripción rechazada');

    // Enviar correo de notificación
    try {
      await this.mailService.subscriptionStatusChange(
        subscription.user.email,
        SubscriptionStatus.REJECTED,
        subscription.plan.name,
      );
    } catch (error) {
      console.error('Error al enviar correo de pago fallido:', error);
    }
  }

  private async handleSubscriptionCancelled(
    subscription: Subscripcion,
    notification: MercadoPagoWebhookNotification,
  ) {
    subscription.status = SubscriptionStatus.CANCELLED;
    subscription.cancellationDate = new Date();
    subscription.cancellationReason = 'Cancelado por Mercado Pago';
    await this.subscriptionRepository.save(subscription);
    console.log('Suscripción cancelada');

    // Enviar correo de notificación
    try {
      await this.mailService.subscriptionStatusChange(
        subscription.user.email,
        SubscriptionStatus.CANCELLED,
        subscription.plan.name,
      );
    } catch (error) {
      console.error('Error al enviar correo de cancelación:', error);
    }
  }

  private async handleSubscriptionExpired(subscription: Subscripcion) {
    subscription.status = SubscriptionStatus.EXPIRED;
    await this.subscriptionRepository.save(subscription);
    console.log('Suscripción expirada');

    // Enviar correo de notificación
    try {
      await this.mailService.subscriptionStatusChange(
        subscription.user.email,
        SubscriptionStatus.EXPIRED,
        subscription.plan.name,
      );
    } catch (error) {
      console.error('Error al enviar correo de expiración:', error);
    }
  }

  private async handleSubscriptionRenewed(subscription: Subscripcion) {
    subscription.fechaUltimaPaga = new Date();
    subscription.fechaVencimiento = this.calculateExpiryDate(
      new Date(),
      subscription.plan.billingCycle,
    );
    await this.subscriptionRepository.save(subscription);
    console.log('Suscripción renovada');

    // Enviar correo de notificación
    try {
      await this.mailService.paymentReceived(
        subscription.user.email,
        subscription.plan.name,
        subscription.plan.precio,
        subscription.fechaUltimaPaga,
      );
    } catch (error) {
      console.error('Error al enviar correo de renovación:', error);
    }
  }

  private async handleSubscriptionPaused(subscription: Subscripcion) {
    subscription.status = SubscriptionStatus.PAUSED;
    await this.subscriptionRepository.save(subscription);
    console.log('Suscripción pausada');

    // Enviar correo de notificación
    try {
      await this.mailService.subscriptionStatusChange(
        subscription.user.email,
        SubscriptionStatus.PAUSED,
        subscription.plan.name,
      );
    } catch (error) {
      console.error('Error al enviar correo de pausa:', error);
    }
  }
  /**
   * Aprueba manualmente una suscripción que está en estado pendiente
   * @param subscriptionId ID de la suscripción en Mercado Pago
   * @returns Objeto con mensaje y datos de la suscripción aprobada
   */
  async approveSubscription(subscriptionId: string) {
    console.log(`Aprobando suscripción: ${subscriptionId}`);

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

    return {
      message: 'Suscripción aprobada correctamente',
      subscription,
    };
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

  // Métodos privados auxiliares
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
    let user = await this.userRepository.findOne({
      where: { email: userEmail },
      relations: ['subscripcion'],
    });

    // Si el usuario no existe, lo creamos
    if (!user) {
      // Creamos un nuevo usuario
      const newUser = this.userRepository.create({
        email: userEmail,
      });

      user = await this.userRepository.save(newUser);
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

    await this.mailService.newSubscription(userEmail);

    return {
      message: 'Suscripción creada correctamente en estado pendiente',
      subscription: savedSubscription,
    };
  }

  private async handleExistingSubscription(user: UserEntity) {
    console.log(`Cancelando suscripción existente para usuario: ${user.email}`);
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
      console.error('Error al cancelar suscripción existente:', error);
      // Continuamos con la nueva suscripción aunque falle la cancelación de la anterior
    }
  }

  private handleSubscriptionError(error: any) {
    console.error('Error al crear suscripción:', error);

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

  private async findSubscriptionById(subscriptionId: string) {
    return await this.subscriptionRepository.findOne({
      where: { mercadopagoSubscriptionId: subscriptionId },
      relations: ['plan', 'user'],
    });
  }

  /**
   * Calcula la fecha de vencimiento basada en el ciclo de facturación
   * @param startDate Fecha de inicio
   * @param billingCycle Ciclo de facturación
   * @returns Fecha de vencimiento
   */
  private calculateExpiryDate(startDate: Date, billingCycle: string): Date {
    const expiryDate = new Date(startDate);

    switch (billingCycle) {
      case 'weekly':
        expiryDate.setDate(expiryDate.getDate() + 7);
        break;
      case 'biweekly':
        expiryDate.setDate(expiryDate.getDate() + 14);
        break;
      case 'monthly':
      default:
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        break;
      case 'yearly':
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        break;
    }

    return expiryDate;
  }

  /**
   * Obtiene información detallada de una suscripción
   * @param subscriptionId ID de la suscripción
   * @returns Detalles de la suscripción
   */
  async getSubscriptionDetails(subscriptionId: string) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
      relations: ['user', 'plan'],
    });

    if (!subscription) {
      throw new HttpException(
        'Suscripción no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      id: subscription.id,
      status: subscription.status,
      plan: {
        id: subscription.plan.id,
        name: subscription.plan.name,
        price: subscription.plan.precio,
      },
      user: {
        id: subscription.user.id,
        email: subscription.user.email,
      },
      startDate: subscription.fechaInicio,
      lastPaymentDate: subscription.fechaUltimaPaga,
      expiryDate: subscription.fechaVencimiento,
      mercadoPagoSubscriptionId: subscription.mercadopagoSubscriptionId,
    };
  }

  /**
   * Verifica y actualiza suscripciones expiradas
   * @returns Número de suscripciones actualizadas
   */
  async checkAndUpdateExpiredSubscriptions() {
    const now = new Date();
    const expiredSubscriptions = await this.subscriptionRepository.find({
      where: {
        status: SubscriptionStatus.ACTIVE,
        fechaVencimiento: LessThan(now),
      },
      relations: ['user', 'plan'],
    });

    const updatedSubscriptions = [];

    for (const subscription of expiredSubscriptions) {
      subscription.status = SubscriptionStatus.EXPIRED;
      await this.subscriptionRepository.save(subscription);
      updatedSubscriptions.push(subscription.id);

      // Opcional: Notificar al usuario sobre la expiración
      console.log(`Suscripción expirada: ${subscription.id}`);
    }

    return {
      totalExpired: expiredSubscriptions?.length,
      updatedSubscriptionIds: updatedSubscriptions,
    };
  }
}

export default SubscriptionsService;
