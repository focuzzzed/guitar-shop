import { Link, useLocation } from 'react-router-dom';
import { Paths } from '../../service/const.ts';
import { CrumbName } from '../../types/enums.ts';

export const Breadcrumbs = () => {
  const Crumbs = {
    products: [
      {link: Paths.Login, name: CrumbName.Login},
      {link: Paths.Products, name: CrumbName.Products},
    ],
    create: [
      {link: Paths.Login, name: CrumbName.Login},
      {link: Paths.Products, name: CrumbName.Products},
    ],
  };
  const location = useLocation();
  return (
    <>
      <h1 className="add-item__title">ИЗМЕНЯЕМЫЙ ТОВАР</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item"><Link className="link" to={Paths.Login}>{CrumbName.Login}</Link></li>
        <li className="breadcrumbs__item"><Link className="link" to={Paths.Products}>{CrumbName.Products}</Link></li>
      </ul>
    </>
  );
};
