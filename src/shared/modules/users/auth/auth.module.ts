import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJWTOptions } from '../../../helpers';
import { MailModule } from '../mail';

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
  providers: [AuthService],
})
export class AuthModule { }