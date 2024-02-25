import { GuitarTypes, GuitarStringsCount, SortField, SortDirection } from './enums';

export type PaginationState = {
  limit: number;
  guitarTypes: GuitarTypes[];
  stringsCount: GuitarStringsCount[];
  sortField: SortField;
  sortDirection: SortDirection;
  page: number;
};
