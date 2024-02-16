import { State } from '../../hooks/use-app-selector.ts';
import { NameSpace } from '../../types/enums.ts';

export const getProductsLoadingStatus = (state: Pick<State, typeof NameSpace.Products>) => state.PRODUCTS.isLoading;

export const getCurrentProduct = (state: Pick<State, typeof NameSpace.Products>) => state.PRODUCTS.currentProduct;
