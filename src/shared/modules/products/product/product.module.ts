import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../../../libs';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FileModule } from '../file';

@Module({
  imports: [
    FileModule,
    PrismaClientModule
  ],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
})
export class ProductModule { }