import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './Modules/User/User.entity';
import { UserModule } from './Modules/User/users.module';
import { UsersPreLoad } from './Modules/preLoad/preLoad.user.service';
import { PreLoadModule } from './Modules/preLoad/preLoad.module';
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

    UserModule,

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
