import { useAppSelector } from '../../store/hooks/redux';
import { useAppDispatch } from '../../store/hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import { Box, Button, Typography } from '@mui/material';
import { ISignUp } from '../../models/User';
import TextInputForm from '../../components/Forms/TextInputForm';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './ProfilePage.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import {
  useDeleteUserByIdMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} from '../../api/UsersApi';
import SnackBar from '../../components/bars/SnackBar';
import { IErrorResponse } from '../../models/ErrorResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { useTranslation } from 'react-i18next';
import { extractUserIdFromToken } from '../../utils/authUtils';

function ProfilePage() {
  const [deleteUserById] = useDeleteUserByIdMutation();
  const [updateUserById, { isSuccess, isError, error }] = useUpdateUserByIdMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.userReducer);
  const { resetUser } = userSlice.actions;
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (token) {
      setUserId(extractUserIdFromToken(token));
    }
  }, []);

  const { data: user } = useGetUserByIdQuery(
    {
      userId,
    },
    { skip: !userId }
  );
  const getUserFromForm = async (userData: ISignUp) => {
    await updateUserById({ userId, data: userData });
  };

  const onConfirmDelete = async () => {
    await deleteUserById({ userId });
    dispatch(resetUser());
    navigate('/');
  };

  const { t } = useTranslation();

  return (
    <Box className="profile-page__wrapper">
      <Typography variant="h4">{t('ProfilePage.heading')}</Typography>
      <Box className="editing-section">
        <Box className="editing-section__delete">
          <AccountBoxIcon className="delete__icon" />
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            {t('ProfilePage.btn-delete')}
          </Button>
          {isModalOpen && (
            <ConfirmationModal
              isOpen={isModalOpen}
              contentText={t('ProfilePage.delete-account-modal')}
              confirmText={t('buttonTexts.yes')}
              notConfirmText={t('buttonTexts.no')}
              onConfirm={onConfirmDelete}
              onCancel={() => setIsModalOpen(false)}
            />
          )}
        </Box>
        {user && (
          <TextInputForm
            inputAttributes={[
              {
                name: 'name',
                label: t('ProfilePage.inputLabels.name'),
                rules: {
                  required: t('ProfilePage.requiredMsg'),
                },
              },
              {
                name: 'login',
                label: t('ProfilePage.inputLabels.login'),
                rules: {
                  required: t('ProfilePage.requiredMsg'),
                },
              },
              {
                name: 'password',
                label: t('ProfilePage.inputLabels.password'),
                type: 'password',
                rules: {
                  required: t('ProfilePage.requiredMsg'),
                  minLength: {
                    value: 6,
                    message: t('ProfilePage.inputLabels.password'),
                  },
                },
              },
            ]}
            className="login-form edit-profile-form"
            formData={{
              name: user ? user!.name : '',
              login: user ? user!.login : '',
              password: '',
            }}
            submitBtnText={t('ProfilePage.submitBtnText')}
            getUserFromForm={getUserFromForm}
          />
        )}
      </Box>
      {isSuccess && <SnackBar open={true} message={t('SuccessMessages.updating')} />}
      {isError && (
        <SnackBar
          open={true}
          message={`${t('ErrorMessages.updating')}${
            ((error as FetchBaseQueryError).data as IErrorResponse).message
          }`}
        />
      )}
    </Box>
  );
}

export default ProfilePage;
