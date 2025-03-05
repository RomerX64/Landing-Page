import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPreLoad } from './preLoad.user.service';
import { Plan } from '../User/Planes.entity';
import { UserModule } from '../User/users.module';
import { User } from '../User/User.entity';
import { MercadoPagoService } from './mp.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Plan, User]),
    HttpModule,
  ],
  providers: [UsersPreLoad, MercadoPagoService],
  exports: [UsersPreLoad, MercadoPagoService], 
})
export class PreLoadModule {}
