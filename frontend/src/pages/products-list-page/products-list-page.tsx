import { Header } from '../../components/header/header.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { DEFAULT_PRODUCT_LIMIT, Paths } from '../../service/const.ts';
import { CrumbName, NameSpace, SortDirection, SortField } from '../../types/enums.ts';
import { ProductFiltersForm } from '../../components/product-filters-form/product-filters-form.tsx';
import { ProductSortForm } from '../../components/product-sort-form/product-sort-form.tsx';
import { Footer } from '../../components/footer/footer.tsx';
import { State, useAppSelector } from '../../hooks/use-app-selector.ts';
import { ProductPreviewCard } from '../../components/product-preview-card/product-preview-card.tsx';
import { useState } from 'react';
import { ProductsQueryParams } from '../../types/products.types.ts';

export const ProductsListPage = () => {
  const initialProductsQuery = {
    limit: DEFAULT_PRODUCT_LIMIT,
    guitarTypes: [],
    stringsCount: [],
    sortField: SortField.ByAdditionDate,
    sortDirection: SortDirection.Ascending,
    page: 1,
  };

  const navigate = useNavigate();
  const products = useAppSelector((state: Pick<State, typeof NameSpace.Products>) => state.PRODUCTS.pagination.entities);
  const [query, setQuery] = useState<ProductsQueryParams>()
  return(
    <>
      <Header />
      <main className="page-content">
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><Link className="link" to={Paths.Login}>{CrumbName.Login}</Link></li>
              <li className="breadcrumbs__item"><Link className="link" to={Paths.Products}>{CrumbName.Products}</Link>
              </li>
            </ul>
            <div className="catalog">
              <ProductFiltersForm query={query} setQuery={setQuery} />
              <ProductSortForm query={query} setQuery={setQuery}/>
              <div className="catalog-cards">
                <ul className="catalog-cards__list">
                  {products.map((product) => (<ProductPreviewCard product={product} key={product.id}/>))}
                </ul>
              </div>
            </div>
            <button
              className="button product-list__button button--red button--big"
              onClick={() => navigate(Paths.Create, {redirect: true})}
            >Добавить новый товар
            </button>
            <div className="pagination product-list__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a></li>
                <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a></li>
                <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a></li>
                <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a></li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
