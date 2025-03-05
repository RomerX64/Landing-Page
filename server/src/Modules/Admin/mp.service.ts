import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MercadoPagoService {
  constructor(private configService: ConfigService) {}

  private readonly mercadoPagoAccessToken = this.configService.get<string>(
    'MERCADO_PAGO_ACCESS_TOKEN',
  );
  private readonly baseUrl = 'https://api.mercadopago.com';

  async getAllSubscriptions(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/preapproval/search`, {
        headers: {
          Authorization: `Bearer ${this.mercadoPagoAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.results;
    } catch (error) {
      console.error('Error fetching Mercado Pago subscriptions:', error);
      throw new Error('Failed to fetch Mercado Pago subscriptions');
    }
  }

  async getSubscriptionById(subscriptionId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/preapproval/${subscriptionId}`,
        {
          headers: {
            Authorization: `Bearer ${this.mercadoPagoAccessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        `Error fetching Mercado Pago subscription ${subscriptionId}:`,
        error,
      );
      throw new Error(
        `Failed to fetch Mercado Pago subscription ${subscriptionId}`,
      );
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<any> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/subscriptions/${subscriptionId}`,
        { status: 'cancelled' },
        {
          headers: {
            Authorization: `Bearer ${this.mercadoPagoAccessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        `Error cancelling Mercado Pago subscription ${subscriptionId}:`,
        error,
      );
      throw new Error(
        `Failed to cancel Mercado Pago subscription ${subscriptionId}`,
      );
    }
  }
}
