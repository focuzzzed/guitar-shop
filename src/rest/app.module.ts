import { Module } from '@nestjs/common';
import { AuthModule } from '../shared/modules/users/auth';
import { AppConfigModule } from '../shared/libs/config/app-config.module';
import { ProductModule } from '../shared/modules/products/product';

@Module({
  imports: [AppConfigModule, AuthModule, ProductModule],
})
export class AppModule { }
