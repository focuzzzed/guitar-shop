import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { fillDTO } from '../../../helpers';
import { UserRDO } from './rdo/user.rdo';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoggedUserRDO } from './rdo/logged-user.rdo';

@Controller('users')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('/register')
  public async register(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);
    return fillDTO(UserRDO, newUser.serialize());
  }

  @Post('/login')
  public async login(@Body() dto: LoginUserDTO) {
    const verifiedUser = await this.authService.verify(dto);
    const accessToken = await this.authService.authenticate(verifiedUser);
    return fillDTO(LoggedUserRDO, Object.assign(verifiedUser.serialize(), accessToken));
  }
}