import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import BoardCard from 'components/boardCard/BoardCard';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { INewBoard } from 'models/Board';
import { useCreateBoardMutation, useGetAllBoardsQuery } from '../../api/BoardsApi';
import './MainPage.scss';
import { store } from '../../store/Store';
import { Box, CircularProgress } from '@mui/material';
import { extractUserIdFromToken } from '../../utils/authUtils';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/system/Stack';
import AddIcon from '@mui/icons-material/Add';

type FormValues = {
  title: string;
  description: string;
};

function MainPage() {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<FormValues>();
  const [createBoard] = useCreateBoardMutation();
  const token = store.getState().userReducer.token;
  const userId = extractUserIdFromToken(token!);

  const {
    data: boards,
    refetch: refetchGetBoards,
    isLoading: isBoardsLoading,
  } = useGetAllBoardsQuery();

  const [openEdit, setOpenEdit] = useState(false);
  const defaultValuesEditForm = { title: '', description: '' };

  const handleCancelEdit = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    reset(defaultValuesEditForm);
    setOpenEdit(false);
  };

  const onSubmit = async (data: FormValues) => {
    const newBoard: INewBoard = {
      title: data.title,
      description: data.description,
      owner: userId,
      users: [],
    };

    await createBoard({ data: newBoard });
    refetchGetBoards();
    reset(defaultValuesEditForm);
    setOpenEdit(false);
  };

  const handleOpenModalEdit = () => {
    setOpenEdit(true);
  };

  return (
    <div className="boards__wrapper">
      <Stack className="main-page__header">
        <Typography variant="h3" component="h1">
          {t('MainPage.main-heading')}
        </Typography>
        <Button
          className="add-board"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModalEdit}
        >
          {t('MainPage.add')}
        </Button>
      </Stack>
      {isBoardsLoading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid
              className="board-list__container"
              container
              spacing={2}
              sx={{ justifyContent: 'center' }}
            >
              {boards
                ? boards.map((board) => (
                    <Grid key={board._id} item>
                      <BoardCard board={board} />
                    </Grid>
                  ))
                : null}
              <Dialog open={openEdit} onClose={handleCancelEdit}>
                <DialogTitle id="edit-dialog-title">{t('MainPage.title-add-board')}</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogContent>
                    <Controller
                      name="title"
                      control={control}
                      defaultValue={defaultValuesEditForm.title}
                      render={({ field }) => (
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="new_title"
                          label={t('MainPage.board-title')}
                          type="text"
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="description"
                      control={control}
                      defaultValue={defaultValuesEditForm.description}
                      render={({ field }) => (
                        <TextField
                          margin="dense"
                          id="new_desc"
                          label={t('MainPage.board-description')}
                          type="text"
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </DialogContent>
                  <DialogActions sx={{ justifyContent: 'space-between' }}>
                    <Button type="submit" color="primary">
                      {t('buttonTexts.save')}
                    </Button>
                    <Button onClick={handleCancelEdit} color="primary" autoFocus>
                      {t('buttonTexts.cancel')}
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
export default MainPage;
