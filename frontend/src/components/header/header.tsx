import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { AuthorizationStatus } from '../../types/enums.ts';
import { Link } from 'react-router-dom';
import { Paths } from '../../service/const.ts';
import { getAuthStatus, getUser } from '../../store/user-process/user-process.selectors.ts';

export const Header = () => {
  const isAuth = useAppSelector(getAuthStatus) === AuthorizationStatus.Auth;
  const user = useAppSelector(getUser);

  return (
    <header className={`header ${isAuth ? 'header--admin' : ''}`} id="header">
      <div className="container">
        <div className="header__wrapper">
          <a className="header__logo logo" title="Пока не реализовано">
            <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
          </a>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><Link className="link main-nav__link" to={Paths.Products}>Каталог</Link></li>
              <li className="main-nav__item"><a className="link main-nav__link" href="#">{ isAuth ? 'Список товаров' : 'Где купить?'}</a></li>
              <li className="main-nav__item"><a className="link main-nav__link" href="#">{ !isAuth && 'О компании' }</a></li>
            </ul>
          </nav>
          <div className="header__container"><span className="header__user-name">{user.name ?? null}   </span>
            <Link className="header__link" to={ Paths.Login } aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
