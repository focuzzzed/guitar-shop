import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GuitarStringsCount } from '../../../types';


export class ProductRDO {
  @ApiProperty({
    description: 'Unique product ID',
    example: 'a928035a-aaa9-4df9-999f-8de262c5be11',
  })
  @Expose()
  public id: string

  @ApiProperty({
    description: 'Guitar name',
    example: 'Sample Guitar',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Guitar addition date',
    example: '2024-02-11T23:54:01.826Z'
  })
  @Expose()
  public additionDate?: Date;

  @ApiProperty({
    description: 'Guitar image path',
    example: 'server/static/02/12/image.jpeg'
  })
  @Expose()
  public photoUrl: string;

  @ApiProperty({
    description: 'Guitar price',
    example: 985000
  })
  @Expose()
  public price: GuitarStringsCount;
}