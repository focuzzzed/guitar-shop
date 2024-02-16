import { State, useAppSelector } from '../../hooks/use-app-selector.ts';
import { NameSpace } from '../../types/enums.ts';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { fetchCurrentProduct } from '../../service/api-actions.ts';
import { useParams } from 'react-router-dom';
import { ErrorPage } from '../../pages/error-page/error-page.tsx';
import { Spinner } from '../spinner/spinner.tsx';
import { getCurrentProduct, getProductsLoadingStatus } from '../../store/product-process/product-process.selectors.ts';

export const ProductCard = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getProductsLoadingStatus);
  const params = useParams();
  const product = useAppSelector(getCurrentProduct);
  const descriptionTabRef = useRef<HTMLInputElement>();
  const tableTabRef = useRef<HTMLInputElement>();
  const [isActiveTab, setActiveTab] = useState(false);

  useEffect(() => {
    const {id} = params;
    if (id) {
      dispatch(fetchCurrentProduct(id));
    }
  }, [dispatch, params]);

  const handleTabClick = (evt: ChangeEvent<HTMLInputElement>) => {
    const isDescriptionTab = evt.target.dataset.name === 'description';
    if (isDescriptionTab) {
      setActiveTab(true);
    } else {
      setActiveTab(false);
    }
    descriptionTabRef.current?.classList.toggle('hidden', !isDescriptionTab);
    tableTabRef.current?.classList.toggle('hidden', isDescriptionTab);
  };

  if(isLoading) {
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
          <a
            className={`button button--medium ${!isActiveTab && 'button--black-border'} tabs__button`}
            data-name="table"
            onClick={(evt) => handleTabClick(evt)}
          >Характеристики
          </a>
          <a
            className={`button button--medium ${isActiveTab && 'button--black-border'} tabs__button`}
            data-name="description"
            onClick={(evt) => handleTabClick(evt)}
          >Описание
          </a>
          <div className="tabs__content" id="characteristics">
            <table
              className="tabs__table"
              ref={tableTabRef}
            >
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
            <p
              className="tabs__product-description hidden"
              ref={descriptionTabRef}
            >
              { product.description }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
