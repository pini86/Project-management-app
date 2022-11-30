/* eslint-disable react-hooks/exhaustive-deps */
import { useSignUpMutation } from 'api/AuthApi';
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
import { useSignInMutation } from '../../api/AuthApi';
import SnackBar from '../../components/bars/SnackBar';

function RegisterPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<ISignUp>({
    name: '',
    login: '',
    password: '',
  });
  const [userId, setUserId] = useState('');
  const [signUp, { data: userSignUpData, isLoading, isError, error }] = useSignUpMutation();
  const dispatch = useAppDispatch();
  const { changeIsLoggedIn, updateToken, updateUser } = userSlice.actions;
  const [signIn, { data: tokenData }] = useSignInMutation();

  const getUserFromForm = async (userData: ISignUp) => {
    setUser(userData);
    await signUp(userData);
  };

  useEffect(() => {
    if (userSignUpData) {
      setUserId(userSignUpData._id);
      dispatch(updateUser(userSignUpData));
      signIn({ login: user.login, password: user.password });
    }
    if (tokenData) {
      const { token } = tokenData;
      dispatch(updateToken(token));
      dispatch(changeIsLoggedIn(true));
      navigate('/main');
    }
  }, [userSignUpData, tokenData]);

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
        <SnackBar
          open={true}
          message={`${(error as FetchBaseQueryError).status} error. ${
            ((error as FetchBaseQueryError).data as IErrorResponse).message
          }
          Пользователь с данным логином уже существует`}
          buttonText={'закрыть'}
        />
      )}
    </Box>
  );
}

export default RegisterPage;
