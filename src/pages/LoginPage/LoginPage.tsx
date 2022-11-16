/* eslint-disable react-hooks/exhaustive-deps */
import { useSignInQuery } from '../../api/AuthApi';
import { useState, useEffect } from 'react';
import { ISignIn } from '../../models/User';
import TextInputForm from '../../components/Forms';
import { IErrorResponse } from '../../models/ErrorResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { Box, CircularProgress } from '@mui/material';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { userSlice } from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../store/hooks/redux';

function LoginPage() {
  const [user, setUser] = useState({
    login: '',
    password: '',
  });

  const getUserFromForm = (userData: ISignIn) => {
    setUser(userData);
  };

  const { data, isLoading, isError, error } = useSignInQuery(user, {
    skip: !user.login,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { changeIsLoggedIn } = userSlice.actions;

  useEffect(() => {
    if (data) {
      dispatch(changeIsLoggedIn(true));
      navigate('/main');
    }
  }, [data]);

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
