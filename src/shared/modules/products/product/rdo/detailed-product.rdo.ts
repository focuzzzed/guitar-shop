import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GuitarStringsCount, GuitarTypes, Product } from '../../../../types';
import { PRODUCT_AVAILABLE_VALUE } from '../product.const';


export class DetailedProductRDO implements Product {
  @ApiProperty({
    description: 'Unique product ID',
    example: 'a928035a-aaa9-4df9-999f-8de262c5be11',
  })
  @Expose()
  public id: string

  @ApiProperty({
    example: 'Sample Guitar',
    description: 'Guitar name'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Guitar description',
    example: 'Has he lost his mind? Can he see or is he blind?'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Guitar addition date',
    example: '2024-02-11T23:54:01.826Z'
  })
  @Expose()
  public additionDate?: string;

  @ApiProperty({
    description: 'Guitar image path',
    example: 'server/static/02/12/image.jpeg'
  })
  @Expose()
  public photoUrl: string;

  @ApiProperty({
    description: `Guitar type: ${Object.values(GuitarTypes)}`,
    example: 'акустика'
  })
  @Expose()
  public guitarType: GuitarTypes;

  @ApiProperty({
    description: `Guitar article`,
    example: 'fender-telecaster-1234'
  })
  @Expose()
  public article: string;

  @ApiProperty({
    description: `Guitar strings count: ${Object.values(PRODUCT_AVAILABLE_VALUE.STRINGS_COUNT)}`,
    example: 6
  })
  @Expose()
  public stringsCount: GuitarStringsCount;

  @ApiProperty({
    description: 'Guitar price',
    example: 985000
  })
  @Expose()
  public price: number;
}