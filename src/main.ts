import { NestFactory } from '@nestjs/core';
import { AppModule } from './rest/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The «Guitar-Shop» service')
    .setDescription('General project api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(new ValidationPipe({transform: true}))

  const configService = app.get(ConfigService);
  const port = configService.get('app.port');

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
  Logger.log(`📖 Specification is running on http://localhost:${port}/spec`);
}

bootstrap();
