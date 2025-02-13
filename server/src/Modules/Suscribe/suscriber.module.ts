import { User } from 'mercadopago';
import { Subscripcion } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionsController } from './suscriber.controller';
import { SubscriptionsService } from './suscriber.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subscripcion, Plan])],
  providers: [SubscriptionsService],
  controllers: [SubscriptionsController],
})
export class SuscribeModule {}
