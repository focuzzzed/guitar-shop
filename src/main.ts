import { NestFactory } from '@nestjs/core';
import { AppModule } from './rest/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}))

  const configService = app.get(ConfigService);
  const port = configService.get('app.port');

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/`)
}

bootstrap();
