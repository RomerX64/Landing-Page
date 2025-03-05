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
    // Create transporter using SMTP configuration from environment variables
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
   * Send email verification link to user after registration
   * @param email User's email address
   * @param userId User's unique identifier
   * @returns Promise with email sending result
   */
  async sendVerificationEmail(email: string, userId: string): Promise<void> {
    // Generate email verification token (valid for 1 hour)
    const token = this.jwtService.sign(
      { email, userId, type: 'email_verification' },
      { expiresIn: '1h' },
    );

    // Construct verification link
    const verificationLink = `${this.configService.get<string>('FRONTEND_URL')}/verify-email?token=${token}`;

    // Email content
    const mailOptions = {
      from: this.configService.get<string>(
        'EMAIL_FROM',
        'noreply@yourdomain.com',
      ),
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <h1>Email Verification</h1>
        <p>Click the link below to verify your email address:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not create an account, please ignore this email.</p>
      `,
    };

    // Send email
    await this.transporter.sendMail(mailOptions);
  }

  /**
   * Send password reset link to user
   * @param email User's email address
   * @param userId User's unique identifier
   * @returns Promise with email sending result
   */
  async sendPasswordResetEmail(email: string, userId: string): Promise<void> {
    // Generate password reset token (valid for 30 minutes)
    const token = this.jwtService.sign(
      { email, userId, type: 'password_reset' },
      { expiresIn: '30m' },
    );

    // Construct password reset link
    const resetLink = `${this.configService.get<string>('FRONTEND_URL')}/reset-password?token=${token}`;

    // Email content
    const mailOptions = {
      from: this.configService.get<string>(
        'EMAIL_FROM',
        'noreply@yourdomain.com',
      ),
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset</h1>
        <p>You have requested to reset your password. Click the link below:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 30 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
      `,
    };

    // Send email
    await this.transporter.sendMail(mailOptions);
  }

  /**
   * Verify email verification token
   * @param token JWT token for email verification
   * @returns Decoded token information or throws an error
   */
  async verifyEmailVerificationToken(
    token: string,
  ): Promise<{ email: string; userId: string }> {
    try {
      const decoded = this.jwtService.verify(token);

      // Additional validation
      if (decoded.type !== 'email_verification') {
        throw new Error('Invalid token type');
      }

      return {
        email: decoded.email,
        userId: decoded.userId,
      };
    } catch (error) {
      throw new Error('Invalid or expired verification token');
    }
  }

  /**
   * Verify password reset token
   * @param token JWT token for password reset
   * @returns Decoded token information or throws an error
   */
  async verifyPasswordResetToken(
    token: string,
  ): Promise<{ email: string; userId: string }> {
    try {
      const decoded = this.jwtService.verify(token);

      // Additional validation
      if (decoded.type !== 'password_reset') {
        throw new Error('Invalid token type');
      }

      return {
        email: decoded.email,
        userId: decoded.userId,
      };
    } catch (error) {
      throw new Error('Invalid or expired reset token');
    }
  }
}
