import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { USER_AVAILABLE_VALUE } from '../../user';
import { AUTH_VALIDATION_MESSAGE } from '../auth.message';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Valid user email',
    example: 'ronwiz@majestic.local'
  })
  @IsNotEmpty({message: AUTH_VALIDATION_MESSAGE.EMAIL.REQUIRED})
  @IsEmail({}, {message: AUTH_VALIDATION_MESSAGE.EMAIL.NOT_VALID})
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'RonWizley'
  })
  @IsNotEmpty({message: AUTH_VALIDATION_MESSAGE.NAME.REQUIRED})
  @MinLength(USER_AVAILABLE_VALUE.NAME.MIN_LENGTH, {message: AUTH_VALIDATION_MESSAGE.NAME.MIN_LENGTH})
  @MaxLength(USER_AVAILABLE_VALUE.NAME.MAX_LENGTH, {message: AUTH_VALIDATION_MESSAGE.NAME.MAX_LENGTH})
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: 'SuperMag12'
  })
  @IsNotEmpty({message: AUTH_VALIDATION_MESSAGE.PASSWORD.REQUIRED})
  @MinLength(USER_AVAILABLE_VALUE.PASSWORD.MIN_LENGTH, {message: AUTH_VALIDATION_MESSAGE.PASSWORD.MIN_LENGTH})
  @MaxLength(USER_AVAILABLE_VALUE.PASSWORD.MAX_LENGTH, {message: AUTH_VALIDATION_MESSAGE.PASSWORD.MAX_LENGTH})
  public password: string;
}