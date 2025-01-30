import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
    summary: 'Logear usuario',
    description: 'Logea al usuario',
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
    summary: 'Registra New User',
    description: 'registra a un nuevo usuario en a una empresa',
  })
  async singUp(@Body() signUp: singUp): Promise<User> {
    try {
      return await this.userService.signUp(signUp);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
