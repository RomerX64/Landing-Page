import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ContactMessage } from './dto/contact.message';
import { ErrorHandler } from 'src/Utils/Error.Handler';
import { AccessDataDto } from './dto/acces.service.dto';

@Controller('contact')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendContactMessage(@Body() contactData: ContactMessage) {
    try {
      await this.mailService.sendContactMessage(contactData);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
