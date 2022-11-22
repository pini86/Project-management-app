import { useAppSelector } from '../../store/hooks/redux';
import { useAppDispatch } from '../../store/hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import { Box, Button, Typography } from '@mui/material';
import { ISignUp } from '../../models/User';
import TextInputForm from '../../components/Forms/TextInputForm';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './ProfilePage.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import { useDeleteUserByIdQuery, useUpdateUserByIdQuery } from '../../api/UsersApi';
import SnackBar from '../../components/bars/SnackBar';

function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canBeDeleted, setCanBeDeleted] = useState(false);
  const [canBeUpdated, setCanBeUpdated] = useState(false);
  const navigate = useNavigate();

  const [userToUpdate, setUserToUpdate] = useState<ISignUp>({
    login: '',
    password: '',
    name: '',
  });

  const getUserFromForm = (userData: ISignUp) => {
    setUserToUpdate(userData);
    setCanBeUpdated(true);
  };

  const getConfirm = (value: boolean) => {
    setCanBeDeleted(value);
  };

  const { user } = useAppSelector((state) => state.userReducer);

  const { resetUser, updateUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  const { data: deletedUser } = useDeleteUserByIdQuery(
    { userId: user ? user?._id : '' },
    {
      skip: !canBeDeleted,
    }
  );

  const { data: updatedUser } = useUpdateUserByIdQuery(
    { userId: user ? user?._id : '', data: userToUpdate },
    {
      skip: !canBeUpdated,
    }
  );

  useEffect(() => {
    if (deletedUser) {
      dispatch(resetUser());
      navigate('/');
    }
    if (updatedUser) {
      dispatch(updateUser(updatedUser));
    }
  }, [deletedUser, dispatch, navigate, resetUser, updateUser, updatedUser]);

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
              setIsOpen={setIsModalOpen}
              contentText="Вы действительно хотите удалить аккаунт?"
              notConfirmText="нет"
              confirmText="да"
              isConfirmed={getConfirm}
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
      {updatedUser && (
        <SnackBar open={true} message={'Данные успешно изменены'} buttonText={'закрыть'} />
      )}
    </Box>
  );
}

export default ProfilePage;
