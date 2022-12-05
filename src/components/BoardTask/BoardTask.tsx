import { useState } from 'react';
import { ITask, IUpdateTask } from 'models/Task';
import {
  useDeleletTaskByIdMutation,
  useGetTasksByBoardIdQuery,
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
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import './style.scss';
import { useTranslation } from 'react-i18next';

type FormValues = {
  title: string;
  description: string;
};

function BoardTask({ boardId, columnId, _id, title, description, userId, users }: ITask) {
  const { t } = useTranslation();
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
  const { refetch: refetchGetTasks } = useGetTasksByBoardIdQuery({ boardId });

  const handleClickOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const onCloseEdit = () => {
    reset({ title, description });
    setIsEditModalOpen(false);
  };

  const onConfirmDelete = async () => {
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
      {isDeleteModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          contentText={t('BoardTask.delete-task-modal')}
          notConfirmText={t('buttonTexts.no')}
          confirmText={t('buttonTexts.yes')}
          onConfirm={onConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
      <Dialog
        open={isEditModalOpen}
        onClose={onCloseEdit}
        aria-labelledby="edit-task-title"
        aria-describedby="edit-task-description"
      >
        <DialogTitle id="edit-task-title">{t('BoardTask.btn-edit-task')}</DialogTitle>
        <form onSubmit={handleSubmit(onUpdateTask)}>
          <DialogContent>
            <TextField
              defaultValue={title}
              margin="dense"
              id="new_title"
              label={t('BoardTask.task-title')}
              type="text"
              fullWidth
              {...register('title', { required: true })}
            />
            {errors.title && (
              <Typography variant="caption" color="error">
                {t('ProfilePage.requiredMsg')}
              </Typography>
            )}
            <TextField
              defaultValue={description}
              margin="dense"
              id="new_description"
              label={t('BoardTask.description-optional')}
              type="text"
              fullWidth
              {...register('description')}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained">
              {t('buttonTexts.save')}
            </Button>
            <Button onClick={onCloseEdit} color="primary" autoFocus>
              {t('buttonTexts.cancel')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default BoardTask;
