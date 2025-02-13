import { User } from './User.entity';
import { Repository } from 'typeorm';
import { singIn } from './Dto/singIn.dto';
import { singUp } from './Dto/singUp.dto';
import { JwtService } from '@nestjs/jwt';
import { Subscripcion } from './Subscripcion.entity';
import { Plan } from './Planes.entity';
import { updateUserDto } from './Dto/updateUser.dto';
export declare class UserService {
    private userRepository;
    private planRepository;
    private subsRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, planRepository: Repository<Plan>, subsRepository: Repository<Subscripcion>, jwtService: JwtService);
    getUserById(userId: string): Promise<User>;
    singIn(singIn: singIn): Promise<{
        User: User;
        token: string;
    }>;
    signUp(signUp: singUp): Promise<{
        user: User;
        token: string;
    }>;
    updateUser(updateUser: updateUserDto): Promise<{
        user: User;
        token: string;
    }>;
    getUsers(): Promise<User[]>;
    getUsersSubscribed(): Promise<User[]>;
    getUsersSubscribedAt(planId: number): Promise<User[]>;
    suscribeUser(userId: string, planId: number): Promise<User>;
    desuscribeUser(userId: string): Promise<User>;
    deleteUser(username: string, password: string): Promise<User>;
    mailIsValid(email: string): Promise<boolean>;
    getPlan(planId: number): Promise<Plan>;
    getPlanes(): Promise<Plan[]>;
}
