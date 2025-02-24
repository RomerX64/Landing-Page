import { IPlan } from "@/interfaces/Plan.interface";
import { ISubscripcion } from "@/interfaces/Subscripcion.interface";

export interface SuscribeContextProps {
  sub: ISubscripcion | null;
  planes: IPlan[];
  viewPlan: IPlan | null;
  suscribirse: (
    planId: number,
    paymentMethodToken: string,
    email: string
  ) => Promise<void>;
  desuscribirse: () => Promise<void>;
  selectPlan: (planId: number) => Promise<IPlan | null>;
  changePlan: (direction: "next" | "prev") => void;
  refreshSubscription: () => Promise<void>;
  refreshPlanes: () => Promise<void>;
  loading: boolean;
}
