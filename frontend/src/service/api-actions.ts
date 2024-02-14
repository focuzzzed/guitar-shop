import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../hooks/use-app-dispatch.ts';
import { State } from '../hooks/use-app-selector.ts';
import { AxiosInstance } from 'axios';
import { loadUserData } from '../store/user-process/user-process.slice.ts';
import { Token } from './token.ts';
import { toast } from 'react-toastify';
import { UserInfo, UserLoginInfo, UserLoginResponse, UserRegisterInfo } from '../types/users.types.ts';

type AsyncThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const checkAuth = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  'USER/checkStatus',
  async (_arg, { dispatch, extra: api }) => {
    const {data: userData} = await api.get<UserInfo>('http://localhost:3333/auth/status');
    dispatch(loadUserData(userData));
  }
);

export const registerUser = createAsyncThunk<void, UserRegisterInfo, AsyncThunkConfig>(
  'USER/register',
  async ({ name, email, password }, { extra: api }) => {
    const {data: userData} = await api.post<UserInfo>('http://localhost:3333/auth/login', { name, email, password });
    toast.success(`${userData.name}, thank you for registering! Login info has been sent to ${userData.email}`);
  }
);

export const loginUser = createAsyncThunk<void, UserLoginInfo, AsyncThunkConfig>(
  'USER/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const {data: authData} = await api.post<UserLoginResponse>('http://localhost:3333/auth/login', { email, password });
    Token.save(authData.token);
    dispatch(loadUserData(authData));
  }
);
