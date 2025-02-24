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
}

export enum SubscriptionStatus {
  ACTIVE = "active",
  PAUSED = "paused",
  CANCELLED = "cancelled",
  PENDING = "pending",
}
