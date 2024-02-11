import { SortDirection } from '../../../types';
import { SortField } from '../../../types/paginations/sort-field.enum';

export const PAGINATION_DEFAULT_VALUE = {
  PRODUCTS_PER_PAGE: 7,
  SORT_DIRECTION: SortDirection.Ascending,
  SORT_FIELD: SortField.ByAdditionDate,
  PAGE_COUNT: 1
} as const;