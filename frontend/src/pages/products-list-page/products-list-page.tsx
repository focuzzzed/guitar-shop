import { Header } from '../../components/header/header.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../service/const.ts';
import { CrumbName, NameSpace } from '../../types/enums.ts';
import { ProductFiltersForm } from '../../components/product-filters-form/product-filters-form.tsx';
import { ProductSortForm } from '../../components/product-sort-form/product-sort-form.tsx';
import { Footer } from '../../components/footer/footer.tsx';
import { State, useAppSelector } from '../../hooks/use-app-selector.ts';
import { ProductPreviewCard } from '../../components/product-preview-card/product-preview-card.tsx';
import { Product } from '../../types/products.types.ts';
import { ProductPaginationButtons } from '../../components/product-pagination-buttons/product-pagination-buttons.tsx';

export const ProductsListPage = () => {
  const navigate = useNavigate();
  const products = useAppSelector<Product[]>((state: Pick<State, typeof NameSpace.Products>) => state.PRODUCT.pagination.entities);

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
              <ProductFiltersForm />
              <ProductSortForm />
              <div className="catalog-cards">
                <ul className="catalog-cards__list">
                  {products.map((product) => (<ProductPreviewCard product={product} key={product.id}/>))}
                </ul>
              </div>
            </div>
            <button
              className="button product-list__button button--red button--big"
              onClick={() => navigate(Paths.Create, {replace: true})}
            >Добавить новый товар
            </button>
            <ProductPaginationButtons />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
