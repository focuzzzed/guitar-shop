import { GuitarStringsCount, GuitarTypes } from '../../../types';
import { IsDateString, IsIn, IsNotEmpty, IsNumber,
  IsOptional, Max, MaxLength, Min, MinLength
} from 'class-validator';
import { PRODUCT_AVAILABLE_VALUE } from '../product.const';
import { PRODUCT_VALIDATION_MESSAGE } from '../product.message';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDTO {
  @ApiPropertyOptional({
    description: 'Guitar name',
    example: 'Sample Guitar',
  })
  @IsOptional()
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.TITLE.REQUIRED })
  @MinLength(PRODUCT_AVAILABLE_VALUE.TITLE.MIN_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(PRODUCT_AVAILABLE_VALUE.TITLE.MAX_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title?: string;

  @ApiPropertyOptional({
    description: 'Guitar description',
    example: 'Has he lost his mind? Can he see or is he blind?'
  })
  @IsOptional()
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.DESCRIPTION.REQUIRED })
  @MinLength(PRODUCT_AVAILABLE_VALUE.DESCRIPTION.MIN_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(PRODUCT_AVAILABLE_VALUE.DESCRIPTION.MAX_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description?: string;

  @ApiPropertyOptional({
    description: 'Guitar addition date',
    example: '2024-02-11T23:54:01.826Z'
  })
  @IsOptional()
  @IsDateString({}, { message: PRODUCT_VALIDATION_MESSAGE.ADDITION_DATE.NOT_VALID })
  public additionDate?: Date;

  @ApiPropertyOptional({
    description: 'Guitar image path',
    example: 'server/static/02/12/image.jpeg'
  })
  @IsOptional()
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.PHOTO_URL.REQUIRED })
  public photoUrl?: string;

  @ApiPropertyOptional({
    description: `Guitar type: ${Object.values(GuitarTypes)}`,
    example: 'акустика'
  })
  @IsOptional()
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.GUITAR_TYPE.REQUIRED })
  @IsIn(Object.values(GuitarTypes), { message: PRODUCT_VALIDATION_MESSAGE.GUITAR_TYPE.NOT_VALID })
  public guitarType?: GuitarTypes;

  @ApiPropertyOptional({
    description: `Guitar article`,
    example: 'fender-telecaster-1234'
  })
  @IsOptional()
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.ARTICLE.REQUIRED })
  @MinLength(PRODUCT_AVAILABLE_VALUE.ARTICLE.MIN_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.ARTICLE.MIN_LENGTH })
  @MaxLength(PRODUCT_AVAILABLE_VALUE.ARTICLE.MAX_LENGTH, { message: PRODUCT_VALIDATION_MESSAGE.ARTICLE.MAX_LENGTH })
  public article?: string;

  @ApiPropertyOptional({
    description: `Guitar strings count: ${Object.values(PRODUCT_AVAILABLE_VALUE.STRINGS_COUNT)}`,
    example: 6,
  })
  @IsOptional()
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.STRINGS_COUNT.REQUIRED })
  @IsNumber({}, { message: PRODUCT_VALIDATION_MESSAGE.STRINGS_COUNT.TYPE_NOT_VALID })
  @IsIn(Object.values(GuitarTypes), { message: PRODUCT_VALIDATION_MESSAGE.STRINGS_COUNT.NOT_VALID })
  public stringsCount?: GuitarStringsCount;

  @ApiPropertyOptional({
    description: 'Guitar price',
    example: 985000
  })
  @IsOptional()
  @IsNotEmpty({ message: PRODUCT_VALIDATION_MESSAGE.PRICE.REQUIRED })
  @IsNumber({}, { message: PRODUCT_VALIDATION_MESSAGE.PRICE.NOT_VALID })
  @Min(PRODUCT_AVAILABLE_VALUE.PRICE.MINIMUM, { message: PRODUCT_VALIDATION_MESSAGE.PRICE.MINIMUM })
  @Max(PRODUCT_AVAILABLE_VALUE.PRICE.MAXIMUM, { message: PRODUCT_VALIDATION_MESSAGE.PRICE.MAXIMUM })
  public price?: number;
}