import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './User.entity';
import { singIn } from './Dto/singIn.dto';
import { singUp } from './Dto/singUp.dto';
import { ErrorHandler } from 'src/Utils/Error.Handler';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { IsEmail } from 'class-validator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/singIn')
  @ApiOperation({
    summary: 'Logearse',
    description: 'Logea al usuario mediante el username y password.',
  })
  async singIn(@Body() singIn: singIn): Promise<{ User: User; token: string }> {
    try {
      return await this.userService.singIn(singIn);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Get('/email/:email')
  @ApiOperation({
    summary: 'verifica si el mail es valido',
    description: 'verifica si el mail es valido y no esta en uso',
  })
  async mailIsValid(
    @Param('email')
    email: string,
  ): Promise<boolean> {
    try {
      return await this.userService.mailIsValid(email);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Post('/singUp')
  @ApiOperation({
    summary: 'Registrar usuario',
    description: 'Registra a un usuario nuevo',
  })
  async singUp(@Body() signUp: singUp): Promise<{ user: User; token: string }> {
    try {
      return await this.userService.signUp(signUp);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @ApiBearerAuth()
  @Get('/users')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({
    summary: 'Get users',
    description: 'Obtiene todos los usuarios',
  })
  async getUsers(): Promise<User[]> {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @ApiBearerAuth()
  @Get('/getUsersSubscribed')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({
    summary: 'Get users subscritos',
    description: 'Obtiene todos los usuarios suscritos',
  })
  async getUsersSubscribed(): Promise<User[]> {
    try {
      return await this.userService.getUsersSubscribed();
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @ApiBearerAuth()
  @Get('/getUsersSubscribed/:planId')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({
    summary: 'Get users subscritos en ...',
    description: 'Obtiene todos los usuarios suscritos en el plan seleccionado',
  })
  async getUsersSubscribedAt(@Param('planId') planId: number): Promise<User[]> {
    try {
      return await this.userService.getUsersSubscribedAt(planId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @ApiBearerAuth()
  @Get('/suscribe/:userId/:planId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Suscribir Usuario',
    description: 'Subscribe al usuario mediante el suerId y plan de pago',
  })
  async suscribeUser(
    @Param('userId') userId: string,
    @Param('planId') planId: number,
  ): Promise<User> {
    try {
      return await this.userService.suscribeUser(userId, planId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @ApiBearerAuth()
  @Get('/desuscribe/:userId')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({
    summary: 'Desuscribir Usuario',
    description: 'desuscribe a un usuario mediante el user ID',
  })
  async desuscribeUser(@Param('userId') userId: string): Promise<User> {
    try {
      return await this.userService.desuscribeUser(userId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @ApiBearerAuth()
  @Delete('/user')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Elminar usuario',
    description: 'Elimina un usuario mediante el username y password',
  })
  async deleteUser(
    @Body() body: { username: string; password: string },
  ): Promise<User> {
    try {
      const { username, password } = body;
      return await this.userService.deleteUser(username, password);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
