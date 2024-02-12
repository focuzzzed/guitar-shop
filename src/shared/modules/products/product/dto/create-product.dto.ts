import { GuitarStringsCount, GuitarTypes, Product } from '../../../../types';
import { IsDateString, IsIn, IsNotEmpty, IsNumber,
  IsOptional, Max, MaxLength, Min, MinLength
} from 'class-validator';
import { PRODUCT_AVAILABLE_VALUE } from '../product.const';
import { PRODUCT_VALIDATION_MESSAGE } from '../product.message';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO implements Product {
  @ApiProperty({
    description: 'Guitar name',
    example: 'Sample Guitar',
  })
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.TITLE.REQUIRED })
  @MinLength(PRODUCT_AVAILABLE_VALUE.TITLE.MIN_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(PRODUCT_AVAILABLE_VALUE.TITLE.MAX_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title: string;

  @ApiProperty({
    description: 'Guitar description',
    example: 'Has he lost his mind? Can he see or is he blind?'
  })
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.DESCRIPTION.REQUIRED })
  @MinLength(PRODUCT_AVAILABLE_VALUE.DESCRIPTION.MIN_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(PRODUCT_AVAILABLE_VALUE.DESCRIPTION.MAX_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description: string;

  @ApiProperty({
    description: 'Guitar addition date',
    example: '2024-02-11T23:54:01.826Z'
  })
  @IsOptional()
  @IsDateString({}, { message: PRODUCT_VALIDATION_MESSAGE.ADDITION_DATE.NOT_VALID })
  public additionDate?: Date;

  @ApiProperty({
    description: 'Guitar image path',
    example: 'server/static/02/12/image.jpeg'
  })
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.PHOTO_URL.REQUIRED })
  public photoUrl: string;

  @ApiProperty({
    description: `Guitar type: ${Object.values(GuitarTypes)}`,
    example: 'акустика'
  })
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.GUITAR_TYPE.REQUIRED })
  @IsIn(Object.values(GuitarTypes), { message: PRODUCT_VALIDATION_MESSAGE.GUITAR_TYPE.NOT_VALID })
  public guitarType: GuitarTypes;

  @ApiProperty({
    description: `Guitar article`,
    example: 'fender-telecaster-1234'
  })
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.ARTICLE.REQUIRED })
  @MinLength(PRODUCT_AVAILABLE_VALUE.ARTICLE.MIN_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.ARTICLE.MIN_LENGTH })
  @MaxLength(PRODUCT_AVAILABLE_VALUE.ARTICLE.MAX_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.ARTICLE.MAX_LENGTH })
  public article: string;

  @ApiProperty({
    description: `Guitar strings count: ${Object.values(PRODUCT_AVAILABLE_VALUE.STRINGS_COUNT)}`,
    example: 6,
  })
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.STRINGS_COUNT.REQUIRED })
  @IsNumber({}, { message: PRODUCT_VALIDATION_MESSAGE.STRINGS_COUNT.TYPE_NOT_VALID })
  @IsIn(Object.values(PRODUCT_AVAILABLE_VALUE.STRINGS_COUNT), { message: PRODUCT_VALIDATION_MESSAGE.STRINGS_COUNT.NOT_VALID })
  public stringsCount: GuitarStringsCount;

  @ApiProperty({
    description: 'Guitar price',
    example: 985000
  })
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.PRICE.REQUIRED })
  @IsNumber({}, { message: PRODUCT_VALIDATION_MESSAGE.PRICE.NOT_VALID })
  @Min(PRODUCT_AVAILABLE_VALUE.PRICE.MINIMUM, { message: PRODUCT_VALIDATION_MESSAGE.PRICE.MINIMUM })
  @Max(PRODUCT_AVAILABLE_VALUE.PRICE.MAXIMUM, { message: PRODUCT_VALIDATION_MESSAGE.PRICE.MAXIMUM })
  public price: number;
}