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
    @Headers('x-request-id') requestId: string,
  ) {
    try {
      // Verificar la firma del webhook
      this.verifyWebhookSignature(body, signature, requestId);

      // Procesar el webhook
      return await this.subscriptionsService.handleWebhook(body);
    } catch (error) {
      console.error('Webhook verification failed:', error);
      throw new HttpException(
        'Webhook verification failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * Verifica la firma del webhook de Mercado Pago
   * @param body Cuerpo de la notificación
   * @param signature Firma recibida en los headers
   */
  private verifyWebhookSignature(
    body: any,
    signature: string,
    requestId: string,
  ) {
    const secretKey = this.configService.get<string>(
      'MERCADO_PAGO_WEBHOOK_SECRET',
    );

    if (!secretKey) {
      throw new Error('Mercado Pago webhook secret key is not configured');
    }

    // Extraer `ts` y `v1` del `x-signature`
    const signatureParts = signature.split(',');
    const tsPart = signatureParts.find((part) => part.startsWith('ts='));
    const v1Part = signatureParts.find((part) => part.startsWith('v1='));

    if (!tsPart || !v1Part) {
      throw new Error('Invalid signature format');
    }

    const ts = tsPart.split('=')[1];
    const v1 = v1Part.split('=')[1];

    // Construir el string con el formato requerido
    const dataId = body.data.id.toString().toLowerCase(); // data.id debe ir en minúsculas si es alfanumérico
    const validationString = `id:${dataId};request-id:${requestId};ts:${ts};`;

    // Generar la firma HMAC-SHA256
    const generatedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(validationString)
      .digest('hex');

    // Comparar la firma generada con la recibida en `v1`
    if (v1 !== generatedSignature) {
      throw new Error('Invalid webhook signature');
    }
  }
}
