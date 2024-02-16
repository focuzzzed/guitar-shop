import { State } from '../../hooks/use-app-selector.ts';
import { NameSpace } from '../../types/enums.ts';

export const getAuthStatus = (state: Pick<State, typeof NameSpace.User>) => state.USER.authStatus;

export const getUser = (state: Pick<State, typeof NameSpace.User>) => state.USER.userInfo;

export const getUserLoadingStatus = (state: Pick<State, typeof NameSpace.User>) => state.USER.isLoading;
