export class CreateSubscriptionDto {
  planId: number;
  userEmail: string;
  paymentMethodToken: string;
}

export class CancelSubscriptionDto {
  subscriptionId: string;
  cancellationReason?: string;
}
