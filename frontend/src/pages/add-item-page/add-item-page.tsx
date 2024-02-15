import { ItemForm } from '../../components/item-form/item-form.tsx';
import { Footer } from '../../components/footer/footer.tsx';
import { Header } from '../../components/header/header.tsx';

export const AddItemPage = () => {
  return (
    <>
      <Header />
      <main className="page-content">
        <section className="add-item">
          <div className="container">
            <h1 className="add-item__title">Новый товар</h1>
            <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Вход</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">Товары</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">Новый товар</a>
            </li>
            </ul>
             <ItemForm product={null}/>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
