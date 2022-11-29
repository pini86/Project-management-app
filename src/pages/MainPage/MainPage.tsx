import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import BoardCard from 'components/boardCard/BoardCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { INewBoard } from 'models/Board';
import {
  useGetBoardsByUserIdQuery,
  useCreateBoardMutation,
  useGetAllBoardsQuery,
} from '../../api/BoardsApi';
import './MainPage.scss';
import Store from '../../store/Store';
import { Box, CircularProgress } from '@mui/material';
import { extractUserIdFromToken } from '../../utils/authUtils';
import { Controller, useForm } from 'react-hook-form';

type FormValues = {
  title: string;
  description: string;
};

function MainPage() {
  const { control, handleSubmit, reset } = useForm<FormValues>();
  const [createBoard] = useCreateBoardMutation();
  const token = Store.getState().userReducer.token;
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
      <Typography variant="h2" component="h2">
        Доски :
      </Typography>
      {isBoardsLoading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
              {boards
                ? boards.map((board) => (
                    <Grid key={board._id} item>
                      <BoardCard board={board} />
                    </Grid>
                  ))
                : null}

              <Card
                className="new-board-card__wrapper"
                variant="elevation"
                onClick={handleOpenModalEdit}
                aria-label="edit"
                key={'new-board'}
              >
                <CardContent>
                  <Typography variant="h4" component="div">
                    +
                  </Typography>
                  <Typography variant="h4" component="div">
                    ДОБАВИТЬ
                  </Typography>
                  <Typography variant="h4" component="div">
                    ДОСКУ
                  </Typography>
                </CardContent>
                <Dialog open={openEdit} onClose={handleCancelEdit}>
                  <DialogTitle id="edit-dialog-title">{'Добавить новую доску '}</DialogTitle>
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
                            label="Название доски"
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
                            label="Описание доски"
                            type="text"
                            fullWidth
                            {...field}
                          />
                        )}
                      />
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'space-between' }}>
                      <Button type="submit" color="primary">
                        Сохранить
                      </Button>
                      <Button onClick={handleCancelEdit} color="primary" autoFocus>
                        Отмена
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default MainPage;
