import { Link } from 'react-router-dom';
import { Paths } from '../../service/const.ts';
import { FC } from 'react';
import { Product } from '../../types/products.types.ts';
import * as dayjs from 'dayjs';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { deleteProduct } from '../../service/api-actions.ts';

type ProductPreviewCardProps = {
  product: Product & { id: string };
}

export const ProductPreviewCard: FC<ProductPreviewCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={product.photoUrl} width="36" height="93" alt="Картинка гитары" />
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={`${Paths.Products}/${product.id}`}>
            <p className="catalog-item__data-title">{product.title}</p>
          </Link>
          <br />
          <p className="catalog-item__data-date">Дата добавления {dayjs(product.additionDate).format('DD.MM.YYYY')}</p>
          <p className="catalog-item__data-price">{product.price} ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link
          className="button button--small button--black-border"
          aria-label="Редактировать товар"
          to={`${Paths.Products}/${product.id}/edit`}
        >Редактировать
        </Link>
        <button
          className="button button--small button--black-border"
          type="submit"
          aria-label="Удалить товар"
          onClick={() => {
            dispatch(deleteProduct(product.id));
          }}
        >Удалить
        </button>
      </div>
    </li>
  );
};
