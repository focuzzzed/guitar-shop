import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailModule } from '../mail';

@Module({
  imports: [
    UserModule,
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }