// src/subscriptions/subscriptions.controller.ts

import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SubscriptionsService } from './suscriber.service';
import {
  CancelSubscriptionDto,
  CreateSubscriptionDto,
} from './dto/subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}
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
   * Endpoint para procesar webhooks/notificaciones de Mercado Pago.
   */
  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    try {
      // Puedes ajustar la forma en la que recibes y validas la notificación
      await this.subscriptionsService.handleWebhook(req.body);
      res.status(200).send('Webhook procesado correctamente');
    } catch (error) {
      res.status(400).send('Error al procesar el webhook');
    }
  }
}
