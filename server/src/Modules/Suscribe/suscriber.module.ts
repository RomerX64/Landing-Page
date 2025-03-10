import { Subscripcion } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionsController } from './suscriber.controller';
import { SubscriptionsService } from './suscriber.service';
import { UserModule } from '../User/users.module';
import { User } from 'mercadopago';
import { User as UserEntity } from '../User/User.entity';
import { MailModule } from '../Mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserEntity, Subscripcion, Plan]),
    forwardRef(() => UserModule),
    forwardRef(() => MailModule),
  ],
  providers: [SubscriptionsService],
  controllers: [SubscriptionsController],
  exports: [SubscriptionsService],
})
export class SuscribeModule {}
