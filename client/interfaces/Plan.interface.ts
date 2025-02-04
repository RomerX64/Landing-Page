import { ISubscripcion } from "./Subscripcion.interface";

export interface IPlan {
  id: number;
  descripcion: string;
  price: number;
  subscripciones: ISubscripcion[];
}
