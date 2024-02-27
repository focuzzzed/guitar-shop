import { State } from '../../hooks/use-app-selector.ts';
import { NameSpace } from '../../types/enums.ts';

type PaginationProcessState = Pick<State, typeof NameSpace.Products>;

export const getProductsLoadingStatus = (state: PaginationProcessState) => state.PRODUCT.isLoading;

export const getCurrentProduct = (state: PaginationProcessState) => state.PRODUCT.currentProduct;

export const getCurrentPage = (state: PaginationProcessState) => state.PRODUCT.pagination.currentPage;

export const getPagesCount = (state: PaginationProcessState) => state.PRODUCT.pagination.totalPages;

export const getProducts = (state: PaginationProcessState) => state.PRODUCT.pagination.entities;
