import { ChangeEvent, FC, useRef, useState } from 'react';
import { DetailedProduct } from '../../types/products.types.ts';
import { GuitarStringsCount, GuitarTypes } from '../../types/enums.ts';
import { BACKEND_PHOTO_FIELD_NAME } from '../../service/const.ts';

export type ItemFormProps = {
  product?: DetailedProduct;
}


export const ItemForm: FC<ItemFormProps> = ({ product }) => {
  const initialProduct: DetailedProduct = {
    title: '',
    description: '',
    additionDate: '',
    photoUrl: '',
    guitarType: GuitarTypes.Acoustic,
    article: '',
    stringsCount: 4,
    price: 100,
  };

  const [formData, setFormData] = useState<DetailedProduct>(product ?? initialProduct);
  const [productPhoto, setProductPhoto] = useState<File>();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleUploadButtonClick = () => {
    if(inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if(evt.target.files){
      setProductPhoto(evt.target.files[0]);

      if(productPhoto){
        const data = new FormData();
        data.append(BACKEND_PHOTO_FIELD_NAME, productPhoto);
      }
    }
  };

  return(
    <form className="add-item__form" action="#" method="get">
      <div className="add-item__form-left">

        <div className="edit-item-image add-item__form-image">
          <div className="edit-item-image__image-wrap"></div>
          <div className="edit-item-image__btn-wrap">
            <button
              className="button button--small button--black-border edit-item-image__btn"
              onClick={handleUploadButtonClick}
            >
              <input
                type="file"
                name="photoURL"
                accept="image/*, .png, .jpg"
                ref={inputFileRef}
                onChange={handleUpload}
                hidden
              />
              { formData.photoUrl ? 'Заменить' : 'Добавить' }
            </button>
            <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
          </div>
        </div>
        <div
          className="input-radio add-item__form-radio"
          onChangeCapture={(evt: ChangeEvent<HTMLInputElement>) => {
            setFormData({
              ...formData,
              guitarType: evt.target.value as GuitarTypes,
            });
          }}
        >
          <span>{ product ? 'Т' : 'Выберите т' }ип товара</span>
          <input
            type="radio"
            id="guitar"
            name="item-type"
            value={ GuitarTypes.Acoustic }
            checked={ formData.guitarType === GuitarTypes.Acoustic }
          />
          <label htmlFor="guitar">Акустическая гитара</label>
          <input
            type="radio"
            id="el-guitar"
            name="item-type"
            value={ GuitarTypes.Electro }
            checked={ formData.guitarType === GuitarTypes.Electro }
          />
          <label htmlFor="el-guitar">Электрогитара</label>
          <input
            type="radio"
            id="ukulele"
            name="item-type"
            value={ GuitarTypes.Ukulele }
            checked={ formData.guitarType === GuitarTypes.Ukulele }
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
        <div
          className="input-radio add-item__form-radio"
          onChangeCapture={(evt: ChangeEvent<HTMLInputElement>) => {
            setFormData({
              ...formData,
              stringsCount: Number(evt.target.value),
            });
          }}
        >
          <span>Количество струн</span>
          <input
            type="radio"
            id="string-qty-4"
            name="string-qty"
            value={GuitarStringsCount.FourString}
            checked={GuitarStringsCount.FourString === formData.stringsCount}
          />
          <label htmlFor="string-qty-4">4</label>
          <input
            type="radio"
            id="string-qty-6"
            name="string-qty"
            value={GuitarStringsCount.SixString}
            checked={GuitarStringsCount.SixString === formData.stringsCount}
          />
          <label htmlFor="string-qty-6">6</label>
          <input
            type="radio"
            id="string-qty-7"
            name="string-qty"
            value={GuitarStringsCount.SevenString}
            checked={GuitarStringsCount.SevenString === formData.stringsCount}
          />
          <label htmlFor="string-qty-7">7</label>
          <input
            type="radio"
            id="string-qty-12"
            name="string-qty"
            value={GuitarStringsCount.TwelveString}
            checked={GuitarStringsCount.TwelveString === formData.stringsCount}
          />
          <label htmlFor="string-qty-12">12</label>
        </div>
      </div>
      <div className="add-item__form-right">
        <div className="custom-input add-item__form-input">
          <label>
            <span>Дата добавления товара</span>
            <input
              type="text"
              name="date"
              pattern="\d\d.\d\d.\d\d\d\d"
              value={ formData.additionDate }
              placeholder="Дата в формате 00.00.0000"
              onChange={(evt) => {
                setFormData({
                  ...formData,
                  additionDate: evt.target.value,
                });
              }}
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input">
          <label>
            <span>{ product ? 'Н' : 'Введите н' }аименование товара</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              placeholder="Наименование"
              minLength={10}
              maxLength={100}
              onChange={(evt) => {
                setFormData({
                  ...formData,
                  title: evt.target.value,
                });
              }}
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
          <label>
            <span>{ product ? 'Цена' : 'Введите цену' } товара</span>
            <input
              type="number"
              name="price"
              min="100"
              max="1000000"
              step="100"
              value={ formData.price }
              placeholder="Цена в формате 00 000"
              onChange={(evt) => {
                setFormData({
                  ...formData,
                  price: Number(evt.target.value),
                });
              }}
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input add-item__form-input">
          <label>
            <span>Введите артикул товара</span>
            <input
              type="text"
              minLength={5}
              maxLength={40}
              name="sku"
              value={ formData.article }
              placeholder="Артикул товара"
              onChange={(evt) => {
                setFormData({
                  ...formData,
                  article: evt.target.value,
                });
              }}
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-textarea add-item__form-textarea">
          <label>
            <span>{ product ? 'О' : 'Введите о' }писание товара</span>
            <textarea
              name="description"
              placeholder=""
              minLength={20}
              maxLength={1024}
              value={ formData.description }
              onChange={(evt) => {
                setFormData({
                  ...formData,
                  description: evt.target.value
                });
              }}
            />
          </label>
          <p>Заполните поле</p>
        </div>
      </div>
      <div className="add-item__form-buttons-wrap">
        <button className="button button--small add-item__form-button" type="submit">Сохранить изменения</button>
        <button className="button button--small add-item__form-button" type="button">Вернуться к списку товаров</button>
      </div>
    </form>
  );
};
