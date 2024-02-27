import { State } from '../../hooks/use-app-selector.ts';
import { NameSpace } from '../../types/enums.ts';

type UserProcessState = Pick<State, typeof NameSpace.User>;

export const getAuthStatus = (state: UserProcessState) => state.USER.authStatus;

export const getUser = (state: UserProcessState) => state.USER.userInfo;

export const getUserLoadingStatus = (state: UserProcessState) => state.USER.isLoading;
