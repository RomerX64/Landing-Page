import { UserService } from './users.service';
import { User } from './User.entity';
import { singIn } from './Dto/singIn.dto';
import { singUp } from './Dto/singUp.dto';
import { Plan } from './Planes.entity';
import { updateUserDto } from './Dto/updateUser.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    singIn(singIn: singIn): Promise<{
        User: User;
        token: string;
    }>;
    mailIsValid(email: string): Promise<boolean>;
    singUp(signUp: singUp): Promise<{
        user: User;
        token: string;
    }>;
    getUsers(): Promise<User[]>;
    getUsersSubscribed(): Promise<User[]>;
    getUsersSubscribedAt(planId: number): Promise<User[]>;
    suscribeUser(userId: string, planId: number): Promise<User>;
    desuscribeUser(userId: string): Promise<User>;
    deleteUser(body: {
        username: string;
        password: string;
    }): Promise<User>;
    getPlan(planId: number): Promise<Plan>;
    getPlanes(): Promise<Plan[]>;
    updateUser(updateUser: updateUserDto): Promise<{
        user: User;
        token: string;
    }>;
}
