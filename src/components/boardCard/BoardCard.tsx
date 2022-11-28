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
import './BoardCard.scss';
import { useUpdateBoardByIdQuery, useDeleletBoardByIdQuery } from '../../api/BoardsApi';
import { IBoard } from '../../models/Board';
import { useAppDispatch } from '../../store/hooks/redux';
import { boardSlice } from '../../store/reducers/boardSlice';

interface IProps {
  board: IBoard;
}

export default function BoardCard(props: IProps) {
  const { board } = props;
  const { title, description = '' } = board;
  const dispatch = useAppDispatch();
  const { updateBoard, deleteBoard } = boardSlice.actions;

  const [boardCard, setBoardCard] = useState<IBoard>(board);

  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false);
  const defaultValuesEditForm = { title, description };
  const [formValues, setFormValues] = useState(defaultValuesEditForm);

  const handleOpenBoard = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('click on board - call board view'); //place here handler for open board !!!
  };

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

  const handleModalDelConfirm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setConfirmDel(true);
    setOpenDel(false);
  };

  const handleOpenModalEdit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenEdit(true);
  };

  const handleCancelEdit = (event: React.SyntheticEvent) => {
    setFormValues(defaultValuesEditForm);
    event.preventDefault();
    event.stopPropagation();
    setOpenEdit(false);
  };

  const handleSaveEdit = (event: React.SyntheticEvent) => {
    setBoardCard({ ...boardCard, title: formValues.title, description: formValues.description });
    event.preventDefault();
    event.stopPropagation();
    setSaveEdit(true);
    setOpenEdit(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const updateQuery = useUpdateBoardByIdQuery(
    {
      boardId: boardCard._id,
      data: {
        owner: boardCard.owner,
        description: boardCard.description,
        title: boardCard.title,
        users: boardCard.users,
      },
    },
    {
      skip: !saveEdit,
    }
  );

  const delQuery = useDeleletBoardByIdQuery(
    { boardId: boardCard._id },
    {
      skip: !confirmDel,
    }
  );

  useEffect(() => {
    if (saveEdit) {
      dispatch(updateBoard(boardCard as IBoard));
    }
  }, [saveEdit]);

  useEffect(() => {
    if (confirmDel) {
      dispatch(deleteBoard(boardCard));
    }
  }, [confirmDel]);

  useEffect(() => {
    if (delQuery.isSuccess) {
      window.location.reload();
    }
  }, [delQuery.isSuccess]);

  useEffect(() => {
    if (updateQuery.isSuccess) {
      window.location.reload();
    }
  }, [updateQuery.isSuccess]);

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
          <DialogContent>
            <TextField
              autoFocus
              required
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
