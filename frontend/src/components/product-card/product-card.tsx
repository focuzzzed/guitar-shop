import { State, useAppSelector } from '../../hooks/use-app-selector.ts';
import { NameSpace } from '../../types/enums.ts';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { fetchCurrentProduct } from '../../service/api-actions.ts';
import { useParams } from 'react-router-dom';
import { ErrorPage } from '../../pages/error-page/error-page.tsx';
import { Spinner } from '../spinner/spinner.tsx';

export const ProductCard = () => {
  const dispatch = useAppDispatch();
  const isLoad = useAppSelector((state: Pick<State, typeof NameSpace.Products>) => state.PRODUCTS.isLoading);
  const params = useParams();
  const product = useAppSelector((state: Pick<State, typeof NameSpace.Products>) => state.PRODUCTS.currentProduct);
  //TODO: ТАБЫ
  useEffect(() => {
    const {id} = params;
    if (id) {
      dispatch(fetchCurrentProduct(id));
    }
  }, [dispatch, params]);

  if(isLoad) {
    return <Spinner />;
  }

  if(!product) {
    return (<ErrorPage/>);
  }

  return (
    <div className="product-container">
      <img
        className="product-container__img"
        src={ product.photoUrl }
        width="90"
        height="235"
        alt={`${ product.title } image`}
      />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{ product.title }</h2>
        <br />
        <br />
        <div className="tabs">
          <a className="button button--medium tabs__button" href="#characteristics">Характеристики</a>
          <a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
          <div className="tabs__content" id="characteristics">
            <table className="tabs__table">
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{ product.article }</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{ product.guitarType }</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{ product.stringsCount } струнная</td>
                </tr>
              </tbody>
            </table>
            <p className="tabs__product-description hidden">
              { product.description }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
