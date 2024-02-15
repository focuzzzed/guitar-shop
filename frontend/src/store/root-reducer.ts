import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../types/enums.ts';
import { userProcess } from './user-process/user-process.slice.ts';
import { productProcess } from './product-process/product-process.slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Products]: productProcess.reducer,
});
