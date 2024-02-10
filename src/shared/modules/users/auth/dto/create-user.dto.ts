import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { USER_AVAILABLE_VALUE } from '../../user/user.const';

export class CreateUserDTO {
  @IsNotEmpty({message: 'Email is required'})
  @IsEmail({}, {message: 'Email must be valid'})
  public email: string;

  @IsNotEmpty({message: 'Name is required'})
  @MinLength(USER_AVAILABLE_VALUE.NAME.MIN_LENGTH, {message: 'Minimum name length is 1 char'})
  @MaxLength(USER_AVAILABLE_VALUE.NAME.MAX_LENGTH, {message: 'Maximum name length is 15 chars'})
  public name: string;

  @IsNotEmpty({message: 'Password is required'})
  @MinLength(USER_AVAILABLE_VALUE.PASSWORD.MIN_LENGTH, {message: 'Minimum password length is 6 char'})
  @MaxLength(USER_AVAILABLE_VALUE.PASSWORD.MAX_LENGTH, {message: 'Maximum password length is 12 chars'})
  public password: string;
}