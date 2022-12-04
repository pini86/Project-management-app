import { useAppSelector } from '../../store/hooks/redux';
import { useAppDispatch } from '../../store/hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import { Box, Button, Typography } from '@mui/material';
import { ISignUp } from '../../models/User';
import TextInputForm from '../../components/Forms/TextInputForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './ProfilePage.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import { useDeleteUserByIdMutation, useUpdateUserByIdMutation } from '../../api/UsersApi';
import SnackBar from '../../components/bars/SnackBar';
import { IErrorResponse } from '../../models/ErrorResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

function ProfilePage() {
  const [deleteUserById] = useDeleteUserByIdMutation();
  const [updateUserById, { isSuccess, isError, error }] = useUpdateUserByIdMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userReducer);
  const { resetUser, updateUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  const getUserFromForm = async (userData: ISignUp) => {
    const data = await updateUserById({
      userId: user ? user?._id : '',
      data: userData,
    }).unwrap();
    dispatch(updateUser(data!));
  };

  const onConfirmDelete = async () => {
    await deleteUserById({ userId: user ? user?._id : '' }).unwrap();
    dispatch(resetUser());
    navigate('/');
  };

  return (
    <Box className="profile-page__wrapper">
      <Typography variant="h4">Редактирование профиля</Typography>
      <Box className="editing-section">
        <Box className="editing-section__delete">
          <AccountBoxIcon className="delete__icon" />
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            Удалить мой аккаунт
          </Button>
          {isModalOpen && (
            <ConfirmationModal
              isOpen={isModalOpen}
              contentText="Вы действительно хотите удалить аккаунт?"
              confirmText="да"
              notConfirmText="нет"
              onConfirm={onConfirmDelete}
              onCancel={() => setIsModalOpen(false)}
            />
          )}
        </Box>
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
          className="login-form edit-profile-form"
          formData={{ name: user?.name || '', login: user?.login || '', password: '' }}
          submitBtnText="Сохранить изменения"
          getUserFromForm={getUserFromForm}
        />
      </Box>
      {isSuccess && (
        <SnackBar
          open={true}
          message={'Данные успешно изменены. Войдите с новыми данными.'}
          buttonText={'закрыть'}
        />
      )}
      {isError && (
        <SnackBar
          open={true}
          message={`Данные не удалось изменить. Ошибка: ${
            ((error as FetchBaseQueryError).data as IErrorResponse).message
          }`}
          buttonText={'закрыть'}
        />
      )}
    </Box>
  );
}

export default ProfilePage;
