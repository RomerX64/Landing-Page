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
    @Headers() headers: Record<string, string>,
  ) {
    const secret = this.configService.get<string>(
      'MERCADO_PAGO_WEBHOOK_SECRET',
    );

    try {
      this.verifyWebhook(headers, body, secret);

      // Procesa la notificación si la verificación fue exitosa
      return await this.subscriptionsService.handleWebhook(body);
    } catch (error) {
      console.error(error.message);
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
  private verifyWebhook(
    headers: Record<string, string>,
    body: any,
    secret: string,
  ) {
    const xSignature = headers['x-signature'];
    const xRequestId = headers['x-request-id'];

    if (!xSignature || !xRequestId) {
      throw new Error('Missing signature or request-id headers');
    }

    // Separar la firma en `ts` y `v1`
    const parts = xSignature.split(',');

    let ts: string | undefined;
    let hash: string | undefined;

    parts.forEach((part) => {
      const [key, value] = part.split('=');
      if (key === 'ts') ts = value;
      if (key === 'v1') hash = value;
    });

    if (!ts || !hash) {
      throw new Error('Invalid signature format');
    }

    // Obtener el ID del body
    const dataID = body.data.id.toString().toLowerCase(); // Convertir a minúsculas si es alfanumérico
    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

    // Generar la firma HMAC-SHA256
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(manifest);
    const sha = hmac.digest('hex');

    // Comparar la firma generada con la que envió Mercado Pago
    if (sha !== hash) {
      throw new Error('Invalid webhook signature');
    }

  }
}
