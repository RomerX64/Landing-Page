import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ErrorHandler } from 'src/Utils/Error.Handler';

@Injectable()
export class MercadoPagoService {
  constructor(private httpService: HttpService) {}

  async fetchPlans() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(
          'https://api.mercadopago.com/preapproval_plan/search',
          {
            headers: {
              Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
            },
          },
        ),
      );

      return response.data.results.map((plan) => {
        return {
          name: plan.reason,
          price: plan.auto_recurring.transaction_amount,
          mercadopagoPlanId: plan.id,
          description: `${plan.reason} Plan - ${plan.auto_recurring.frequency} ${plan.auto_recurring.frequency_type}`,
        };
      });
    } catch (error) {
      console.error('Error fetching Mercado Pago plans:', error);
      throw ErrorHandler.handle(error);
    }
  }
}
