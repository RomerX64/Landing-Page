import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './User.entity';
import { singIn } from './Dto/singIn.dto';
import { singUp } from './Dto/singUp.dto';
import { ErrorHandler } from '../../Utils/Error.Handler';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { AdminGuard } from '../../guards/admin.guard';
import { Plan } from './Planes.entity';
import { updateUserDto } from './Dto/updateUser.dto';

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
    summary: 'Verificar email',
    description: 'Verifica si el email es válido y no está en uso',
  })
  async mailIsValid(@Param('email') email: string): Promise<boolean> {
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
    description: 'Registra a un usuario nuevo y envía un email de confirmación',
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
    summary: 'Obtener usuarios',
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
    summary: 'Obtener usuarios suscritos',
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
    summary: 'Obtener usuarios suscritos en un plan',
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
    summary: 'Suscribir usuario',
    description:
      'Suscribe al usuario a un plan mediante su userId y plan de pago',
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
    summary: 'Desuscribir usuario',
    description: 'Desuscribe a un usuario mediante su userId',
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
    summary: 'Eliminar usuario',
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

  @Get('plan/:planId')
  @ApiOperation({
    summary: 'Obtener un plan',
    description: 'Obtiene los datos de un solo plan',
  })
  async getPlan(@Param('planId') planId: number): Promise<Plan> {
    try {
      return await this.userService.getPlan(planId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Get('planes')
  @ApiOperation({
    summary: 'Obtener planes',
    description: 'Obtiene los datos de los planes',
  })
  async getPlanes(): Promise<Plan[]> {
    try {
      return await this.userService.getPlanes();
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Put('/update')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Actualizar usuario',
    description: 'Actualiza los datos de un usuario',
  })
  async updateUser(
    @Body() updateUser: updateUserDto,
  ): Promise<{ user: User; token: string }> {
    try {
      return await this.userService.updateUser(updateUser);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
