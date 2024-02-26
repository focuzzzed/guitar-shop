import { State } from '../../hooks/use-app-selector.ts';
import { NameSpace } from '../../types/enums.ts';

export const getProductsLoadingStatus = (state: Pick<State, typeof NameSpace.Products>) => state.PRODUCT.isLoading;

export const getCurrentProduct = (state: Pick<State, typeof NameSpace.Products>) => state.PRODUCT.currentProduct;

export const getCurrentPage = (state: Pick<State, typeof NameSpace.Products>) => state.PRODUCT.pagination.currentPage;

export const getPagesCount = (state: Pick<State, typeof NameSpace.Products>) => state.PRODUCT.pagination.totalPages;
