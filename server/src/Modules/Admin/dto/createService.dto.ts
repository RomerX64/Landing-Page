import { IsNotEmpty, IsString } from 'class-validator';

export class createServiceDto {
  @IsNotEmpty()
  @IsString()
  dbName: string;

  @IsNotEmpty()
  @IsString()
  dbHost: string;

  @IsNotEmpty()
  dbPort: number;

  @IsNotEmpty()
  @IsString()
  dbUsername: string;

  @IsNotEmpty()
  @IsString()
  dbPassword: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
