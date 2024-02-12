import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'node:path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export function getMailerAsyncOptions(): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        transport: {
          host: configService.get('app.mail.host'),
          port: configService.get('app.mail.port'),
          secure: false,
          auth: {
            user: configService.get('app.mail.user'),
            password: configService.get('app.user.password'),
          },
        },
        defaults: {
          from: configService.get('app.mail.from'),
        },
        template: {
          dir: resolve(__dirname, '..', 'modules', 'users', 'mail', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          }
        }
      }
    },
    inject: [ConfigService],
  }
}