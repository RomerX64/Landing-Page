import { CreateSubscriptionDto, CancelSubscriptionDto } from './dto/subscription.dto';
import { Request, Response } from 'express';
import { SubscriptionsService } from './suscriber.service';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<{
        message: string;
        subscription: import("../User/Subscripcion.entity").Subscripcion;
    }>;
    cancelSubscription(cancelSubscriptionDto: CancelSubscriptionDto): Promise<{
        message: string;
        subscription: import("../User/Subscripcion.entity").Subscripcion;
    }>;
    handleWebhook(req: Request, res: Response): Promise<void>;
}
