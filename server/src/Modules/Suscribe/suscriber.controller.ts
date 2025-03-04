import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Headers,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';
import { SubscriptionsService } from './suscriber.service';
import CreateSubscriptionDto from './dto/createSubscription.dto';
import CancelSubscriptionDto from './dto/cancelSubscription.dto';
import { ErrorHandler } from 'src/Utils/Error.Handler';
import { ConfigService } from '@nestjs/config';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    try {
      const result = await this.subscriptionsService.createSubscription(
        createSubscriptionDto,
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('cancel')
  async cancelSubscription(
    @Body() cancelSubscriptionDto: CancelSubscriptionDto,
  ) {
    try {
      const result = await this.subscriptionsService.cancelSubscription(
        cancelSubscriptionDto,
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Endpoint para procesar webhooks/notificaciones de Mercado Pago
   * con verificación de firma
   */
  @Post('webhook')
  async handleWebhook(
    @Body() body: any,
    @Headers('x-signature') signature: string,
    @Req() req: Request,
  ) {
    try {
      // Verificar la firma del webhook
      // this.verifyWebhookSignature(body, signature);

      // Procesar el webhook
      return await this.subscriptionsService.handleWebhook(body);
    } catch (error) {
      // Log the error for internal tracking
      console.error('Webhook verification failed:', error);
      
      // Throw a specific error for unauthorized webhook
      throw new HttpException(
        'Webhook verification failed',
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  /**
   * Verifica la firma del webhook de Mercado Pago
   * @param body Cuerpo de la notificación
   * @param signature Firma recibida en los headers
   */
  private verifyWebhookSignature(body: any, signature: string) {
    // Obtener la clave secreta de Mercado Pago desde variables de entorno
    const secretKey = this.configService.get<string>('MERCADO_PAGO_WEBHOOK_SECRET');
    
    
    if (!secretKey) {
      throw new Error('Mercado Pago webhook secret key is not configured');
    }

    // Convertir el cuerpo a string para la verificación
    const bodyString = JSON.stringify(body);

    // Generar un hash HMAC-SHA256 con la clave secreta
    const generatedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(bodyString)
      .digest('hex');

    // Comparar la firma generada con la recibida
    // Mercado Pago generalmente envía la firma con un prefijo (por ejemplo, 'sha256=')
    const isSignatureValid = 
      signature === generatedSignature || 
      signature === `sha256=${generatedSignature}`;

    if (!isSignatureValid) {
      throw new Error('Invalid webhook signature');
    }
  }
}