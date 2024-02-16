import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { AuthorizationStatus } from '../../types/enums.ts';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { Paths } from '../../service/const.ts';
import { LoginPage } from '../../pages/login/login-page.tsx';
import { RegisterPage } from '../../pages/register/register-page.tsx';
import { ErrorPage } from '../../pages/error-page/error-page.tsx';
import { AddItemPage } from '../../pages/add-item-page/add-item-page.tsx';
import { useEffect } from 'react';
import { checkAuth, fetchProducts } from '../../service/api-actions.ts';
import { ProductPage } from '../../pages/product-page/product-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import { ProductsListPage } from '../../pages/products-list-page/products-list-page.tsx';
import { EditItemPage } from '../../pages/edit-item-page/edit-item-page.tsx';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(checkAuth());
  });

  return(
    <HelmetProvider>
      <Routes>
        <Route
          path={Paths.Login}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={Paths.Products}>
              <LoginPage/>
            </PrivateRoute>
          }
        />

        <Route
          path={Paths.Register}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={Paths.Products}>
              <RegisterPage/>
            </PrivateRoute>
          }
        />

        <Route path={Paths.Error} element={<ErrorPage/>} />

        <Route
          path={Paths.Create}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={Paths.Products}>
              <AddItemPage/>
            </PrivateRoute>
          }
        />

        <Route path={Paths.Update} element={
          <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={Paths.Products}>
            <EditItemPage/>
          </PrivateRoute>
        }
        />

        <Route
          path={Paths.Products}
          element={
            <ProductsListPage/>
          }
        />

        <Route
          path={Paths.Product}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={Paths.Products}>
              <ProductPage/>
            </PrivateRoute>
          }
        />
      </Routes>
    </HelmetProvider>
  );
};
