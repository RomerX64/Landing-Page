import { User } from 'mercadopago';
import { Subscripcion } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionsController } from './suscriber.controller';
import { SubscriptionsService } from './suscriber.service';
import { UserModule } from '../User/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Subscripcion, Plan]),
    forwardRef(() => UserModule),
  ],
  providers: [SubscriptionsService],
  controllers: [SubscriptionsController],
})
export class SuscribeModule {}
