import { useSignUpQuery } from 'api/AuthApi';
import { useState } from 'react';
import TextInputForm from '../../components/Forms';
import { ISignUp } from '../../models/User';
import { IErrorResponse } from '../../models/ErrorResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { Box, CircularProgress } from '@mui/material';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [user, setUser] = useState<ISignUp>({
    name: '',
    login: '',
    password: '',
  });

  const [isUser, setIsUser] = useState(false);

  const getUserFromForm = (userData: ISignUp) => {
    console.log(userData);
    setUser(userData);
    setIsUser(true);
  };

  const { data, isLoading, isError, error } = useSignUpQuery(user, {
    skip: !isUser,
  });

  const navigate = useNavigate();

  if (data) {
    const { _id, name, login } = data;
    console.log(_id, name, login);
    navigate('/main');
  }

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
