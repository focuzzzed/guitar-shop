import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  public async register(dto: CreateUserDTO) {
    const existsUser = await this.userRepository.findByEmail(dto.email);

    if(existsUser) {
      throw new ConflictException(`User with email ${dto.email} already exists`);
    }

    const userEntity = await new UserEntity()
      .populate({
        name: dto.name,
        email: dto.email,
        passwordHash: ''
      })
      .setPassword(dto.password);

    return this.userRepository.save(userEntity);
  }

}