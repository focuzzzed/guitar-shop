import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { State, useAppSelector } from '../../hooks/use-app-selector.ts';
import { NameSpace } from '../../types/enums.ts';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { Paths } from '../../service/const.ts';
import { LoginPage } from '../../pages/login/login-page.tsx';
import { RegisterPage } from '../../pages/register/register-page.tsx';
import { ErrorPage } from '../../pages/error-page/error-page.tsx';
import { AddItemPage } from '../../pages/add-item-page/add-item-page.tsx';
import { useEffect } from 'react';
import { checkAuth, fetchProducts } from '../../service/api-actions.ts';

export const App = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state: Pick<State, typeof NameSpace.User>) => state.USER.authStatus);

  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(checkAuth());
  })

  return(
    <HelmetProvider>
      <Routes>
        <Route
          path={Paths.Login}
          element={<LoginPage/>}
        />
        <Route
          path={Paths.Register}
          element={<RegisterPage/>}
        />
        <Route
          path={Paths.Error}
          element={<ErrorPage/>}
        />
        <Route
          path={Paths.Create}
          element={<AddItemPage/>}
        />
      </Routes>
    </HelmetProvider>
  );
};
