import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class signUpGoogleDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'debe ser un mail',
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @IsStrongPassword()
  @ApiProperty({
    description:
      'Debe ser un string mayor de 5 caracteres y cumplir con reglas de seguridad',
    example: 'Admin123!',
  })
  name: string;
}
