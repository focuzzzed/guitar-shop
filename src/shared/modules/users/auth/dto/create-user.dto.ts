import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { USER_AVAILABLE_VALUE } from '../../user/user.const';
import { AUTH_VALIDATION_MESSAGE } from '../auth.message';

export class CreateUserDTO {
  @IsNotEmpty({message: AUTH_VALIDATION_MESSAGE.EMAIL.REQUIRED})
  @IsEmail({}, {message: AUTH_VALIDATION_MESSAGE.EMAIL.NOT_VALID})
  public email: string;

  @IsNotEmpty({message: AUTH_VALIDATION_MESSAGE.NAME.REQUIRED})
  @MinLength(USER_AVAILABLE_VALUE.NAME.MIN_LENGTH, {message: AUTH_VALIDATION_MESSAGE.NAME.MIN_LENGTH})
  @MaxLength(USER_AVAILABLE_VALUE.NAME.MAX_LENGTH, {message: AUTH_VALIDATION_MESSAGE.NAME.MAX_LENGTH})
  public name: string;

  @IsNotEmpty({message: AUTH_VALIDATION_MESSAGE.PASSWORD.REQUIRED})
  @MinLength(USER_AVAILABLE_VALUE.PASSWORD.MIN_LENGTH, {message: AUTH_VALIDATION_MESSAGE.PASSWORD.MIN_LENGTH})
  @MaxLength(USER_AVAILABLE_VALUE.PASSWORD.MAX_LENGTH, {message: AUTH_VALIDATION_MESSAGE.PASSWORD.MAX_LENGTH})
  public password: string;
}