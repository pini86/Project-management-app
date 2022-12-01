/* eslint-disable react-hooks/exhaustive-deps */
import { useSignUpMutation } from 'api/AuthApi';
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
  const dispatch = useAppDispatch();
  const { changeIsLoggedIn, updateToken, updateUser } = userSlice.actions;
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();
  const [signIn] = useSignInMutation();

  const getUserFromForm = async (userData: ISignUp) => {
    const userSignUpData = await signUp(userData).unwrap();
    dispatch(updateUser(userSignUpData));

    const { token } = await signIn({ login: userData.login, password: userData.password }).unwrap();
    dispatch(updateToken(token));
    dispatch(changeIsLoggedIn(true));
    navigate('/main');
  };

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
