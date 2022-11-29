import { useState } from 'react';
import { IColumn, INewColumn } from 'models/Column';
import { useCreateColumnMutation, useGetColumnsInBoardQuery } from 'api/ColumnsApi';
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

const _id = '637e8371d20efa80401cecd4'; // dev only

function BoardPage() {
  type FormValues = {
    title: string;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [createColumn] = useCreateColumnMutation();

  const onSubmit = (data: FormValues) => {
    const newColumn: INewColumn = {
      title: data.title,
      order: 1,
    };
    createColumn({ boardId: _id, data: newColumn });
    refetchGetColumns();
    reset();
    setIsModalOpen(false);
  };
  const {
    data: columns,
    refetch: refetchGetColumns,
    isLoading: isColumnLoading,
  } = useGetColumnsInBoardQuery({ boardId: _id });

  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={3}>
        <Button variant="contained" startIcon={<ArrowLeftIcon />} onClick={() => navigate(-1)}>
          назад
        </Button>
        <Typography className="board-title" variant="h4">
          Название борда
        </Typography>
      </Stack>
      <Stack className="columns-wrapper" direction="row" spacing={3}>
        {isColumnLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          (columns || []).map((column: IColumn) => (
            <BoardColumn {...column} refetch={refetchGetColumns} key={column._id} />
          ))
        )}
        <Button
          className="btn-create-column"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          добавить колонку
        </Button>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogTitle id="create-column">{'Добавить новую колонку '}</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent className="column-dialog">
              <TextField
                autoFocus
                margin="dense"
                id="new_title"
                label="Название колонки"
                type="text"
                fullWidth
                {...register('title', { required: true })}
              />
              {errors.title && (
                <Typography variant="caption" color="error">
                  * Обязательное поле
                </Typography>
              )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between' }}>
              <Button type="submit" variant="contained">
                Сохранить
              </Button>
              <Button onClick={() => setIsModalOpen(false)} color="primary" autoFocus>
                Отмена
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Stack>
    </Container>
  );
}

export default BoardPage;
