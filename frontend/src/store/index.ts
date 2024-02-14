import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../service/api.ts';

const api = createAPI();

export const store = configureStore({
  reducer: [],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});
