import { Spinner } from '../spinner/spinner.tsx';
import { AuthorizationStatus } from '../../types/enums.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { Navigate } from 'react-router-dom';
import { getAuthStatus } from '../../store/user-process/user-process.selectors.ts';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: string;
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
