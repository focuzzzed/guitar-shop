import { AuthorizationStatus, NameSpace } from '../../types/enums.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkAuth, loginUser, registerUser } from '../../service/api-actions.ts';
import { Token } from '../../service/token.ts';
import { UserState, UserInfo } from '../../types/users.types.ts';

export const initialUserState: UserState = {
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
    loadUserData: (state, action: PayloadAction<UserInfo>) => {
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
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      });
  }
});


export const { loadUserData } = userProcess.actions;
