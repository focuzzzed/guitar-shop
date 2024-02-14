import { Header } from '../../components/header/header.tsx';
import { Footer } from '../../components/footer/footer.tsx';
import { AuthForm } from '../../components/auth-form/auth-form.tsx';

export const LoginPage = () => {
  return(
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Войти</h1>
            <p className="login__text">Hовый пользователь? <a className="login__link" href="registration.html">Зарегистрируйтесь</a> прямо сейчас</p>
            <AuthForm isRegister={false}/>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};
