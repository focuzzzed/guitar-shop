import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DetailedProduct, Product, ProductState, ProductsWithPagination } from '../../types/products.types.ts';
import { NameSpace } from '../../types/enums.ts';
import { fetchCurrentProduct, fetchProducts, updateCurrentProduct } from '../../service/api-actions.ts';

const ProductInitialState: ProductState = {
  pagination: {
    entities: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    itemsPerPage: 0,
  },
  currentProduct: null,
  isLoading: false,
};

export const productProcess = createSlice({
  name: NameSpace.Products,
  initialState: ProductInitialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<ProductsWithPagination>) => {
      state.pagination = action.payload;
    },
    loadCurrentProduct: (state, action: PayloadAction<DetailedProduct>) => {
      state.currentProduct = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      state.pagination.entities = state.pagination.entities.map((product) => product.id === action.payload.id
        ? action.payload
        : product
      );
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCurrentProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCurrentProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCurrentProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCurrentProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCurrentProduct.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const {
  loadProducts,
  loadCurrentProduct,
  updateProduct
} = productProcess.actions;
