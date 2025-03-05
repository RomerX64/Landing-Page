import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { Subscripcion } from './Subscripcion.entity';
import { Plan } from './Planes.entity';
import { PreLoadModule } from '../preLoad/preLoad.module';
import { MailModule } from '../Mail/mail.module';

@Module({
  imports: [
    forwardRef(() => PreLoadModule),
    forwardRef(() => MailModule),
    TypeOrmModule.forFeature([User, Subscripcion, Plan]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
