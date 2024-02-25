import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PRODUCT_LIMIT } from '../../service/const';
import { SortField, SortDirection, NameSpace, GuitarTypes, GuitarStringsCount } from '../../types/enums';
import { PaginationState } from '../../types/paginations.types';

const initialProductsQuery: PaginationState = {
  limit: DEFAULT_PRODUCT_LIMIT,
  guitarTypes: [],
  stringsCount: [],
  sortField: SortField.ByAdditionDate,
  sortDirection: SortDirection.Ascending,
  page: 1,
};

export const paginationProcess = createSlice({
  name: NameSpace.Pagination,
  initialState: initialProductsQuery,
  reducers: {
    updateGuitarTypes: (state, action: PayloadAction<GuitarTypes>) => {
      state.guitarTypes = state.guitarTypes.includes(action.payload)
        ? state.guitarTypes.filter((type) => type !== action.payload)
        : [...state.guitarTypes, action.payload];
    },
    updateStringsCount: (state, action: PayloadAction<GuitarStringsCount>) => {
      state.stringsCount = state.stringsCount.includes(action.payload)
        ? state.stringsCount.filter((stringsCount) => stringsCount !== action.payload)
        : [...state.stringsCount, action.payload];
    },
    updateSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload;
    },
    updateSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetPaginationState: () => initialProductsQuery,
  }
});

export const {
  updateGuitarTypes,
  updateStringsCount,
  updateSortField,
  updateSortDirection,
  updateCurrentPage,
  resetPaginationState
} = paginationProcess.actions;
