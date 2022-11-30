/* eslint-disable react-hooks/exhaustive-deps */
import { useSignInMutation } from '../../api/AuthApi';
import { useState, useEffect } from 'react';
import { ISignIn } from '../../models/User';
import TextInputForm from '../../components/Forms';
import { IErrorResponse } from '../../models/ErrorResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { Box } from '@mui/material';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { userSlice } from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../store/hooks/redux';
import { extractUserIdFromToken } from '../../utils/authUtils';
import { useGetUserByIdMutation } from '../../api/UsersApi';
import SnackBar from '../../components/bars/SnackBar';

function LoginPage() {
  const navigate = useNavigate();
  const [signIn, { isError, error, data: tokenData }] = useSignInMutation();
  const [getUserById, { data: userData }] = useGetUserByIdMutation();
  const [user, setUser] = useState<ISignIn>({
    login: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const { changeIsLoggedIn, updateToken, updateUser } = userSlice.actions;
  const [userId, setUserId] = useState('');

  const getUserFromForm = async (userFormData: ISignIn) => {
    setUser(userFormData);
    await signIn(userFormData);
    await getUserById({ userId });
  };

  useEffect(() => {
    if (tokenData) {
      dispatch(changeIsLoggedIn(true));
      const { token } = tokenData;
      dispatch(updateToken(token));
      setUserId(extractUserIdFromToken(token));
    }
    if (userData) {
      dispatch(updateUser(userData));
      navigate('/main');
    }
  }, [tokenData, userData]);

  return (
    <Box className="login-page__wrapper">
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
                message: 'Ваш пароль должен содержать не менее 6 символов',
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
      {isError && (
        <SnackBar
          open={true}
          message={`${(error as FetchBaseQueryError).status} error. ${
            ((error as FetchBaseQueryError).data as IErrorResponse).message
          }
          Проверьте правильность написания логина и пароля`}
          buttonText={'закрыть'}
        />
      )}
    </Box>
  );
}

export default LoginPage;
