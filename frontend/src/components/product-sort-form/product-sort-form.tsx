import { FC } from 'react';
import { SortDirection, SortField } from '../../types/enums.ts';

export const ProductSortForm: FC = () => (
  <div className="catalog-sort">
    <h2 className="catalog-sort__title">Сортировать:</h2>
    <div className="catalog-sort__type">
      <button
        className="catalog-sort__type-button catalog-sort__type-button--active"
        aria-label="по дате"
        data-sort-field={SortField.ByAdditionDate}
      >по дате
      </button>
      <button
        className="catalog-sort__type-button"
        aria-label="по цене"
        data-sort-field={SortField.ByPrice}
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
