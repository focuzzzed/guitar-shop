import { GuitarStringsCount, GuitarTypes, SortDirection, SortField } from './enums.ts';

export type DetailedProduct = {
  id?: string;
  title: string;
  description: string;
  additionDate?: string;
  photoUrl: string;
  guitarType: GuitarTypes;
  article: string;
  stringsCount: GuitarStringsCount;
  price: number;
};

export type UpdateProductTransferObject = Partial<DetailedProduct> & { id: string };

export type Product = Omit<DetailedProduct, 'article' | 'stringsCount' | 'description'>;

export type ProductsWithPagination = {
  entities: Product[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
};

export type ProductState = {
  pagination: ProductsWithPagination;
  currentProduct: DetailedProduct | null;
  isLoading: boolean;
};

export type ProductsQueryParams = {
  limit?: number;
  guitarTypes?: GuitarTypes[];
  stringsCount?: GuitarStringsCount[];
  sortField?: SortField;
  sortDirection?: SortDirection;
  page?: number;
};
