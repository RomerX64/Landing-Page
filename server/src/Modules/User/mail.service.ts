import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

// Interfaz para opciones de envío de email
interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  context?: Record<string, any>;
  attachments?: any[];
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  /**
   * Inicializa el transportador de correo
   */
  private initializeTransporter() {
    try {
      this.transporter = nodemailer.createTransport({
        host: this.configService.get<string>('SMTP_HOST'),
        port: this.configService.get<number>('SMTP_PORT'),
        secure: this.configService.get<boolean>('SMTP_SECURE', true),
        auth: {
          user: this.configService.get<string>('SMTP_USER'),
          pass: this.configService.get<string>('SMTP_PASS'),
        },
      });

      this.logger.log('Transportador de correo inicializado');
    } catch (error) {
      this.logger.error('Error inicializando transportador de correo', error);
    }
  }

  /**
   * Carga una plantilla de correo
   * @param templateName Nombre de la plantilla
   * @param context Contexto para reemplazar variables
   * @returns Contenido HTML de la plantilla
   */
  private loadTemplate(
    templateName: string,
    context: Record<string, any> = {},
  ): string {
    try {
      const templatePath = path.join(
        __dirname,
        '..',
        'templates',
        'emails',
        `${templateName}.hbs`,
      );

      // Leer contenido del archivo
      const templateSource = fs.readFileSync(templatePath, 'utf8');

      // Compilar plantilla
      const compiledTemplate = handlebars.compile(templateSource);

      // Renderizar con contexto
      return compiledTemplate(context);
    } catch (error) {
      this.logger.error(`Error cargando plantilla ${templateName}`, error);
      throw new Error(`No se pudo cargar la plantilla ${templateName}`);
    }
  }

  /**
   * Envía un correo electrónico
   * @param options Opciones de envío de correo
   */
  async sendMail(options: EmailOptions): Promise<void> {
    try {
      // Cargar plantilla HTML
      const htmlContent = this.loadTemplate(options.template, options.context);

      // Preparar opciones de correo
      const mailOptions = {
        from: this.configService.get<string>(
          'SMTP_FROM',
          'noreply@tudominio.com',
        ),
        to: options.to,
        subject: options.subject,
        html: htmlContent,
        attachments: options.attachments || [],
      };

      // Enviar correo
      const info = await this.transporter.sendMail(mailOptions);

      this.logger.log(`Correo enviado a ${options.to}. ID: ${info.messageId}`);
    } catch (error) {
      this.logger.error('Error enviando correo', error);
      throw error;
    }
  }

  /**
   * Envía correo de bienvenida
   * @param user Datos del usuario
   */
  async sendWelcomeEmail(user: { email: string; name: string }): Promise<void> {
    try {
      await this.sendMail({
        to: user.email,
        subject: 'Bienvenido a Nuestra Plataforma',
        template: 'welcome',
        context: {
          userName: user.name,
          platformName: 'Tu Plataforma',
          supportEmail: 'soporte@tudominio.com',
        },
      });
    } catch (error) {
      this.logger.error('Error enviando correo de bienvenida', error);
    }
  }

  /**
   * Envía correo de restablecimiento de contraseña
   * @param user Datos del usuario
   * @param resetToken Token de restablecimiento
   */
  async sendPasswordResetEmail(
    user: {
      email: string;
      name: string;
    },
    resetToken: string,
  ): Promise<void> {
    try {
      const resetLink = `https://tudominio.com/reset-password?token=${resetToken}`;

      await this.sendMail({
        to: user.email,
        subject: 'Restablecimiento de Contraseña',
        template: 'password-reset',
        context: {
          userName: user.name,
          resetLink: resetLink,
          expirationMinutes: 30,
        },
      });
    } catch (error) {
      this.logger.error('Error enviando correo de restablecimiento', error);
    }
  }

  /**
   * Envía correo de verificación de cuenta
   * @param user Datos del usuario
   * @param verificationToken Token de verificación
   */
  async sendVerificationEmail(
    user: {
      email: string;
      name: string;
    },
    verificationToken: string,
  ): Promise<void> {
    try {
      const verificationLink = `https://tudominio.com/verify-account?token=${verificationToken}`;

      await this.sendMail({
        to: user.email,
        subject: 'Verifica tu Cuenta',
        template: 'account-verification',
        context: {
          userName: user.name,
          verificationLink: verificationLink,
          expirationHours: 24,
        },
      });
    } catch (error) {
      this.logger.error('Error enviando correo de verificación', error);
    }
  }

  /**
   * Envía correo de soporte
   * @param options Opciones de correo de soporte
   */
  async sendSupportEmail(options: {
    from: string;
    subject: string;
    message: string;
  }): Promise<void> {
    try {
      await this.sendMail({
        to: this.configService.get<string>(
          'SUPPORT_EMAIL',
          'soporte@tudominio.com',
        ),
        subject: `Solicitud de Soporte: ${options.subject}`,
        template: 'support-request',
        context: {
          fromEmail: options.from,
          subject: options.subject,
          message: options.message,
        },
      });
    } catch (error) {
      this.logger.error('Error enviando correo de soporte', error);
    }
  }
}

// Exportar el servicio para inyección de dependencias
export default MailService;
