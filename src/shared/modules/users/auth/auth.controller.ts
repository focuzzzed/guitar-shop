import { Body, Controller, Get, Post, UseGuards, Request, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { fillDTO } from '../../../helpers';
import { UserRDO } from './rdo/user.rdo';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { JWTAuth } from '../../../libs/guards';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email already exists.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
    type: UserRDO
  })
  @Post('/register')
  public async register(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);
    return fillDTO(UserRDO, newUser.serialize());
  }

  @ApiResponse({
    type: LoggedUserRDO,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with this email not exists'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or login is wrong.'
  })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  public async login(@Body() dto: LoginUserDTO) {
    const verifiedUser = await this.authService.verify(dto);
    const accessToken = await this.authService.authenticate(verifiedUser);
    return fillDTO(LoggedUserRDO, Object.assign(verifiedUser.serialize(), accessToken));
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User authorized. Returns user without password',
    type: UserRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user',
  })
  @UseGuards(JWTAuth)
  @Get('/status')
  public async checkAuth(@Request() req: Request) {
    return fillDTO(UserRDO, req['user']);
  }
}