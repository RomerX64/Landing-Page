import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from './mail.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
