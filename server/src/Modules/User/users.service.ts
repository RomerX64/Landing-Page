import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { singIn } from './Dto/singIn.dto';
import * as bcrypt from 'bcrypt';
import { singUp } from './Dto/singUp.dto';
import { ErrorHandler } from 'src/Utils/Error.Handler';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
        throw new HttpException('Credencial invalida', HttpStatus.BAD_REQUEST);
      const isValid = await bcrypt.compare(singIn.password, user.password);
      if (!isValid)
        throw new HttpException('Credencial invalida', HttpStatus.BAD_REQUEST);
      const userPayload = {
        sub: user.id,
        id: user.id,
        email: user.email,
      };

      const token = this.jwtService.sign(userPayload);
      return { User: user, token: token };
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async signUp(signUp: singUp): Promise<User> {
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
      });

      if (!user)
        throw new HttpException(
          'No se pudo crear el usuario.',
          HttpStatus.BAD_REQUEST,
        );

      return await this.userRepository.save(user);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
