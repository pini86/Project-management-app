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
import { useGetUserByIdQuery } from '../../api/UsersApi';
import SnackBar from '../../components/bars/SnackBar';
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const navigate = useNavigate();
  const [signIn, { isError, error }] = useSignInMutation();
  const dispatch = useAppDispatch();
  const { changeIsLoggedIn, updateToken, updateUser } = userSlice.actions;
  const [userId, setUserId] = useState('');

  const { data: userData } = useGetUserByIdQuery(
    { userId },
    {
      skip: !userId,
    }
  );

  const getUserFromForm = async (userFormData: ISignIn) => {
    const { token } = await signIn(userFormData).unwrap();

    dispatch(changeIsLoggedIn(true));
    dispatch(updateToken(token));
    setUserId(extractUserIdFromToken(token));
  };

  useEffect(() => {
    if (userData) {
      dispatch(updateUser(userData));
      navigate('/main');
    }
  }, [userData]);

  const { t } = useTranslation();

  return (
    <Box className="login-page__wrapper">
      <TextInputForm
        inputAttributes={[
          {
            name: 'login',
            label: t('LoginPage.inputLabels.login'),
            rules: {
              required: t('LoginPage.requiredMsg'),
            },
          },
          {
            name: 'password',
            label: t('LoginPage.inputLabels.password'),
            type: 'password',
            rules: {
              required: t('LoginPage.requiredMsg'),
              minLength: {
                value: 6,
                message: t('LoginPage.passwordMsg'),
              },
            },
          },
        ]}
        className="login-form"
        formData={{ name: '', login: '', password: '' }}
        submitBtnText={t('LoginPage.submitBtnText')}
        additionalText={{
          mainText: t('LoginPage.additionalText.mainText'),
          linkText: t('LoginPage.additionalText.linkText'),
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
          ${t('errorMessages.badRequest')}`}
        />
      )}
    </Box>
  );
}

export default LoginPage;
