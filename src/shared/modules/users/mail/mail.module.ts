import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerAsyncOptions } from '../../../helpers/get-mailer-options';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions())
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }