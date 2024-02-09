import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaClientModule } from '../../../libs';

@Module({
  imports: [PrismaClientModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule { }