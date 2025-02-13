import { Subscripcion } from './Subscripcion.entity';
export declare enum BillingCycle {
    MONTHLY = "monthly",
    YEARLY = "yearly"
}
export declare class Plan {
    id: number;
    name: string;
    descripcion: string;
    activos: string;
    precio: number;
    activo: boolean;
    imagen?: string;
    alt?: string;
    popular: boolean;
    mercadopagoPlanId: string;
    billingCycle: BillingCycle;
    subscripciones: Subscripcion[];
    fechaCreacion: Date;
    fechaActualizacion: Date;
}
