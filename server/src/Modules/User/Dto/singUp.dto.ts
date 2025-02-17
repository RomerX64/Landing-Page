import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class signUp {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Debe ser un mail válido',
    example: 'example@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'El nombre de la empresa',
    example: 'Compañados Total',
  })
  company: string;

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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'DEBE ser un STRING, Debe ser un número de teléfono válido',
    example: '+54351532645',
  })
  telefono: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({
    description: 'Debe ser un string mayor de 5 caracteres',
    example: 'Romer',
  })
  name: string;
}
