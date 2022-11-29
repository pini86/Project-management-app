import { useState } from 'react';
import { ITaskRefetch } from 'models/Task';
import { useDeleletTaskByIdMutation } from 'api/TasksApi';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './style.scss';

function BoardTask({ boardId, columnId, _id, title, refetch }: ITaskRefetch) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTask] = useDeleletTaskByIdMutation();

  const handleClickOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleClose = () => {
    setIsDeleteModalOpen(false);
  };

  const onDeleteTask = () => {
    deleteTask({ boardId, columnId, taskId: _id });
    refetch();
    setIsDeleteModalOpen(false);
  };

  return (
    <Box>
      <Card className="task-list__item">
        <Box>{title}</Box>
        <Stack>
          <DeleteForeverIcon className="task-delete" onClick={handleClickOpen} />
          <MoreVertIcon className="task-modify" />
        </Stack>
      </Card>
      <Dialog
        open={isDeleteModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="error">
          {'Вы уверены, что хотите удалить задачу?'}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" color="error" onClick={onDeleteTask}>
            Да
          </Button>
          <Button color="error" onClick={handleClose}>
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BoardTask;
