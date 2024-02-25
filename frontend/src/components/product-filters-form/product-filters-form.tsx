import { ChangeEvent, FC, useEffect } from 'react';
import { GuitarStringsCount, GuitarTypes } from '../../types/enums.ts';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { getPaginationState } from '../../store/pagination-process/pagination-process.selectors.ts';
import { PaginationState } from '../../types/paginations.types.ts';
import { resetPaginationState, updateGuitarTypes, updateStringsCount } from '../../store/pagination-process/pagination-process.slice.ts';
import { fetchProducts } from '../../service/api-actions.ts';

export const ProductFiltersForm: FC = () => {
  const dispatch = useAppDispatch();
  const paginationState = useAppSelector<PaginationState>(getPaginationState);

  useEffect(() => {
    dispatch(fetchProducts(paginationState));
  }, [paginationState, dispatch]);

  const handleTypeCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const selectedType = evt.target.value;
    dispatch(updateGuitarTypes(selectedType as GuitarTypes));
  };

  const handleStringsCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const selectedCount = Number(evt.target.value);
    dispatch(updateStringsCount(selectedCount as GuitarStringsCount));
  };

  const handleResetButtonClick = () => dispatch(resetPaginationState());

  return(
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            value={GuitarTypes.Acoustic}
            checked={paginationState.guitarTypes.includes(GuitarTypes.Acoustic)}
            onChange={(evt) => handleTypeCheckboxChange(evt)}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            value={GuitarTypes.Electro}
            checked={paginationState.guitarTypes.includes(GuitarTypes.Electro)}
            onChange={(evt) => handleTypeCheckboxChange(evt)}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            value={GuitarTypes.Ukulele}
            checked={paginationState.guitarTypes.includes(GuitarTypes.Ukulele)}
            onChange={(evt) => handleTypeCheckboxChange(evt)}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            value={GuitarStringsCount.FourString}
            checked={paginationState.stringsCount.includes(GuitarStringsCount.FourString)}
            onChange={(evt) => handleStringsCheckboxChange(evt)}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            value={GuitarStringsCount.SixString}
            checked={paginationState.stringsCount.includes(GuitarStringsCount.SixString)}
            onChange={(evt) => handleStringsCheckboxChange(evt)}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            value={GuitarStringsCount.SevenString}
            checked={paginationState.stringsCount.includes(GuitarStringsCount.SevenString)}
            onChange={(evt) => handleStringsCheckboxChange(evt)}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            value={GuitarStringsCount.TwelveString}
            checked={paginationState.stringsCount.includes(GuitarStringsCount.TwelveString)}
            onChange={(evt) => handleStringsCheckboxChange(evt)}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={handleResetButtonClick}
      >Очистить
      </button>
    </form>
  );
};
