import { Subscripcion } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../User/users.module';
import { SuscribeModule } from '../Suscribe/suscriber.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../User/User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Subscripcion, Plan]),
    forwardRef(() => UserModule),
    forwardRef(() => SuscribeModule),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
