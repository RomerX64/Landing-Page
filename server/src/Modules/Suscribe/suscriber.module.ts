import { User } from 'mercadopago';
import { Subscripcion } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subscripcion, Plan])],
  providers: [],
  controllers: [],
})
export class SuscribeModule {}
