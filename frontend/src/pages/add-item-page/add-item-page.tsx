import { ItemForm } from '../../components/item-form/item-form.tsx';
import { Footer } from '../../components/footer/footer.tsx';
import { Header } from '../../components/header/header.tsx';
import { Link } from 'react-router-dom';
import { Paths } from '../../service/const.ts';
import { CrumbName } from '../../types/enums.ts';

export const AddItemPage = () => (
  <>
    <Header />
    <main className="page-content">
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">{CrumbName.Create}</h1>
          <ul className="breadcrumbs">
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><Link className="link" to={Paths.Login}>{CrumbName.Login}</Link></li>
              <li className="breadcrumbs__item"><Link className="link" to={Paths.Products}>{CrumbName.Products}</Link></li>
              <li className="breadcrumbs__item"><Link className="link" to="#">{CrumbName.Create}</Link></li>
            </ul>
          </ul>
          <ItemForm product={undefined} />
        </div>
      </section>
    </main>
    <Footer />
  </>
);
