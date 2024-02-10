import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRDO {
  @ApiProperty({
    description: 'User id',
    example: 'd1a981e7-011d-4f13-b31d-a8bc6b475ff4'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Valid user email',
    example: 'ronwiz@majestic.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'RonWizley'
  })
  @Expose()
  public name: string;
}