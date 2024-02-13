import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from '../user';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
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

    const registeredUser = await this.userRepository.save(userEntity);
    await this.mailService.sendLoginInfo(dto);

    return registeredUser;
  }

  public async verify(dto: LoginUserDTO) {
    const existsUser = await this.userRepository.findByEmail(dto.email);

    if(!existsUser) {
      throw new NotFoundException(`User with email ${dto.email} not found`);
    }

    if(! await existsUser.comparePassword(dto.password)) {
      throw new UnauthorizedException(`Incorrect login or password`);
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