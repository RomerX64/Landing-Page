import { ISubscripcion } from "./Subscripcion.interface";

export interface IUser {
  id: string;
  name: string;
  subscripcion: ISubscripcion;
  email: string;
  password: string;
  telefono: string;
  company: string;
  isAdmin: boolean;
  database:IDatabase
}
