import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { Subscripcion } from './Subscripcion.entity';
import { Plan } from './Planes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subscripcion, Plan])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
