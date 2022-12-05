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
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  return (
    <Box className="register-page__wrapper">
      {!isLoading && (
        <TextInputForm
          inputAttributes={[
            {
              name: 'name',
              label: t('RegisterPage.inputLabels.name'),
              rules: {
                required: t('RegisterPage.requiredMsg'),
              },
            },
            {
              name: 'login',
              label: t('RegisterPage.inputLabels.login'),
              rules: {
                required: t('RegisterPage.requiredMsg'),
              },
            },
            {
              name: 'password',
              label: t('RegisterPage.inputLabels.password'),
              type: 'password',
              rules: {
                required: t('RegisterPage.requiredMsg'),
                minLength: {
                  value: 6,
                  message: t('RegisterPage.passwordMsg'),
                },
              },
            },
          ]}
          className="register-form"
          formData={{ name: '', login: '', password: '' }}
          submitBtnText={t('RegisterPage.submitBtnText')}
          additionalText={{
            mainText: t('RegisterPage.additionalText.mainText'),
            linkText: t('RegisterPage.additionalText.linkText'),
            linkHref: '/login',
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
        <SnackBar
          open={true}
          message={`${(error as FetchBaseQueryError).status} error. ${
            ((error as FetchBaseQueryError).data as IErrorResponse).message
          }
          ${t('errorMessages.userExists')}`}
        />
      )}
    </Box>
  );
}

export default RegisterPage;
