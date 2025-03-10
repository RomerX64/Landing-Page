import { IPlan } from "./Plan.interface";
import { IUser } from "./User.interface";

export interface ISubscripcion {
  id: string;
  plan: IPlan;
  fechaInicio: Date;
  fechaUltimaPaga: Date;
  fechaVencimiento: Date;
  mercadopagoSubscriptionId: string;
  status: SubscriptionStatus;
  cancellationDate: Date | null;
  cancellationReason: string;
  metadata: Record<string, any>;
  user: IUser;
  database: IDatabase;
}

export enum SubscriptionStatus {
  ACTIVE = "active", // La suscripción está activa.
  PAUSED = "paused", // La suscripción ha sido pausada.
  CANCELLED = "cancelled", // La suscripción ha sido cancelada.
  PENDING = "pending", // La suscripción está pendiente de aprobación.
  APPROVED = "approved", // La suscripción ha sido aprobada.
  REJECTED = "rejected", // La suscripción ha sido rechazada.
  EXPIRED = "expired", // La suscripción ha expirado.
}
