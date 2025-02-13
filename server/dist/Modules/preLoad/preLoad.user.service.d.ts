import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { singUp } from '../User/Dto/singUp.dto';
import { Plan } from '../User/Planes.entity';
import { User } from '../User/User.entity';
interface PreLoadPlan {
    imagen?: string;
    name: string;
    alt?: string;
    precio: number | string;
    activos: string;
    descripcion: string;
    popular?: boolean;
}
export declare class UsersPreLoad implements OnApplicationBootstrap {
    private userRepository;
    private planRepository;
    constructor(userRepository: Repository<User>, planRepository: Repository<Plan>);
    users: singUp[];
    planes: PreLoadPlan[];
    onApplicationBootstrap(): Promise<void>;
    preLoadUsers(): Promise<void>;
    preLoadPlans(): Promise<void>;
}
export {};
