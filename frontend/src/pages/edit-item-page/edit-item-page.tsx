import { Header } from '../../components/header/header.tsx';
import { ItemForm } from '../../components/item-form/item-form.tsx';
import { Footer } from '../../components/footer/footer.tsx';
import { Link, useParams } from 'react-router-dom';
import { Paths } from '../../service/const.ts';
import { CrumbName } from '../../types/enums.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { fetchCurrentProduct } from '../../service/api-actions.ts';
import { ErrorPage } from '../error-page/error-page.tsx';
import { useEffect } from 'react';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { getCurrentProduct, getProductsLoadingStatus } from '../../store/product-process/product-process.selectors.ts';

export const EditItemPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getProductsLoadingStatus);
  const product = useAppSelector(getCurrentProduct);

  useEffect(() => {
    const { id } = params;
    if (id) {
      dispatch(fetchCurrentProduct(id));
    }
  }, [dispatch, params]);

  if(isLoading) {
    return <Spinner/>;
  }

  if(!product) {
    return <ErrorPage/>;
  }

  return (
    <>
      <Header />
      <main className="page-content">
        <section className="edit-item">
          <div className="container">
            <h1 className="add-item__title">{ product.title }</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><Link className="link" to={Paths.Login}>{CrumbName.Login}</Link></li>
              <li className="breadcrumbs__item"><Link className="link" to={Paths.Products}>{CrumbName.Products}</Link></li>
              <li className="breadcrumbs__item"><Link className="link" to="#">{ product.title }</Link></li>
            </ul>
            <ItemForm product={product} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
