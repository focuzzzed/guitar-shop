import { Header } from '../../components/header/header.tsx';
import { Footer } from '../../components/footer/footer.tsx';

export const ErrorPage = () => (
  <>
    <Header />
    <main className="page-content">
      <div className="container">
        <section className="error">
          <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
          <p className="error__text"> Возможно, страница была удалена или<br />её вовсе не существовало.</p>
          <button className="button button__error button--small button--black-border">Продолжить покупки</button>
        </section>
      </div>
    </main>
    <Footer />
  </>
)
