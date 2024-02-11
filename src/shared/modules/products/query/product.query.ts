import { IsArray, IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { PAGINATION_DEFAULT_VALUE } from './pagination.const';
import { GuitarStringsCount, GuitarTypes, SortDirection } from '../../../types';
import { AVAILABLE_GUITAR_STRINGS_COUNT } from '../product.const';
import { SortField } from '../../../types/paginations/sort-field.enum';

export class ProductQuery {
  @Transform((value) => +value || PAGINATION_DEFAULT_VALUE.PRODUCTS_PER_PAGE)
  @IsOptional()
  public limit: number = PAGINATION_DEFAULT_VALUE.PRODUCTS_PER_PAGE;

  @IsIn(Object.values(GuitarTypes), {
    each: true,
  })
  @IsArray()
  @IsOptional()
  public guitarTypes?: GuitarTypes[];

  @IsIn(AVAILABLE_GUITAR_STRINGS_COUNT, {
    each: true,
  })
  @IsArray()
  @IsOptional()
  public stringsCount?: GuitarStringsCount[];

  @IsIn(Object.values(SortField)) //TODO: Проверить сортировочные поля
  @IsOptional()
  public sortField: SortField = PAGINATION_DEFAULT_VALUE.SORT_FIELD;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = PAGINATION_DEFAULT_VALUE.SORT_DIRECTION;

  @Transform((value) => +value || PAGINATION_DEFAULT_VALUE.PAGE_COUNT)
  @IsOptional()
  public page: number = PAGINATION_DEFAULT_VALUE.PAGE_COUNT;
}