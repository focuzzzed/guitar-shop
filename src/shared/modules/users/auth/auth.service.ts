import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
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

  public async verify(dto: LoginUserDTO) {
    const existsUser = await this.userRepository.findByEmail(dto.email);

    if(!existsUser) {
      throw new NotFoundException(`User with email ${dto.email} not found`);
    }

    if(! await existsUser.comparePassword(dto.password)) {
      throw new ConflictException(`Incorrect login or password`);
    }

    return existsUser;
  }

  public async authenticate(user: UserEntity) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

}