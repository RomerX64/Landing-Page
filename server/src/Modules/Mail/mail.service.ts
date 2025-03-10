import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { SubscriptionStatus } from '../User/Subscripcion.entity';
import { ContactMessage } from './dto/contact.message';
import { ErrorHandler } from 'src/Utils/Error.Handler';
import { AccessDataDto } from './dto/acces.service.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    // Crea el transporter usando la configuración SMTP definida en las variables de entorno
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<boolean>('SMTP_SECURE'),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async verifyPasswordResetToken(
    token: string,
  ): Promise<{ email: string; userId: string }> {
    try {
      const decoded = this.jwtService.verify(token);

      // Validación adicional: se comprueba el tipo de token
      if (decoded.type !== 'password_reset') {
        throw new Error('Tipo de token inválido');
      }

      return {
        email: decoded.email,
        userId: decoded.userId,
      };
    } catch (error) {
      throw new Error('Token de reseteo inválido o expirado');
    }
  }

  /**
   * Envía el correo de verificación al usuario después de registrarse.
   * @param email Dirección de correo del usuario.
   * @param userId Identificador único del usuario.
   */
  async sendVerificationEmail(email: string, userId: string): Promise<void> {
    // Genera el token de verificación (1 hora de vigencia)
    const token = this.jwtService.sign(
      { email, userId, type: 'email_verification' },
      { expiresIn: '1h' },
    );
    // Construye el enlace de verificación
    const verificationLink = `${this.configService.get<string>('FRONTEND_URL')}/verify-email/token=${token}`;

    // Define el contenido HTML del correo
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_FROM', 'noreply@assetly.com'),
      to: email,
      subject: 'Verifica tu email - Assetly',
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #030712; border-radius: 10px">
        <div style="text-align: center; padding: 20px; background-color: #4f46e5; color: white; border-radius: 8px 8px 0px 0px">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Assetly</h1>
          <p style="margin: 0; font-size: 20px; font-weight: 600;">Verifica tu email</p>
        </div>
        <div style="padding: 20px; background-color: #111827; color: #ffffff; font-size: 16px;">
          <p>Hola,</p>
          <p>Hemos recibido una solicitud para verificar tu correo. Haz clic en el botón de abajo para continuar.</p>
          <div style="text-align: center; margin: 20px 0">
            <a href="${verificationLink}" style="padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500;">
              Verificar Email →
            </a>
          </div>
          <p>Este enlace expirará en 1 hora.</p>
          <p>Si no solicitaste este cambio, ignora este correo.</p>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #1f2937; color: white; font-size: 14px; border-radius: 0px 0px 8px 8px">
          <p>© 2025 Assetly. Todos los derechos reservados.</p>
        </div>
    </div>`,
    };

    // Envía el correo
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Envía el correo de reseteo de contraseña al usuario.
   * @param email Dirección de correo del usuario.
   * @param userId Identificador único del usuario.
   */
  async sendPasswordResetEmail(email: string, userId: string): Promise<void> {
    // Genera el token de reseteo (30 minutos de vigencia)
    const token = this.jwtService.sign(
      { email, userId, type: 'password_reset' },
      { expiresIn: '30m' },
    );
    // Construye el enlace de reseteo
    const resetLink = `${this.configService.get<string>('FRONTEND_URL')}/reset-password/token=${token}`;

    // Define el contenido HTML del correo
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_FROM', 'noreply@assetly.com'),
      to: email,
      subject: 'Resetea tu contraseña - Assetly',
      html: `   
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #030712; border-radius: 10px">
        <div style="text-align: center; padding: 20px; background-color: #4f46e5; color: white; border-radius: 8px 8px 0px 0px">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Assetly</h1>
          <p style="margin: 0; font-size: 20px; font-weight: 600;">Resetea tu contraseña</p>
        </div>
        <div style="padding: 20px; background-color: #111827; color: #ffffff; font-size: 16px;">
          <p>Hola,</p>
          <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para continuar.</p>
          <div style="text-align: center; margin: 20px 0">
            <a href="${resetLink}" style="padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500;">
              Resetear Contraseña →
            </a>
          </div>
          <p>Este enlace expirará en 30 minutos.</p>
          <p>Si no solicitaste este cambio, ignora este correo.</p>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #1f2937; color: white; font-size: 14px; border-radius: 0px 0px 8px 8px">
          <p>© 2025 Assetly. Todos los derechos reservados.</p>
        </div>
    </div>`,
    };

    // Envía el correo
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Envía un correo de confirmación cuando se crea una nueva suscripción
   * @param email Dirección de correo del usuario
   */
  async newSubscription(email: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to: email,
      subject: 'Nueva Suscripción Creada - Assetly',
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #030712; border-radius: 10px">
        <div style="text-align: center; padding: 20px; background-color: #4f46e5; color: white; border-radius: 8px 8px 0px 0px">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Assetly</h1>
          <p style="margin: 0; font-size: 20px; font-weight: 600;">¡Gracias por suscribirte!</p>
        </div>
        <div style="padding: 20px; background-color: #111827; color: #ffffff; font-size: 16px;">
          <p>Hola,</p>
          <p>Tu suscripción ha sido creada con éxito y está pendiente de aprobación.</p>
          <p>Recibirás una confirmación cuando el pago sea procesado y tu suscripción sea activada.</p>
          <div style="text-align: center; margin: 20px 0">
            <a href="${this.configService.get<string>('FRONTEND_URL')}/dashboard" style="padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500;">
              Ver mi cuenta →
            </a>
          </div>
          <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #1f2937; color: white; font-size: 14px; border-radius: 0px 0px 8px 8px">
          <p>© 2025 Assetly. Todos los derechos reservados.</p>
        </div>
      </div>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Envía una notificación cuando la suscripción cambia de estado
   * @param email Dirección de correo del usuario
   * @param status Nuevo estado de la suscripción
   * @param planName Nombre del plan (opcional)
   */
  async subscriptionStatusChange(
    email: string,
    status: SubscriptionStatus,
    planName?: string,
  ): Promise<void> {
    let subject = '';
    let statusText = '';
    let additionalInfo = '';
    let buttonText = 'Ver mi cuenta';

    switch (status) {
      case SubscriptionStatus.ACTIVE:
        subject = 'Suscripción Activada - Assetly';
        statusText = 'Tu suscripción ha sido activada con éxito';
        additionalInfo =
          'Ya puedes disfrutar de todos los beneficios de tu plan.';
        break;
      case SubscriptionStatus.CANCELLED:
        subject = 'Suscripción Cancelada - Assetly';
        statusText = 'Tu suscripción ha sido cancelada';
        additionalInfo =
          'Lamentamos que hayas decidido cancelar tu suscripción. Esperamos verte pronto nuevamente.';
        buttonText = 'Explorar planes';
        break;
      case SubscriptionStatus.REJECTED:
        subject = 'Pago rechazado - Assetly';
        statusText = 'Tu pago ha sido rechazado';
        additionalInfo =
          'Por favor, revisa tu método de pago y vuelve a intentarlo.';
        buttonText = 'Actualizar método de pago';
        break;
      case SubscriptionStatus.EXPIRED:
        subject = 'Suscripción Expirada - Assetly';
        statusText = 'Tu suscripción ha expirado';
        additionalInfo =
          'Para continuar disfrutando de nuestros servicios, por favor renueva tu suscripción.';
        buttonText = 'Renovar suscripción';
        break;
      case SubscriptionStatus.PAUSED:
        subject = 'Suscripción Pausada - Assetly';
        statusText = 'Tu suscripción ha sido pausada';
        additionalInfo =
          'Puedes reactivarla en cualquier momento desde tu panel de control.';
        buttonText = 'Reactivar suscripción';
        break;
      default:
        subject = 'Actualización de Suscripción - Assetly';
        statusText = 'Tu suscripción ha sido actualizada';
        break;
    }

    // Incluir el nombre del plan si está disponible
    const planInfo = planName ? `Plan: ${planName}` : '';

    const mailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to: email,
      subject,
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #030712; border-radius: 10px">
        <div style="text-align: center; padding: 20px; background-color: #4f46e5; color: white; border-radius: 8px 8px 0px 0px">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Assetly</h1>
          <p style="margin: 0; font-size: 20px; font-weight: 600;">Actualización de Suscripción</p>
        </div>
        <div style="padding: 20px; background-color: #111827; color: #ffffff; font-size: 16px;">
          <p>Hola,</p>
          <p><strong>${statusText}</strong></p>
          ${planInfo ? `<p>${planInfo}</p>` : ''}
          <p>${additionalInfo}</p>
          <div style="text-align: center; margin: 20px 0">
            <a href="${this.configService.get<string>('FRONTEND_URL')}/dashboard" style="padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500;">
              ${buttonText} →
            </a>
          </div>
          <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #1f2937; color: white; font-size: 14px; border-radius: 0px 0px 8px 8px">
          <p>© 2025 Assetly. Todos los derechos reservados.</p>
        </div>
      </div>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Envía una notificación de pago recibido
   * @param email Dirección de correo del usuario
   * @param planName Nombre del plan
   * @param amount Monto del pago
   * @param paymentDate Fecha del pago
   */
  async paymentReceived(
    email: string,
    planName: string,
    amount: number,
    paymentDate: Date,
  ): Promise<void> {
    const formattedDate = paymentDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedAmount = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'ARS', // Ajusta según la moneda que uses
    }).format(amount);

    const mailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to: email,
      subject: 'Pago Recibido - Assetly',
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #030712; border-radius: 10px">
        <div style="text-align: center; padding: 20px; background-color: #4f46e5; color: white; border-radius: 8px 8px 0px 0px">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Assetly</h1>
          <p style="margin: 0; font-size: 20px; font-weight: 600;">Pago Recibido</p>
        </div>
        <div style="padding: 20px; background-color: #111827; color: #ffffff; font-size: 16px;">
          <p>Hola,</p>
          <p>Hemos recibido tu pago por el plan <strong>${planName}</strong>.</p>
          <div style="background-color: #1f2937; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>Monto:</strong> ${formattedAmount}</p>
            <p style="margin: 5px 0;"><strong>Fecha:</strong> ${formattedDate}</p>
            <p style="margin: 5px 0;"><strong>Plan:</strong> ${planName}</p>
          </div>
          <p>Tu suscripción ha sido actualizada automáticamente.</p>
          <div style="text-align: center; margin: 20px 0">
            <a href="${this.configService.get<string>('FRONTEND_URL')}" style="padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500;">
              Ver mi cuenta →
            </a>
          </div>
          <p>Gracias por confiar en Assetly.</p>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #1f2937; color: white; font-size: 14px; border-radius: 0px 0px 8px 8px">
          <p>© 2025 Assetly. Todos los derechos reservados.</p>
        </div>
      </div>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Envía una notificación cuando se elimina una cuenta de usuario
   * @param email Dirección de correo del usuario
   */
  async userDelete(email: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to: email,
      subject: 'Tu cuenta ha sido eliminada - Assetly',
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #030712; border-radius: 10px">
        <div style="text-align: center; padding: 20px; background-color: #4f46e5; color: white; border-radius: 8px 8px 0px 0px">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Assetly</h1>
          <p style="margin: 0; font-size: 20px; font-weight: 600;">Cuenta Eliminada</p>
        </div>
        <div style="padding: 20px; background-color: #111827; color: #ffffff; font-size: 16px;">
          <p>Hola,</p>
          <p>Confirmamos que tu cuenta ha sido eliminada de nuestro sistema.</p>
          <p>Todos tus datos han sido borrados de acuerdo con nuestra política de privacidad.</p>
          <p>Lamentamos verte partir. Si decides regresar en el futuro, estaremos encantados de tenerte de nuevo.</p>
          <div style="text-align: center; margin: 20px 0">
            <a href="${this.configService.get<string>('FRONTEND_URL')}" style="padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500;">
              Volver a Assetly →
            </a>
          </div>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #1f2937; color: white; font-size: 14px; border-radius: 0px 0px 8px 8px">
          <p>© 2025 Assetly. Todos los derechos reservados.</p>
        </div>
      </div>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Envía una notificación de próxima renovación de suscripción
   * @param email Dirección de correo del usuario
   * @param planName Nombre del plan
   * @param amount Monto del pago
   * @param renewalDate Fecha de renovación
   */
  async subscriptionRenewalReminder(
    email: string,
    planName: string,
    amount: number,
    renewalDate: Date,
  ): Promise<void> {
    const formattedDate = renewalDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedAmount = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'ARS', // Ajusta según la moneda que uses
    }).format(amount);

    const mailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to: email,
      subject: 'Próxima Renovación de Suscripción - Assetly',
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #030712; border-radius: 10px">
        <div style="text-align: center; padding: 20px; background-color: #4f46e5; color: white; border-radius: 8px 8px 0px 0px">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Assetly</h1>
          <p style="margin: 0; font-size: 20px; font-weight: 600;">Próxima Renovación</p>
        </div>
        <div style="padding: 20px; background-color: #111827; color: #ffffff; font-size: 16px;">
          <p>Hola,</p>
          <p>Te informamos que tu suscripción al plan <strong>${planName}</strong> se renovará automáticamente en los próximos días.</p>
          <div style="background-color: #1f2937; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>Fecha de renovación:</strong> ${formattedDate}</p>
            <p style="margin: 5px 0;"><strong>Monto a cobrar:</strong> ${formattedAmount}</p>
            <p style="margin: 5px 0;"><strong>Plan:</strong> ${planName}</p>
          </div>
          <p>Si deseas realizar algún cambio en tu suscripción, puedes hacerlo desde tu panel de control antes de la fecha de renovación.</p>
          <div style="text-align: center; margin: 20px 0">
            <a href="${this.configService.get<string>('FRONTEND_URL')}/dashboard" style="padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500;">
              Gestionar Suscripción →
            </a>
          </div>
          <p>Gracias por confiar en Assetly.</p>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #1f2937; color: white; font-size: 14px; border-radius: 0px 0px 8px 8px">
          <p>© 2025 Assetly. Todos los derechos reservados.</p>
        </div>
      </div>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Envía un mensaje de contacto al equipo y una confirmación al remitente
   * @param contactData Datos del formulario de contacto
   */
  async sendContactMessage(contactData: ContactMessage): Promise<void> {
    try {
      const { name, email, message } = contactData;

      // 1. Envía el mensaje al equipo de soporte
      await this.sendMessageToTeam(name, email, message);

      // 2. Envía confirmación al remitente
      await this.sendConfirmationToSender(name, email);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Envía el mensaje de contacto al equipo de soporte
   */
  private async sendMessageToTeam(
    name: string,
    email: string,
    message: string,
  ): Promise<void> {
    const teamEmail = this.configService.get<string>('SMTP_USER');

    const mailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to: teamEmail,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #030712; border-radius: 10px">
          <div style="text-align: center; padding: 20px; background-color: #4f46e5; color: white; border-radius: 8px 8px 0px 0px">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Assetly</h1>
            <p style="margin: 0; font-size: 20px; font-weight: 600;">Nuevo Mensaje de Contacto</p>
          </div>
          <div style="padding: 20px; background-color: #111827; color: #ffffff; font-size: 16px;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="background-color: #1f2937; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <p style="margin: 5px 0;"><strong>Mensaje:</strong></p>
              <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p>Fecha: ${new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</p>
          </div>
          <div style="text-align: center; padding: 10px; background-color: #1f2937; color: white; font-size: 14px; border-radius: 0px 0px 8px 8px">
            <p>© 2025 Assetly. Todos los derechos reservados.</p>
          </div>
        </div>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Envía un email de confirmación al remitente
   */
  private async sendConfirmationToSender(
    name: string,
    email: string,
  ): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to: email,
      subject: 'Hemos recibido tu mensaje - Assetly',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #030712; border-radius: 10px">
          <div style="text-align: center; padding: 20px; background-color: #4f46e5; color: white; border-radius: 8px 8px 0px 0px">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Assetly</h1>
            <p style="margin: 0; font-size: 20px; font-weight: 600;">Mensaje Recibido</p>
          </div>
          <div style="padding: 20px; background-color: #111827; color: #ffffff; font-size: 16px;">
            <p>Hola ${name},</p>
            <p>Hemos recibido tu mensaje y queremos agradecerte por contactarnos.</p>
            <p>Nuestro equipo revisará tu consulta y te responderemos a la brevedad posible.</p>
            <div style="text-align: center; margin: 20px 0">
              <a href="${this.configService.get<string>('FRONTEND_URL')}" style="padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500;">
                Visitar Assetly →
              </a>
            </div>
            <p>Si tienes alguna consulta adicional, no dudes en escribirnos nuevamente.</p>
            <p>Saludos,<br>El equipo de Assetly</p>
          </div>
          <div style="text-align: center; padding: 10px; background-color: #1f2937; color: white; font-size: 14px; border-radius: 0px 0px 8px 8px">
            <p>© 2025 Assetly. Todos los derechos reservados.</p>
          </div>
        </div>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async sendServiceAccessCredentials(accessData: AccessDataDto): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to: accessData.email,
      subject: 'Datos de Acceso a tu Servicio - Assetly',
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #030712; border-radius: 10px">
        <div style="text-align: center; padding: 20px; background-color: #4f46e5; color: white; border-radius: 8px 8px 0px 0px">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Assetly</h1>
          <p style="margin: 0; font-size: 20px; font-weight: 600;">¡Tu Suscripción está Activada!</p>
        </div>
        <div style="padding: 20px; background-color: #111827; color: #ffffff; font-size: 16px;">
          <p>Hola,</p>
          <p>Nos complace informarte que tu suscripción ha sido <strong>activada con éxito</strong>.</p>
          <p>A continuación, encontrarás los datos de acceso a tu servicio:</p>
          
          <div style="background-color: #1f2937; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>URL del Servicio:</strong> <a href="${accessData.url}" style="color: #6366f1; text-decoration: none;">${accessData.url}</a></p>
            <p style="margin: 5px 0;"><strong>Nombre de Usuario:</strong> ${accessData.username}</p>
            <p style="margin: 5px 0;"><strong>Contraseña:</strong> ${accessData.password}</p>
          </div>
          
          <p><strong>¡Importante!</strong> Por seguridad, te recomendamos cambiar tu contraseña tan pronto como accedas al servicio.</p>
          
          <div style="text-align: center; margin: 20px 0">
            <a href="${accessData.url}" style="padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500;">
              Acceder al Servicio →
            </a>
          </div>
          
          <p>Si tienes problemas para acceder o cualquier consulta, no dudes en contactarnos.</p>
          <p>¡Gracias por confiar en Assetly!</p>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #1f2937; color: white; font-size: 14px; border-radius: 0px 0px 8px 8px">
          <p>© 2025 Assetly. Todos los derechos reservados.</p>
          <p style="font-size: 12px; color: #9CA3AF; margin-top: 5px;">Este correo contiene información confidencial. No lo reenvíes.</p>
        </div>
      </div>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
