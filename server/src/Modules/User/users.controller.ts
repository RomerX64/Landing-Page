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
import { ErrorHandler } from '../../Utils/Error.Handler';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { AdminGuard } from '../../guards/admin.guard';
import { Plan } from './Planes.entity';
import { updateUserDto } from './Dto/updateUser.dto';
import { signIn } from './Dto/singIn.dto';
import { signInGoogleDTO } from './Dto/singInGoogle.dto';
import { signUp } from './Dto/singUp.dto';
import { Subscripcion } from './Subscripcion.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signIn')
  @ApiOperation({
    summary: 'Logearse',
    description: 'Logea al usuario mediante el name y password.',
  })
  async signIn(@Body() signIn: signIn): Promise<{ User: User; token: string }> {
    try {
      return await this.userService.signIn(signIn);
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

  @Get('/email/get/:email')
  async getUserTruebyEmail(@Param('email') email: string): Promise<boolean> {
    try {
      return await this.userService.getUserTruebyEmail(email);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Get('/get/:email')
  async getUserbyEmail(
    @Param('email') email: string,
  ): Promise<{ User: User; token: string }> {
    try {
      return await this.userService.getUserByEmail(email);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Post('/signUp')
  @ApiOperation({
    summary: 'Registrar usuario',
    description: 'Registra a un usuario nuevo y envía un email de confirmación',
  })
  async signUp(@Body() signUp: signUp): Promise<{ user: User; token: string }> {
    try {
      return await this.userService.signUp(signUp);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @ApiBearerAuth()
  @Delete('/user')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Eliminar usuario',
    description: 'Elimina un usuario mediante el name y password',
  })
  async deleteUser(
    @Body() body: { name: string; password: string },
  ): Promise<User> {
    try {
      const { name, password } = body;
      return await this.userService.deleteUser(name, password);
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

  @Get('/planes')
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

  @ApiBearerAuth()
  @Put('/update/:userId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Actualizar usuario',
    description: 'Actualiza los datos de un usuario',
  })
  async updateUser(
    @Body() updateUser: updateUserDto,
    @Param('userId') userId: string,
  ): Promise<{ user: User; token: string }> {
    try {
      return await this.userService.updateUser(updateUser, userId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Get('/sub/:userId')
  @ApiOperation({
    summary: 'Get sub by UserId',
    description: 'obtiene el Id mediante el UserId',
  })
  async getSubByUserId(@Param('userId') userId: string): Promise<Subscripcion | null> {
    try {
      return await this.userService.getSubByUserId(userId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
