import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJWTOptions } from '../../../helpers';
import { MailModule } from '../mailer/mail.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJWTOptions
    }),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService] //TODO: Проверить необходимость [1]
})
export class AuthModule { }