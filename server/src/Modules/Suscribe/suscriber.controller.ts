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
import CreateSubscriptionDto from './dto/createSubscription.dto';
import CancelSubscriptionDto from './dto/cancelSubscription.dto';
import { ErrorHandler } from 'src/Utils/Error.Handler';

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
  async handleWebhook(@Body() body: any) {
    try {
      return await this.subscriptionsService.handleWebhook(body);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
