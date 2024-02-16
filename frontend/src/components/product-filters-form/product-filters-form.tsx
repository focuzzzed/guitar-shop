import { ChangeEvent, Dispatch, FC } from 'react';
import { ProductsQueryParams } from '../../types/products.types.ts';
import { GuitarStringsCount, GuitarTypes } from '../../types/enums.ts';

type ProductFiltersFormProps = {
  query: ProductsQueryParams;
  setQuery: Dispatch<ProductsQueryParams>;
}

export const ProductFiltersForm: FC<ProductFiltersFormProps> = ({ query, setQuery }) => {
  const handleGuitarTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if(evt.target.checked) {
      setQuery({
        ...query,
        guitarTypes: [].concat(guitarTypes as GuitarTypes[], evt.target.value),
      });
    } else {
      setQuery({
        ...query,
        guitarTypes: [guitarTypes].flat(2).filter((value) => value !== evt.target.value),
      });
    }
  };

  const handleStringsCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if(evt.target.checked) {
      setQuery({
        ...query,
        stringsCount: [].concat(guitarStringsCount as GuitarStringsCount[], evt.target.value),
      });
    } else {
      setQuery({
        ...query,
        stringsCount: [guitarTypes].flat(2).filter((value) => value !== evt.target.value),
      });
    }
  };

  return (
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
            onChange={(evt) => handleGuitarTypeChange(evt)}
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
            onChange={(evt) => handleGuitarTypeChange(evt)}
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
            onChange={(evt) => handleGuitarTypeChange(evt)}
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
            onChange={(evt) => handleStringsCountChange(evt)}
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
            onChange={(evt) => handleStringsCountChange(evt)}
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
            onChange={(evt) => handleStringsCountChange(evt)}
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
            onChange={(evt) => handleStringsCountChange(evt)}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
};
