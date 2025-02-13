export declare class CreateSubscriptionDto {
    planId: number;
    userEmail: string;
    paymentMethodToken: string;
}
export declare class CancelSubscriptionDto {
    subscriptionId: string;
    cancellationReason?: string;
}
