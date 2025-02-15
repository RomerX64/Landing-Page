import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository, IsNull, Not } from 'typeorm';
import { singIn } from './Dto/singIn.dto';
import * as bcrypt from 'bcrypt';
import { singUp } from './Dto/singUp.dto';
import { ErrorHandler } from '../../Utils/Error.Handler';
import { JwtService } from '@nestjs/jwt';
import { Subscripcion } from './Subscripcion.entity';
import { Plan } from './Planes.entity';
import { updateUserDto } from './Dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
    @InjectRepository(Subscripcion)
    private subsRepository: Repository<Subscripcion>,
    private readonly jwtService: JwtService,
  ) {}

  async getUserById(userId: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return user;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async singIn(singIn: singIn): Promise<{ User: User; token: string }> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { email: singIn.email },
      });
      if (!user)
        throw new HttpException('Credencial inválida', HttpStatus.BAD_REQUEST);
      const isValid = await bcrypt.compare(singIn.password, user.password);
      if (!isValid)
        throw new HttpException('Credencial inválida', HttpStatus.BAD_REQUEST);
      const userPayload = {
        sub: user.id,
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      const token = this.jwtService.sign(userPayload);
      return { User: user, token: token };
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async signUp(signUp: singUp): Promise<{ user: User; token: string }> {
    try {
      const exist = await this.userRepository.findOne({
        where: { email: signUp.email },
      });
      if (exist) {
        throw new HttpException(
          'El email ya está registrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await bcrypt.hash(signUp.password, 10);

      const user: User = this.userRepository.create({
        ...signUp,
        password: hashedPassword,
        // Suponemos que el usuario recién creado aún no tiene el email confirmado
        emailVerified: false,
      });

      const savedUser = await this.userRepository.save(user);

      // Genera token de confirmación (válido por 1 día)
      const emailToken = this.jwtService.sign(
        { email: savedUser.email },
        { expiresIn: '1d' },
      );
      // Envía el email de confirmación
      const userPayload = {
        sub: savedUser.id,
        id: savedUser.id,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
      };
      const token = this.jwtService.sign(userPayload);

      return { user: savedUser, token: token };
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async updateUser(
    updateUser: updateUserDto,
  ): Promise<{ user: User; token: string }> {
    try {
      if (updateUser.password)
        updateUser.password = await bcrypt.hash(updateUser.password, 10);
      const userPayload = {
        sub: updateUser.id,
        id: updateUser.id,
        email: updateUser.email,
        isAdmin: false,
      };
      const token = this.jwtService.sign(userPayload);
      const user = await this.userRepository.save(updateUser);
      return { user: user, token: token };
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getUsersSubscribed(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find({
        where: { subscripcion: Not(IsNull()) },
      });
      return users;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getUsersSubscribedAt(planId: number): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find({
        where: { subscripcion: { plan: { id: planId } } },
      });
      return users;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async deleteUser(name: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { name: name },
      });
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid)
        throw new HttpException('Credencial inválida', HttpStatus.BAD_REQUEST);
      await this.userRepository.delete(user);
      return user;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async mailIsValid(email: string): Promise<boolean> {
    try {
      const exist = await this.userRepository.findOne({
        where: { email: email },
      });

      return !!exist; // Retorna true si existe, false si no
    } catch (error) {
      console.error('Error al verificar el email:', error);
      return false;
    }
  }

  async getPlan(planId: number): Promise<Plan> {
    try {
      const plan: Plan = await this.planRepository.findOne({
        where: { id: planId },
      });
      if (!plan) throw new NotFoundException('Plan not Found');
      return plan;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getPlanes(): Promise<Plan[]> {
    try {
      return await this.planRepository.find();
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
