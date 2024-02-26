import { useEffect, MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getPaginationState } from '../../store/pagination-process/pagination-process.selectors';
import { getCurrentPage, getPagesCount } from '../../store/product-process/product-process.selectors';
import { fetchProducts } from '../../service/api-actions';
import { updateCurrentPage } from '../../store/pagination-process/pagination-process.slice';

export const ProductPaginationButtons = () => {
  const dispatch = useAppDispatch();
  const paginationState = useAppSelector(getPaginationState);
  const currentPage = useAppSelector(getCurrentPage);
  const pagesCount = useAppSelector(getPagesCount);
  const pages = Array.from({length: pagesCount});

  useEffect(() => {
    dispatch(fetchProducts(paginationState));
  }, [dispatch, paginationState]);

  const handlePageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    const pageNumber = Number(evt.currentTarget.dataset.pageNumber);
    dispatch(updateCurrentPage(pageNumber));
  };

  const handleNextPageClick = () => {
    if(currentPage + 1 > pagesCount){
      return null;
    }

    const nextPageNumber = currentPage + 1;
    dispatch(updateCurrentPage(nextPageNumber));
  };

  return(
    <div className="pagination product-list__pagination">
      <ul className="pagination__list">
        { pages.map((_, index) =>
          (
            <li
              className={`pagination__page ${currentPage === (index + 1) ? 'pagination__page--active' : ''}`}
              key={`page-${index + 1}`}
            >
              <a
                className="link pagination__page-link"
                data-page-number={index + 1}
                onClick={(evt) => handlePageClick(evt)}
              >{index + 1}
              </a>
            </li>
          )
        )}

        <li className="pagination__page pagination__page--next" id="next">
          <a
            className="link pagination__page-link"
            onClick={handleNextPageClick}
          >Далее
          </a>
        </li>
      </ul>
    </div>
  );
};
