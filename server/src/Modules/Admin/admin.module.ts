import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { User } from '../User/User.entity';
import { Subscripcion } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';
import { UserModule } from '../User/users.module';
import { SuscribeModule } from '../Suscribe/suscriber.module';
import { MercadoPagoService } from './mp.service';
import { AdminController } from './admin.controller';
import { MailModule } from '../Mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Subscripcion, Plan]),
    forwardRef(() => UserModule),
    forwardRef(() => SuscribeModule),
    forwardRef(() => MailModule),
  ],
  providers: [AdminService, MercadoPagoService],
  controllers: [AdminController],
  exports: [AdminService, MercadoPagoService],
})
export class AdminModule {}
