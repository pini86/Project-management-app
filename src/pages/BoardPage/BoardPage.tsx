import { useState } from 'react';
import { IColumn, INewColumn } from 'models/Column';
import { ITask } from 'models/Task';
import { useGetBoardByIdQuery } from 'api/BoardsApi';
import { useCreateColumnMutation, useGetColumnsInBoardQuery } from 'api/ColumnsApi';
import { useGetTasksByBoardIdQuery } from 'api/TasksApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import AddIcon from '@mui/icons-material/Add';
import BoardColumn from 'components/BoardColumn';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import './style.scss';
import { useTranslation } from 'react-i18next';

type FormValues = {
  title: string;
};

function BoardPage() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const boardTitle = useGetBoardByIdQuery({ boardId: boardId! }).data?.title;
  const [createColumn] = useCreateColumnMutation();
  const { data: tasksInBoard } = useGetTasksByBoardIdQuery({ boardId: boardId! });
  const {
    data: columns,
    refetch: refetchGetColumns,
    isLoading: isColumnLoading,
  } = useGetColumnsInBoardQuery({ boardId: boardId! });

  const onSubmit = async (data: FormValues) => {
    const newColumn: INewColumn = {
      title: data.title,
      order: 1,
    };
    await createColumn({ boardId: boardId!, data: newColumn });
    refetchGetColumns();
    reset();
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={3}>
        <Button variant="contained" startIcon={<ArrowLeftIcon />} onClick={() => navigate(-1)}>
          {t('BoardPage.btn-back')}
        </Button>
        <Typography className="board-title" variant="h4">
          {boardTitle}
        </Typography>
      </Stack>
      <Stack className="columns-wrapper" direction="row" spacing={3}>
        {isColumnLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          columns &&
          tasksInBoard &&
          columns.map((column: IColumn) => (
            <BoardColumn
              {...column}
              tasks={tasksInBoard!.filter((task: ITask) => task.columnId === column._id)}
              key={column._id}
            />
          ))
        )}
        <Button
          className="btn-create-column"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          {t('BoardPage.column-add')}
        </Button>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogTitle id="create-column">{t('BoardPage.column-add')}</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent className="column-dialog">
              <TextField
                autoFocus
                margin="dense"
                id="new_title"
                label={t('BoardPage.column-title')}
                type="text"
                fullWidth
                {...register('title', { required: true })}
              />
              {errors.title && (
                <Typography variant="caption" color="error">
                  {t('ProfilePage.requiredMsg')}formState
                </Typography>
              )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between' }}>
              <Button type="submit" variant="contained">
                {t('buttonTexts.save')}
              </Button>
              <Button onClick={() => setIsModalOpen(false)} color="primary" autoFocus>
                {t('buttonTexts.cancel')}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Stack>
    </Container>
  );
}

export default BoardPage;
