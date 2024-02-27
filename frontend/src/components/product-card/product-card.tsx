import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { fetchCurrentProduct } from '../../service/api-actions.ts';
import { useParams } from 'react-router-dom';
import { ErrorPage } from '../../pages/error-page/error-page.tsx';
import { Spinner } from '../spinner/spinner.tsx';
import { getCurrentProduct, getProducts, getProductsLoadingStatus } from '../../store/product-process/product-process.selectors.ts';
import { ProductTab } from '../../types/enums.ts';

export const ProductCard = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const currentProduct = useAppSelector(getCurrentProduct);
  const isProductsLoading = useAppSelector(getProductsLoadingStatus);
  const { id: currentProductId} = useParams();
  const [activeTab, setActiveTab] = useState<ProductTab>(ProductTab.Characteristics);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
  const isExistsProduct = products.some((product) => product.id === currentProductId);

  useEffect(() => {
    if (isExistsProduct && currentProductId) {
      dispatch(fetchCurrentProduct(currentProductId));
      setIsProductLoading(false);
    }
  }, [dispatch, currentProductId, isExistsProduct]);

  const handleTabClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    const tabName = evt.currentTarget.dataset.tabName;
    setActiveTab(tabName as ProductTab);
  };

  if(!isExistsProduct && !isProductLoading && !isProductsLoading) {
    return (<ErrorPage />);
  } else if (isProductLoading) {
    return (<Spinner />);
  }

  if(!currentProduct) {
    return (<ErrorPage />);
  }

  return (
    <div className="product-container">
      <img
        className="product-container__img"
        src={ currentProduct.photoUrl }
        width="90"
        height="235"
        alt={`${ currentProduct.title } image`}
      />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{ currentProduct.title }</h2>
        <br />
        <br />
        <div className="tabs">
          <a
            className={`button button--medium ${activeTab === ProductTab.Characteristics ? '' : 'button--black-border'} tabs__button`}
            data-tab-name={ProductTab.Characteristics}
            onClick={(evt) => handleTabClick(evt)}
          >
            Характеристики
          </a>
          <a
            className={`button button--medium ${activeTab === ProductTab.Description ? '' : 'button--black-border'} tabs__button`}
            data-tab-name={ProductTab.Description}
            onClick={(evt) => handleTabClick(evt)}
          >
            Описание
          </a>
          <div className="tabs__content" id="characteristics">
            <table className={`tabs__table ${activeTab === ProductTab.Characteristics ? '' : 'hidden'}`}>
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{ currentProduct.article }</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{ currentProduct.guitarType }</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{ currentProduct.stringsCount } струнная</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="tabs__content" id="description">
          <p className={`tabs__product-description ${activeTab === ProductTab.Description ? '' : 'hidden'}`}>
            { currentProduct.description }
          </p>
        </div>
      </div>
    </div>
  );
};
