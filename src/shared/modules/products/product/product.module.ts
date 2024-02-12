import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../../../libs';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJWTOptions } from '../../../helpers';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJWTOptions
    }),
    PrismaClientModule
  ],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
})
export class ProductModule { }