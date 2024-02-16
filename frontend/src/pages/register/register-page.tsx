import { Header } from '../../components/header/header.tsx';
import { Footer } from '../../components/footer/footer.tsx';
import { AuthForm } from '../../components/auth-form/auth-form.tsx';

export const RegisterPage = () => (
  <>
    <Header />
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Регистрация</h1>
          <AuthForm isRegister />
        </section>
      </div>
    </main>
    <Footer />
  </>
);
