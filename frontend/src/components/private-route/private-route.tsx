import React from 'react';
import { Spinner } from '../spinner/spinner.tsx';
import { AuthorizationStatus, NameSpace } from '../../types/enums.ts';
import { State, useAppSelector } from '../../hooks/use-app-selector.ts';
import { Navigate } from 'react-router-dom';
import { Paths } from 'tsconfig-paths/lib/mapping-entry';
import { getAuthStatus } from '../../store/user-process/user-process.selectors.ts';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: Paths;
  children: JSX.Element;
}

const PrivateRoute = ({ children, restrictedFor, redirectTo }: PrivateRouteProps): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (
    authorizationStatus !== restrictedFor
      ? children
      : <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;
