export interface IPlan {
  id: number;
  name: string;
  imagen: string;
  alt: string;
  precio: number;
  activos: string;
  descripcion: string;
  popular?: boolean;
  mercadopagoPlanId: string;
}
