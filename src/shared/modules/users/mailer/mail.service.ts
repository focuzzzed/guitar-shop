import { Inject, Injectable } from '@nestjs/common';
import appConfig from '../../../libs/config/app.config';
import { ConfigType } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { EMAIL_SEND_LOGIN_INFO } from './mail.const';
import { CreateUserDTO } from '../auth/dto/create-user.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) { }

  public async sendLoginInfo(user: CreateUserDTO) {
    await this.mailerService.sendMail({
      to: user.email,
      from: this.config.mail.from,
      subject: EMAIL_SEND_LOGIN_INFO,
      template: './send-login-info',
      context: {
        name: user.name,
        email: user.email,
        password: user.password,
      }
    })
  }
}