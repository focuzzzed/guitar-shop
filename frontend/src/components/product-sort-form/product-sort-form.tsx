import { FC, MouseEvent, useEffect } from 'react';
import { SortDirection, SortField } from '../../types/enums.ts';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { getPaginationState } from '../../store/pagination-process/pagination-process.selectors.ts';
import { fetchProducts } from '../../service/api-actions.ts';
import { updateSortDirection, updateSortField } from '../../store/pagination-process/pagination-process.slice.ts';

export const ProductSortForm: FC = () => {
  const dispatch = useAppDispatch();
  const paginationState = useAppSelector(getPaginationState);

  useEffect(() =>{
    dispatch(fetchProducts(paginationState));
  }, [dispatch, paginationState]);

  const handleSortFieldButtonChange = (evt: MouseEvent<HTMLButtonElement>) => {
    const newSortField = evt.currentTarget.dataset.sortField;
    dispatch(updateSortField(newSortField as SortField));
  };

  const handleSortDirectionButtonChange = (evt: MouseEvent<HTMLButtonElement>) => {
    const newSortDirection = evt.currentTarget.dataset.sortDirection;
    dispatch(updateSortDirection(newSortDirection as SortDirection));
  };

  return(
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${paginationState.sortField === SortField.ByAdditionDate ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по дате"
          data-sort-field={SortField.ByAdditionDate}
          onClick={(evt) => handleSortFieldButtonChange(evt)}
        >по дате
        </button>
        <button
          className={`catalog-sort__type-button ${paginationState.sortField === SortField.ByPrice ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          data-sort-field={SortField.ByPrice}
          onClick={(evt) => handleSortFieldButtonChange(evt)}
        >по цене
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${paginationState.sortDirection === SortDirection.Ascending ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          data-sort-direction={SortDirection.Ascending}
          onClick={(evt) => handleSortDirectionButtonChange(evt)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${paginationState.sortDirection === SortDirection.Descending ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          data-sort-direction={SortDirection.Descending}
          onClick={(evt) => handleSortDirectionButtonChange(evt)}
        >
        </button>
      </div>
    </div>
  );
};
