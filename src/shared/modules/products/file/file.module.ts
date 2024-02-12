import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { getServeStaticOptions } from '../../../helpers/get-serve-static-options';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  imports: [ServeStaticModule.forRootAsync(getServeStaticOptions())],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}