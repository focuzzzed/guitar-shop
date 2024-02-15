import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../hooks/use-app-dispatch.ts';
import { State } from '../hooks/use-app-selector.ts';
import { AxiosInstance } from 'axios';
import { loadUserData } from '../store/user-process/user-process.slice.ts';
import { Token } from './token.ts';
import { toast } from 'react-toastify';
import { UserInfo, UserLoginInfo, UserLoginResponse, UserRegisterInfo } from '../types/users.types.ts';
import {
  DetailedProduct, Product,
  ProductsQueryParams,
  ProductsWithPagination,
  UpdateProductTransferObject
} from '../types/products.types.ts';
import { transformToQueryString } from '../utils.ts';
import { loadCurrentProduct, loadProducts, updateProduct } from '../store/product-process/product-process.slice.ts';

type AsyncThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const Action = {
  CHECK_AUTH: 'USER/checkStatus',
  REGISTER_USER: 'USER/register',
  LOGIN_USER: 'USER/login',
  UPLOAD_PHOTO: 'PRODUCT/uploadPhoto',
  FETCH_PRODUCTS: 'PRODUCT/fetchProducts',
  FETCH_CURRENT_PRODUCT: 'PRODUCT/fetchCurrentProduct',
  UPDATE_CURRENT_PRODUCT: 'PRODUCT/updateCurrentProduct',
  CREATE_PRODUCT: 'PRODUCT/createProduct'
};

export const checkAuth = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  Action.CHECK_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    const { data: userData } = await api.get<UserInfo>('http://localhost:3333/auth/status');
    dispatch(loadUserData(userData));
  }
);

export const registerUser = createAsyncThunk<void, UserRegisterInfo, AsyncThunkConfig>(
  Action.REGISTER_USER,
  async ({ name, email, password }, { extra: api }) => {
    const { data: userData } = await api.post<UserInfo>('http://localhost:3333/auth/login', { name, email, password });
    toast.success(`${ userData.name }, thank you for registering! Login info has been sent to ${ userData.email }`);
    //TODO: Роут на логин
  }
);

export const loginUser = createAsyncThunk<void, UserLoginInfo, AsyncThunkConfig>(
  Action.LOGIN_USER,
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data: authData } = await api.post<UserLoginResponse>('http://localhost:3333/auth/login', {
      email,
      password
    });
    Token.save(authData.token);
    dispatch(loadUserData(authData));
  }
);

export const postImage = createAsyncThunk<string, File, AsyncThunkConfig>(
  Action.UPLOAD_PHOTO,
  async (file, { extra: api }) => {
    const { data: imagePath } = await api.post<string>('http://localhost:3333/files/upload', file);
    return imagePath;
  }
);

export const fetchProducts = createAsyncThunk<void, ProductsQueryParams, AsyncThunkConfig>(
  Action.FETCH_PRODUCTS,
  async (productsQuery, { dispatch, extra: api }) => {
    const { data: productsWithPagination } = await api.get<ProductsWithPagination>(`http://localhost:3333/products?${ transformToQueryString(productsQuery) }`);
    dispatch(loadProducts(productsWithPagination));
  }
);

export const fetchCurrentProduct = createAsyncThunk<void, string, AsyncThunkConfig>(
  Action.FETCH_CURRENT_PRODUCT,
  async (productId, { dispatch, extra: api }) => {
    const { data: product } = await api.get<DetailedProduct>(`http://localhost:3333/products/${ productId }`);
    dispatch(loadCurrentProduct(product));
  }
);

export const updateCurrentProduct = createAsyncThunk<void, UpdateProductTransferObject, AsyncThunkConfig>(
  Action.UPDATE_CURRENT_PRODUCT,
  async (updateProductDTO, { dispatch, extra: api }) => {
    const { data: updatedProductCard } = await api.patch<Product>(`http://localhost:3333/products/${ updateProductDTO.id }`, updateProductDTO);
    dispatch(updateProduct(updatedProductCard));
  }
);

export const postProduct = createAsyncThunk<void, DetailedProduct, AsyncThunkConfig>(
  Action.CREATE_PRODUCT,
  async (createProductDTO, { dispatch, extra: api }) => {
    const { data: createdProduct } = await api.post<DetailedProduct>('http://localhost:3333/products/', createProductDTO);
    dispatch(loadCurrentProduct(createdProduct));
    //TODO:Роут на карточку созданного товара
  }
);
