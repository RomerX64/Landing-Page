import { User } from './User.entity';
import { Plan } from './Planes.entity';
export declare enum SubscriptionStatus {
    ACTIVE = "active",
    PAUSED = "paused",
    CANCELLED = "cancelled"
}
export declare class Subscripcion {
    id: string;
    plan: Plan;
    user: User;
    fechaInicio: Date;
    fechaUltimaPaga: Date;
    fechaVencimiento: Date;
    mercadopagoSubscriptionId: string;
    status: SubscriptionStatus;
    cancellationDate: Date;
    cancellationReason: string;
    metadata: Record<string, any>;
}
