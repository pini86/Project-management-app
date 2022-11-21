import { useState, useEffect } from 'react';
import Grid, { GridSpacing } from '@mui/material/Grid';
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
import { IBoard } from '../../models/Board';
import { useAppDispatch } from '../../store/hooks/redux';
import { boardSlice } from '../../store/reducers/boardSlice';
import { useGetBoardsByUserIdQuery, useCreateBoardQuery } from '../../api/BoardsApi';
import './MainPage.scss';
import Store from '../../store/Store';
import { IUser } from 'models/User';
import { Box, CircularProgress } from '@mui/material';
import { extractUserIdFromToken } from '../../utils/authUtils';

function MainPage() {
  const dispatch = useAppDispatch();
  const { createBoard, resetBoards } = boardSlice.actions;

  const token = Store.getState().userReducer.token;
  const userId = extractUserIdFromToken(token as string);
  //const user = Store.getState().userReducer.user as IUser;

  const { data = [], isLoading } = useGetBoardsByUserIdQuery({ userId });
  const [listBoardCards, setListBoardCards] = useState<IBoard[]>();

  useEffect(() => {
    if (!isLoading && data.length !== listBoardCards?.length) {
      dispatch(resetBoards());

      data.forEach((board) => {
        dispatch(createBoard(board));
      });

      setListBoardCards(data);
      console.log(
        'all data',
        data,
        'all store',
        Store.getState().boardReduser.boards,
        'listBoardCards',
        listBoardCards
      );
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      //window.location.reload();
    }
  }, [data.length !== Store.getState().boardReduser.boards.length]);

  const [newBoardCard, setNewBoardCard] = useState<IBoard>({
    _id: userId,
    description: '',
    title: '',
    owner: userId,
    users: [],
  });

  const [openEdit, setOpenEdit] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false);
  const defaultValuesEditForm = { title: '', description: '' };
  const [formValues, setFormValues] = useState(defaultValuesEditForm);

  const handleCancelEdit = (event: React.SyntheticEvent) => {
    setFormValues(defaultValuesEditForm);
    event.preventDefault();
    event.stopPropagation();
    setOpenEdit(false);
  };

  const handleSaveEdit = (event: React.SyntheticEvent) => {
    setNewBoardCard({
      ...newBoardCard,
      title: formValues.title,
      description: formValues.description,
    });
    event.preventDefault();
    event.stopPropagation();
    setSaveEdit(true);
    setOpenEdit(false);
  };

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (saveEdit) {
      dispatch(createBoard(newBoardCard));
      setSaveEdit(false);
      //window.location.reload();
    }
  }, [saveEdit]);

  const createQuery = useCreateBoardQuery(
    {
      data: {
        title: JSON.stringify({ title: newBoardCard.title, description: newBoardCard.description }),
        owner: newBoardCard.owner,
        users: [],
      },
    },
    {
      skip: !saveEdit,
    }
  );

  console.log('createQuery.isSuccess', createQuery.isSuccess, createQuery.data);
  useEffect(() => {
    console.log(createQuery.isSuccess);
    if (createQuery.isSuccess) {
      //window.location.reload();
    }
  }, [createQuery.isSuccess]);

  const handleOpenModalEdit = () => {
    setOpenEdit(true);
  };

  return (
    <div className="boards__wrapper">
      <Typography variant="h2" component="h2">
        Доски :
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
              {listBoardCards
                ? listBoardCards.map((board) => (
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
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="new_title"
                      label="Название доски"
                      type="text"
                      fullWidth
                      defaultValue={formValues.title}
                      onChange={handleInputChange}
                      name="title"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="new_desc"
                      label="Описание доски"
                      type="text"
                      fullWidth
                      defaultValue={formValues.description}
                      name="description"
                      onChange={handleInputChange}
                    />
                  </DialogContent>
                  <DialogActions sx={{ justifyContent: 'space-between' }}>
                    <Button onClick={handleSaveEdit} color="primary">
                      Сохранить
                    </Button>
                    <Button onClick={handleCancelEdit} color="primary" autoFocus>
                      Отмена
                    </Button>
                  </DialogActions>
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
