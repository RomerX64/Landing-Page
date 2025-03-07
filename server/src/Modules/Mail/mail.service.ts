import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';

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
      secure: this.configService.get<boolean>('SMTP_SECURE', true),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
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
    await this.transporter.sendMail(mailOptions);
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
    await this.transporter.sendMail(mailOptions);
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
}
