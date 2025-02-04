import { IPlan } from "./Plan.interface";
import { IUser } from "./User.interface";

export interface ISubscripcion {
  id: string;

  plan: IPlan;
  fechaInicio: Date;
  fechaUltimaPaga: Date;
  fechaVenciento: Date;
  user: IUser;
}
