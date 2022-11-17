import { useState, useEffect } from 'react';
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
import './BoardCard.css';
import {
  useGetBoardByIdQuery,
  useUpdateBoardByIdQuery,
  useDeleletBoardByIdQuery,
} from '../../api/BoardsApi';
import { IBoard } from '../../models/Board';
import { IErrorResponse } from '../../models/ErrorResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

// import TextInputForm

interface IProps {
  boardId: string;
}

const defaultBoard: IBoard = {
  id: 'Board id',
  description: 'Board description',
  title: 'Board title',
  owner: 'userId of owner',
  users: ['userId of invited user #1', 'userId of invited user #2'],
};

export default function BoardCard(props: IProps) {
  const { boardId } = props;
  const {
    data = defaultBoard,
    isError = false,
    error = undefined,
  } = useGetBoardByIdQuery({ boardId });

  if (isError || !data) {
    //throw new Error(
    console.log(
      'Error code: ' +
        (error as FetchBaseQueryError).status +
        '' +
        ((error as FetchBaseQueryError).data as IErrorResponse).message
    );
  }

  const [boardCard, setBoardCard] = useState(data as IBoard);
  const { title, description } = boardCard;

  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenModalDel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenDel(true);
  };

  const handleCloseModalDel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenDel(false);
  };

  const handleOpenModalEdit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenEdit(true);
  };

  const handleCancelEdit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenEdit(false);
  };

  const handleSaveEdit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenEdit(false);
    handleCancelEdit(event);
  };

  return (
    <Card
      className="board-card__wrapper"
      variant="elevation"
      onClick={() => {
        console.log('click on board');
      }}
    >
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
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="new_title"
              label="Название доски"
              type="text"
              fullWidth
              defaultValue={title}
            />
            <TextField
              autoFocus
              margin="dense"
              id="new_desc"
              label="Описание доски"
              type="text"
              fullWidth
              defaultValue={description}
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
            <Button onClick={handleCloseModalDel} color="primary">
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
