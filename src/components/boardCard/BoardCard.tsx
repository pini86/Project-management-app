import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import './BoardCard.scss';
import {
  useUpdateBoardByIdMutation,
  useDeleletBoardByIdMutation,
  useGetAllBoardsQuery,
} from '../../api/BoardsApi';
import { IBoard, INewBoard } from '../../models/Board';
import { Controller, useForm } from 'react-hook-form';

interface IProps {
  board: IBoard;
}

type FormValues = {
  title: string;
  description: string;
};

export default function BoardCard(props: IProps) {
  const { board } = props;
  const { title, description = '' } = board;
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { refetch: refetchGetBoards } = useGetAllBoardsQuery();
  const [deleteBoardById] = useDeleletBoardByIdMutation();
  const { control, handleSubmit, reset } = useForm<FormValues>();
  const [updateBoardById] = useUpdateBoardByIdMutation();

  const handleOpenBoard = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    if (!openDel && !openEdit) {
      console.log('click on board - call board view'); //place here handler for open board !!!
    }
  };

  const handleOpenModalDel = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setOpenDel(true);
  };

  const handleCloseModalDel = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setOpenDel(false);
  };

  const handleModalDelConfirm = async (event: React.SyntheticEvent) => {
    handleCloseModalDel(event);
    await deleteBoardById({ boardId: board._id });
    refetchGetBoards();
  };

  const onSubmitEdit = async (data: FormValues) => {
    const newBoard: INewBoard = {
      owner: board.owner,
      description: data.description,
      title: data.title,
      users: board.users,
    };

    await updateBoardById({ boardId: board._id, data: newBoard });
    refetchGetBoards();
    setOpenEdit(false);
  };

  const handleOpenModalEdit = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setOpenEdit(true);
  };

  const handleCancelEdit = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    reset({ ...board });
    setOpenEdit(false);
  };

  return (
    <Card className="board-card__wrapper" variant="elevation" onClick={handleOpenBoard}>
      <CardContent>
        <Typography variant="h4" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Tooltip title="Редактировать доску">
          <IconButton aria-label="edit" onClick={handleOpenModalEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={openEdit}
          onClose={handleCancelEdit}
          aria-labelledby="edit-dialog-title"
          aria-describedby="edit-dialog-description"
        >
          <DialogTitle id="edit-dialog-title">{'Редактировать доску '}</DialogTitle>
          <form onSubmit={handleSubmit(onSubmitEdit)}>
            <DialogContent>
              <Controller
                name="title"
                control={control}
                defaultValue={title}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="edit_title"
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
                defaultValue={description}
                render={({ field }) => (
                  <TextField
                    margin="dense"
                    id="edit_desc"
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
        <Tooltip title="Удалить доску">
          <IconButton aria-label="delete" onClick={handleOpenModalDel}>
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={openDel}
          onClose={handleCloseModalDel}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">{'Удалить доску ?'}</DialogTitle>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button onClick={handleModalDelConfirm} color="primary">
              Да
            </Button>
            <Button onClick={handleCloseModalDel} color="primary" autoFocus>
              Нет
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
