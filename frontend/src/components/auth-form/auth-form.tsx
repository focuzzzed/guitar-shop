import { FC, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { loginUser, registerUser } from '../../service/api-actions.ts';
import { State, useAppSelector } from '../../hooks/use-app-selector.ts';
import { NameSpace } from '../../types/enums.ts';
import { useHistory, useNavigate } from 'react-router-dom';
import { Paths } from '../../service/const.ts';
import { getUserLoadingStatus } from '../../store/user-process/user-process.selectors.ts';

type AuthFormProps = {
  isRegister: boolean
}

type FormData = {
  name: string,
  email: string,
  password: string
}

export const AuthForm: FC<AuthFormProps> = ({ isRegister }) => {
  const initialFormData: FormData = {name: '', email: '', password: ''};

  const [formData, setFormData] = useState(initialFormData);
  const passwordFieldRef = useRef<HTMLInputElement>(null);
  const isLoading = useAppSelector(getUserLoadingStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEyeMouseDown = () => {
    if(passwordFieldRef.current) {
      passwordFieldRef.current.type = 'text';
    }
  };

  const handleEyeMouseUp = () => {
    if(passwordFieldRef.current) {
      passwordFieldRef.current.type = 'password';
    }
  };

  const handleAuthSubmit = (evt) => {
    evt.preventDefault();
    if(isRegister) {
      dispatch(registerUser(formData))
        .then(navigate('../', { replace: true }));
    } else {
      dispatch(loginUser(formData));
    }
  }

  return (
    <form
      method="post"
      action="/"
      onSubmit={(evt) => handleAuthSubmit(evt)}
    >
      {isRegister && (
        <div className="input-login">
          <label htmlFor="name">Введите имя</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            value={formData.name}
            onChange={(evt) => setFormData({
              ...formData,
              name: evt.target.value
            })}
            required
          />
          <p className="input-login__error" style={{ visibility: !formData.name.length ? 'visible' : 'hidden' }}>Заполните поле</p>
        </div>
      )}

      <div className="input-login">
        <label htmlFor="email">Введите e-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          value={formData.email}
          onChange={(evt) => setFormData({
            ...formData,
            email: evt.target.value
          })}
          required
        />
        <p className="input-login__error" style={{ visibility: !formData.email.length ? 'visible' : 'hidden' }}>Заполните поле</p>

      </div>

      <div className="input-login">
        <label htmlFor="passwordLogin"> {isRegister ? 'Придумайте' : 'Введите'} пароль</label>
        <span>
          <input
            type="password"
            placeholder="• • • • • • • • • • • •"
            id="passwordLogin"
            name="password"
            maxLength={12}
            autoComplete="off"
            value={formData.password}
            onChange={(evt) => setFormData({
              ...formData,
              password: evt.target.value,
            })}
            ref={passwordFieldRef}
            required
          />
          <button
            className="input-login__button-eye"
            type="button"
            onMouseDown={handleEyeMouseDown}
            onMouseUp={handleEyeMouseUp}
          >
            <svg width="14" height="8" aria-hidden="true"><use xlinkHref="#icon-eye"></use></svg>
          </button>
        </span>
        <p className="input-login__error" style={{visibility: !formData.password.length ? 'visible' : 'hidden'}}>Заполните поле</p>
      </div>
      <button
        className="button login__button button--medium"
        type="submit"
        disabled={isLoading}
      >{isRegister ? 'Зарегистрироваться' : 'Войти'}
      </button>
    </form>
  );
};
