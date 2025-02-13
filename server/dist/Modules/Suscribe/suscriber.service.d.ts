import { Repository } from 'typeorm';
import { CreateSubscriptionDto, CancelSubscriptionDto } from './dto/subscription.dto';
import { Subscripcion } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';
export declare class SubscriptionsService {
    private readonly subscriptionRepository;
    private readonly planRepository;
    constructor(subscriptionRepository: Repository<Subscripcion>, planRepository: Repository<Plan>);
    createSubscription(dto: CreateSubscriptionDto): Promise<{
        message: string;
        subscription: Subscripcion;
    }>;
    cancelSubscription(dto: CancelSubscriptionDto): Promise<{
        message: string;
        subscription: Subscripcion;
    }>;
    handleWebhook(notification: any): Promise<void>;
    private calculateExpiryDate;
}
