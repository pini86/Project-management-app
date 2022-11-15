import { useSignInQuery } from 'api/AuthApi';
import { useState } from 'react';
import { ISignIn } from 'models/User';
import TextInputForm from '../../components/Forms';
import { IErrorResponse } from '../../models/ErrorResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { Box, CircularProgress } from '@mui/material';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [user, setUser] = useState({
    login: '',
    password: '',
  });

  const [isUser, setIsUser] = useState(false);

  const getUserFromForm = (userData: ISignIn) => {
    console.log(userData);
    setUser(userData);
    setIsUser(true);
  };

  const { data, isLoading, isError, error } = useSignInQuery(user, {
    skip: !isUser,
  });

  const navigate = useNavigate();

  if (data) {
    const { token } = data;
    console.log(token);
    navigate('/main');
  }

  return (
    <Box className="login-page__wrapper">
      {!isLoading && (
        <TextInputForm
          inputAttributes={[
            {
              name: 'login',
              label: 'Логин',
              rules: {
                required: 'Поле обязательно к заполнению',
              },
            },
            {
              name: 'password',
              label: 'Пароль',
              type: 'password',
              rules: {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 6,
                  message: 'Ваш пароль содержит не менее 6 символов',
                },
              },
            },
          ]}
          className="login-form"
          formData={{ name: '', login: '', password: '' }}
          submitBtnText="Войти"
          additionalText={{
            mainText: 'Еще нет аккаунта? ',
            linkText: 'Зарегистрироваться',
            linkHref: '/registration',
          }}
          getUserFromForm={getUserFromForm}
        />
      )}
      {isLoading && (
        <CircularProgress
          sx={{
            display: 'block',
          }}
        />
      )}
      {!isLoading && isError && (
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          Error code: {(error as FetchBaseQueryError).status}{' '}
          {((error as FetchBaseQueryError).data as IErrorResponse).message}
        </Box>
      )}
    </Box>
  );
}

export default LoginPage;
