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
import * as nodemailer from 'nodemailer';
import { LoginTicket, OAuth2Client } from 'google-auth-library';

@Injectable()
export class UserService {
  private googleClient: OAuth2Client;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
    @InjectRepository(Subscripcion)
    private subsRepository: Repository<Subscripcion>,
    private readonly jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

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
      await this.sendConfirmationEmail(savedUser.email, emailToken);

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

  async suscribeUser(userId: string, planId: number): Promise<User> {
    try {
      const user = await this.getUserById(userId);
      const plan: Plan = await this.planRepository.findOne({
        where: { id: planId },
      });

      if (!plan) {
        throw new HttpException('Plan not found', HttpStatus.BAD_REQUEST);
      }

      const subscripcion: Subscripcion = await this.subsRepository.findOne({
        where: { id: user.subscripcion?.id },
      });

      if (!subscripcion) {
        const newSub = this.subsRepository.create({
          user: user,
          plan: plan,
          fechaInicio: new Date(),
        });
        await this.subsRepository.save(newSub);
        user.subscripcion = newSub;

        return user;
      }

      if (subscripcion.plan.id === plan.id) {
        throw new HttpException(
          'Already subscribed to this plan',
          HttpStatus.BAD_REQUEST,
        );
      }

      subscripcion.plan = plan;
      subscripcion.fechaInicio = new Date();

      await this.subsRepository.save(subscripcion);
      return user;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async desuscribeUser(userId: string): Promise<User> {
    try {
      const user = await this.getUserById(userId);

      if (!user.subscripcion) {
        throw new HttpException(
          'User is not subscribed to any plan',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.subsRepository.delete(user.subscripcion.id);
      user.subscripcion = null;

      return user;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async deleteUser(username: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { username: username },
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

  private async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.tu-dominio.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Mi App" <no-reply@miapp.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
  
  private async sendConfirmationEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const confirmationUrl = `${process.env.APP_URL}/confirm?token=${token}`;
    const html = `
      <p>Gracias por registrarte.</p>
      <p>Por favor confirma tu email haciendo clic en el siguiente enlace:</p>
      <a href="${confirmationUrl}">Confirmar Email</a>
    `;
    await this.sendEmail({
      to: email,
      subject: 'Confirmación de Email',
      html,
    });
  }

  private async sendResetPasswordEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;
    const html = `
      <p>Haz clic en el siguiente enlace para resetear tu contraseña:</p>
      <a href="${resetUrl}">Resetear Contraseña</a>
    `;
    await this.sendEmail({
      to: email,
      subject: 'Reset de Contraseña',
      html,
    });
  }

  async confirmEmail(token: string): Promise<{ message: string }> {
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException(
        'Token inválido o expirado',
        HttpStatus.BAD_REQUEST,
      );
    }
    const email = payload.email;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    // Actualiza el usuario marcando el email como verificado.
    user.emailVerified = true;
    await this.userRepository.save(user);
    return { message: 'Email confirmado correctamente' };
  }

  async requestResetPassword(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return {
        message:
          'Si el email existe, se ha enviado un enlace para resetear la contraseña',
      };
    }
    const resetToken = this.jwtService.sign(
      { email: user.email },
      { expiresIn: '1h' },
    );
    await this.sendResetPasswordEmail(user.email, resetToken);
    return {
      message:
        'Si el email existe, se ha enviado un enlace para resetear la contraseña',
    };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException(
        'Token inválido o expirado',
        HttpStatus.BAD_REQUEST,
      );
    }
    const email = payload.email;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
    return { message: 'Contraseña actualizada correctamente' };
  }

  async loginWithGoogle(
    googleToken: string,
  ): Promise<{ user: User; token: string }> {
    let ticket: LoginTicket;
    try {
      ticket = await this.googleClient.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      throw new HttpException(
        'Token de Google inválido',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new HttpException(
        'No se encontró email en el token',
        HttpStatus.BAD_REQUEST,
      );
    }
    let user = await this.userRepository.findOne({
      where: { email: payload.email },
    });
    if (!user) {
      user = this.userRepository.create({
        email: payload.email,
        password: '',
        emailVerified: true,
      });
      user = await this.userRepository.save(user);
    }
    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = this.jwtService.sign(userPayload);
    return { user, token };
  }
}
