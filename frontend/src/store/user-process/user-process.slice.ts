import { AuthorizationStatus, NameSpace } from '../../types/enums.ts';
import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, loginUser, registerUser } from '../../service/api-actions.ts';
import { Token } from '../../service/token.ts';
import { InitialUserState, UserInfo } from '../../types/users.types.ts';

export const initialUserState: InitialUserState = {
  authStatus: AuthorizationStatus.Unknown,
  userInfo: {
    name: '',
    email: '',
  },
  isLoading: false,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState: initialUserState,
  reducers: {
    loadUserData: (state, action: {payload: UserInfo}) => {
      state.userInfo = action.payload;
    },
    logoutUser: (state) => {
      state.authStatus = AuthorizationStatus.NoAuth;
      Token.drop();
      state.userInfo = initialUserState.userInfo;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });
  }
});


export const { loadUserData } = userProcess.actions;
