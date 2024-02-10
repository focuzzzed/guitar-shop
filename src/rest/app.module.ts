import { Module } from '@nestjs/common';
import { AuthModule } from '../shared/modules/users/auth/auth.module';
import { AppConfigModule } from '../shared/libs/config/app-config.module';

@Module({
  imports: [AppConfigModule, AuthModule],
})
export class AppModule { }
