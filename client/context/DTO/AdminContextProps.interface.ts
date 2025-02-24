import { IPlan } from "@/interfaces/Plan.interface";
import { ISubscripcion } from "@/interfaces/Subscripcion.interface";
import { IUser } from "@/interfaces/User.interface";

export interface AdminContextProps {
  // Funciones para usuarios
  getUsers: () => Promise<IUser[]>;
  getUsersSubscribed: () => Promise<IUser[]>;
  getUsersSubscribedAt: (planId: number) => Promise<IUser[]>;
  getUser: (userId: string) => Promise<IUser>;
  putAdmin: (userId: string) => Promise<IUser>;

  // Funciones para planes
  getAllPlans: () => Promise<IPlan[]>;
  createPlan: (plan: Omit<IPlan, "id">) => Promise<IPlan>;
  updatePlan: (planId: number, plan: Partial<IPlan>) => Promise<IPlan>;
  deletePlan: (planId: number) => Promise<void>;

  // Funciones para suscripciones
  getAllSubscriptions: () => Promise<ISubscripcion[]>;
  getSubscriptionById: (subscriptionId: string) => Promise<ISubscripcion>;
  updateSubscriptionStatus: (
    subscriptionId: string,
    status: ISubscripcion["status"]
  ) => Promise<ISubscripcion>;
  cancelSubscription: (
    subscriptionId: string,
    reason: string
  ) => Promise<ISubscripcion>;
}
