import { Module } from '@nestjs/common';
import { AuthModule } from '../shared/modules/users/auth';
import { AppConfigModule } from '../shared/libs/config/app-config.module';
import { ProductModule } from '../shared/modules/products/product';
import { JWTModule } from '../shared/libs/jwt/jwt.module';

@Module({
  imports: [
    JWTModule,
    AppConfigModule,
    AuthModule,
    ProductModule,
  ],
  exports: [JWTModule]
})
export class AppModule { }
