import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class signIn {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'debe ser un mail',
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @IsStrongPassword()
  @ApiProperty({
    description:
      'Debe ser un string mayor de 5 caracteres y cumplir con reglas de seguridad',
    example: 'Admin123!',
  })
  password: string;
}
