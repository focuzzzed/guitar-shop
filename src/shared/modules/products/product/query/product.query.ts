import { IsArray, IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { PAGINATION_DEFAULT_VALUE } from './pagination.const';
import { GuitarStringsCount, GuitarTypes, SortDirection } from '../../../../types';
import { SortField } from '../../../../types/paginations/sort-field.enum';
import { PRODUCT_AVAILABLE_VALUE } from '../product.const';

export class ProductQuery {
  @Transform(({ value }) => +value || PAGINATION_DEFAULT_VALUE.PRODUCTS_PER_PAGE)
  @IsOptional()
  public limit: number = PAGINATION_DEFAULT_VALUE.PRODUCTS_PER_PAGE;

  @IsIn(Object.values(GuitarTypes), {
    each: true,
  })
  @IsArray()
  @IsOptional()
  public guitarTypes?: GuitarTypes[];

  @Transform(({ value }) => value.map((elem: string) => +elem))
  @IsIn(PRODUCT_AVAILABLE_VALUE.STRINGS_COUNT, {
    each: true,
  })
  @IsArray()
  @IsOptional()
  public stringsCount?: GuitarStringsCount[];

  @IsIn(Object.values(SortField))
  @IsOptional()
  public sortField: SortField = PAGINATION_DEFAULT_VALUE.SORT_FIELD;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = PAGINATION_DEFAULT_VALUE.SORT_DIRECTION;

  @Transform(({ value }) => +value || PAGINATION_DEFAULT_VALUE.PAGE_COUNT)
  @IsOptional()
  public page: number = PAGINATION_DEFAULT_VALUE.PAGE_COUNT;
}