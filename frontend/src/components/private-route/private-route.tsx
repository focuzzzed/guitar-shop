import { Spinner } from '../spinner/spinner.tsx';
import { AuthorizationStatus } from '../../types/enums.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { Navigate } from 'react-router-dom';
import { getAuthStatus } from '../../store/user-process/user-process.selectors.ts';
import { FC } from 'react';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: string;
  children: JSX.Element;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ restrictedFor, redirectTo, children }) => {
  const authStatus = useAppSelector(getAuthStatus);

  if(authStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (
    authStatus !== restrictedFor
      ? children
      : <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;
