import { Subscripcion } from './Subscripcion.entity';
export declare class User {
    id: string;
    username: string;
    subscripcion: Subscripcion;
    emailVerified: boolean;
    email: string;
    password: string;
    telefono: string;
    company: string;
    isAdmin: boolean;
}
