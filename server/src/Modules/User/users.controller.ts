import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './User.entity';
import { singIn } from './Dto/singIn.dto';
import { singUp } from './Dto/singUp.dto';
import { ErrorHandler } from 'src/Utils/Error.Handler';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('singIn')
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

  @Post('singUp')
  @ApiOperation({
    summary: 'Elminar usuario',
    description: 'Elimina un usuario mediante el username y password',
  })
  async singUp(@Body() signUp: singUp): Promise<User> {
    try {
      return await this.userService.signUp(signUp);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Post('/getAdmin')
  @ApiOperation({
    summary: 'Obtiene los Permisos de administrador',
    description: 'Obtienes El token de autenticacion de admin',
  })
  async getAdmin(
    @Body() body: { username: string; password: string },
  ): Promise<{ User: User; token: string }> {
    try {
      const { username, password } = body;
      return await this.userService.getAdmin(username, password);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Get('/users')
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

  @Get('/getUsersSubscribed')
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

  @Get('/getUsersSubscribed/:planId')
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

  @Get('/suscribe/:userId/:planId')
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

  @Get('/Desuscribe/:userId')
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

  @Delete('/user')
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
