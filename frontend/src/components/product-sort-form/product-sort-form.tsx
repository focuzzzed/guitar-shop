import { ChangeEvent, Dispatch, FC } from 'react';
import { SortDirection, SortField } from '../../types/enums.ts';
import { ProductsQueryParams } from '../../types/products.types.ts';

type ProductSortFormProps = {
  query: ProductsQueryParams;
  setQuery: Dispatch<ProductsQueryParams>;
}

export const ProductSortForm: FC<ProductSortFormProps> = ({ query, setQuery }) => {

  const handleSortFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setQuery({
      ...query,
      sortField: evt.target.dataset.sortField as SortField,
    });
  };


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className="catalog-sort__type-button catalog-sort__type-button--active"
          aria-label="по дате"
          data-sort-field={SortField.ByAdditionDate}
          onChange={(evt) => handleSortFieldChange(evt)}
        >по дате
        </button>
        <button
          className="catalog-sort__type-button"
          aria-label="по цене"
          data-sort-field={SortField.ByPrice}
          onChange={(evt) => handleSortFieldChange(evt)}
        >по цене
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className="catalog-sort__order-button catalog-sort__order-button--up"
          aria-label="По возрастанию"
          data-sort-direction={SortDirection.Ascending}

        >
        </button>
        <button
          className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active"
          aria-label="По убыванию"
          data-sort-direction={SortDirection.Descending}
        >
        </button>
      </div>
    </div>
  );
};
