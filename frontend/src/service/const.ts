import { StatusCodes } from 'http-status-codes';

export const BACKEND_URL = 'http://localhost:3333';
export const REQUEST_TIME = 5000;

export const DEFAULT_PRODUCT_LIMIT = 7;

export const BACKEND_PHOTO_FIELD_NAME = 'file';

export const FIRST_PAGE_NUMBER = 1;

export const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

export const Paths = {
  Login: '/',
  Register: '/register',
  Error: '*',
  Products: '/products',
  Product: '/products/:id',
  Create: '/products/new',
  Update: '/products/:id/edit'
} as const;
