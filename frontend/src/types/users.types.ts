import { AuthorizationStatus } from './enums.ts';

export type UserInfo = {
  name: string;
  email: string;
}

export type UserState = {
  authStatus: AuthorizationStatus;
  userInfo: UserInfo;
  isLoading: boolean;
};


export type UserLoginInfo = {
  email: string;
  password: string;
};

export type UserRegisterInfo = {
  name: string;
  email: string;
  password: string;
}

export type UserLoginResponse = {
  name: string;
  email: string;
  accessToken: string;
};
