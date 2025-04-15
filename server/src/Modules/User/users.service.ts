import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository, IsNull, Not } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorHandler } from '../../Utils/Error.Handler';
import { JwtService } from '@nestjs/jwt';
import { Subscripcion } from './Subscripcion.entity';
import { Plan } from './Planes.entity';
import { updateUserDto } from './Dto/updateUser.dto';
import { signIn } from './Dto/singIn.dto';
import { signUp } from './Dto/singUp.dto';
import { signInGoogleDTO } from './Dto/singInGoogle.dto';
import { MailService } from '../Mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
    @InjectRepository(Subscripcion)
    private subsRepository: Repository<Subscripcion>,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => MailService))
    private readonly mailService: MailService,
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

  async getUserByEmail(email: string): Promise<{ User: User; token: string }> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { email: email },
        relations: ['subscripcion', 'subscripcion.plan'],
      });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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

  async getUserTruebyEmail(email: string): Promise<boolean> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { email: email },
      });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return true;
    } catch (error) {
      return false;
    }
  }

  async signIn(signIn: signIn): Promise<{ User: User; token: string }> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { email: signIn.email },
        relations: ['subscripcion', 'subscripcion.plan'],
      });
      if (!user)
        throw new HttpException('Credencial inválida', HttpStatus.BAD_REQUEST);
      const isValid = await bcrypt.compare(signIn.password, user.password);
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

  async signUp(signUp: signUp): Promise<{ user: User; token: string }> {
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
        emailVerified: false,
      });
      const savedUser = await this.userRepository.save(user);

      // Send verification email
      await this.mailService.sendVerificationEmail(
        savedUser.email,
        savedUser.id,
      );

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
    userId: string,
  ): Promise<{ user: User; token: string }> {
    try {
      const user = await this.getUserById(userId);
      if (updateUser.password)
        updateUser.password = await bcrypt.hash(updateUser.password, 10);
      const userPayload = {
        sub: user.subscripcion,
        id: user.id,
        email: updateUser.email,
        isAdmin: false,
      };
      const token = this.jwtService.sign(userPayload);
      const U = await this.userRepository.save(updateUser);
      return { user: U, token: token };
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
      await this.mailService.userDelete(user.email);
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

  async getSubByUserId(userId: string): Promise<Subscripcion | null> {
    try {
      const user: User = await this.getUserById(userId);
      const sub: Subscripcion = await this.subsRepository.findOne({
        where: { id: user.subscripcion?.id },
        relations: ['plan', 'database'],
      });
      if (!sub) return null;
      return sub;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  // New methods for email verification and password reset
  async verifyEmail(token: string): Promise<User> {
    try {
      // Verify the token
      const { email, userId } =
        await this.mailService.verifyPasswordResetToken(token);

      // Find the user
      const user = await this.getUserById(userId);

      // Check if email matches
      if (user.email !== email) {
        throw new BadRequestException('Invalid verification token');
      }

      // Mark email as verified
      user.emailVerified = true;
      return await this.userRepository.save(user);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async initiatePasswordReset(email: string): Promise<void> {
    try {
      // Find user by email
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      // Send password reset email
      await this.mailService.sendPasswordResetEmail(user.email, user.id);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<User> {
    try {
      // Verify the token
      const { email, userId } =
        await this.mailService.verifyPasswordResetToken(token);

      // Find the user
      const user = await this.getUserById(userId);

      // Check if email matches
      if (user.email !== email) {
        throw new BadRequestException('Invalid reset token');
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user's password
      user.password = hashedPassword;
      return await this.userRepository.save(user);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  signUpGoogle():
    | { user: User; token: string }
    | PromiseLike<{ user: User; token: string }> {
    throw new Error('Method not implemented.');
  }
}
