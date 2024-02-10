import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app-config.const';
import applicationConfig from './app.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_FILE_PATH,
      load: [applicationConfig],
    })
  ]
})
export class AppConfigModule {}