import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './Modules/User/User.entity';
import { UserModule } from './Modules/User/users.module';
import { UsersPreLoad } from './Modules/preLoad/preLoad.user.service';
import { PreLoadModule } from './Modules/preLoad/preLoad.module';
import { SuscribeModule } from './Modules/Suscribe/suscriber.module';
import { AdminService } from './Modules/Admin/admin.service';
import { AdminModule } from './Modules/Admin/admin.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),

    UserModule,
    SuscribeModule,
    AdminModule,

    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1000h' },
      secret: process.env.JWT_SECRET,
    }),

    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [PreLoadModule],
})
export class AppModule {}
