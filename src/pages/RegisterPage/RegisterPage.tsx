/* eslint-disable react-hooks/exhaustive-deps */
import { useSignUpQuery } from 'api/AuthApi';
import { useState, useEffect } from 'react';
import TextInputForm from '../../components/Forms';
import { ISignUp } from '../../models/User';
import { IErrorResponse } from '../../models/ErrorResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { Box, CircularProgress } from '@mui/material';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import { userSlice } from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../store/hooks/redux';
import { useGetUserByIdQuery } from '../../api/UsersApi';
import { useSignInQuery } from '../../api/AuthApi';

function RegisterPage() {
  const [user, setUser] = useState<ISignUp>({
    name: '',
    login: '',
    password: '',
  });

  const [userId, setUserId] = useState('');

  const getUserFromForm = (userData: ISignUp) => {
    setUser(userData);
  };

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useSignUpQuery(user, {
    skip: !user.login,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { changeIsLoggedIn, updateToken, updateUser } = userSlice.actions;

  const { data: tokenData } = useSignInQuery(
    { login: user.login, password: user.password },
    {
      skip: !userId,
    }
  );

  useEffect(() => {
    if (userData) {
      setUserId(userData._id);
      dispatch(updateUser(userData));
    }
    if (tokenData) {
      const { token } = tokenData;
      dispatch(updateToken(token));
      dispatch(changeIsLoggedIn(true));
      navigate('/main');
    }
  }, [userData, tokenData]);

  return (
    <Box className="register-page__wrapper">
      {!isLoading && (
        <TextInputForm
          inputAttributes={[
            {
              name: 'name',
              label: 'Ваше имя',
              rules: {
                required: 'Поле обязательно к заполнению',
              },
            },
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
                  message: 'Ваш пароль должен содержать не менее 6 символов',
                },
              },
            },
          ]}
          className="register-form"
          formData={{ name: '', login: '', password: '' }}
          submitBtnText="Зарегистрироваться"
          additionalText={{ mainText: 'Уже есть аккаунт? ', linkText: 'Войти', linkHref: '/login' }}
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

export default RegisterPage;
