import { useState } from 'react';
import { ITask, IUpdateTask } from 'models/Task';
import {
  useDeleletTaskByIdMutation,
  useGetTasksInColumnQuery,
  useUpdateTaskByIdMutation,
} from 'api/TasksApi';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './style.scss';

function BoardTask({ boardId, columnId, _id, title, userId, users }: ITask) {
  type FormValues = {
    title: string;
    description: string;
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [updateTask] = useUpdateTaskByIdMutation();
  const [deleteTask] = useDeleletTaskByIdMutation();

  const handleClickOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleClose = () => {
    setIsDeleteModalOpen(false);
  };

  const { refetch: refetchGetTasks } = useGetTasksInColumnQuery({
    boardId,
    columnId: _id,
  });

  const onDeleteTask = async () => {
    await deleteTask({ boardId, columnId, taskId: _id });
    refetchGetTasks();
    setIsDeleteModalOpen(false);
  };

  const onUpdateTask = async (data: FormValues) => {
    const newTask: IUpdateTask = {
      title: data.title,
      order: 1,
      description: data.description,
      userId,
      users,
      columnId,
    };
    await updateTask({ boardId, columnId, taskId: _id, data: newTask });
    refetchGetTasks();
    reset();
    setIsEditModalOpen(false);
  };

  return (
    <Box>
      <Card className="task-list__item">
        <Box>{title}</Box>
        <Stack>
          <DeleteForeverIcon className="task-delete" onClick={handleClickOpen} />
          <MoreVertIcon className="task-modify" onClick={() => setIsEditModalOpen(true)} />
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
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle id="update-task">{'Редактировать задачу '}</DialogTitle>
        <form onSubmit={handleSubmit(onUpdateTask)}>
          <DialogContent>
            <TextField
              margin="dense"
              id="new_title"
              label="Название задачи"
              type="text"
              fullWidth
              {...register('title', { required: true })}
            />
            {errors.title && (
              <Typography variant="caption" color="error">
                * Обязательное поле
              </Typography>
            )}
            <TextField
              margin="dense"
              id="new_description"
              label="Описание (необязательно)"
              type="text"
              defaultValue=" "
              fullWidth
              {...register('description')}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained">
              Сохранить
            </Button>
            <Button onClick={() => setIsEditModalOpen(false)} color="primary" autoFocus>
              Отмена
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default BoardTask;
