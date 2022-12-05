import { useState } from 'react';
import { IColumn } from 'models/Column';
import { INewTask, ITask } from 'models/Task';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../store/hooks/redux';
import {
  useDeleletColumnByIdMutation,
  useGetColumnsInBoardQuery,
  useUpdateColumnByIdMutation,
} from 'api/ColumnsApi';
import { useCreateTaskMutation, useGetTasksByBoardIdQuery } from 'api/TasksApi';
import { useGetAllUsersQuery } from 'api/UsersApi';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import BoardTask from 'components/BoardTask';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import './style.scss';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
//import type { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
  DroppableProvided,
} from '@hello-pangea/dnd';
import { Container } from '@mui/material';

type FormValues = {
  title: string;
  description: string;
};

interface HeaderProps {
  isDragging: boolean;
}

function BoardColumn(dataColumn: IColumn, index: number) {
  console.log('dataColumn=', dataColumn);
  const { boardId, order, tasks, title, _id } = { ...dataColumn };
  const [columnName, setColumnName] = useState(title);
  const [editColumnName, setEditColumnName] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const userId = useAppSelector((state) => state.userReducer.user?._id);
  const [deleteColumn] = useDeleletColumnByIdMutation();
  const [updateColumn] = useUpdateColumnByIdMutation();
  const [createTask] = useCreateTaskMutation();
  const userIds = useGetAllUsersQuery().data?.map((user) => user._id);
  const { refetch: refetchGetColumns } = useGetColumnsInBoardQuery({ boardId });
  const { refetch: refetchGetTasks } = useGetTasksByBoardIdQuery({ boardId });

  const onCreateTask = async (data: FormValues) => {
    const newTask: INewTask = {
      title: data.title,
      order: 1,
      description: data.description,
      userId,
      users: userIds!,
    };
    await createTask({ boardId, columnId: _id, data: newTask });
    refetchGetTasks();
    reset();
    setIsCreateTaskModalOpen(false);
  };

  const handleClickOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleClose = () => {
    setIsDeleteModalOpen(false);
  };

  const onDeleteColumn = async () => {
    await deleteColumn({ boardId, columnId: _id });
    refetchGetColumns();
    setIsDeleteModalOpen(false);
  };

  const ColumnTitleInput = (
    <form
      className="board-column__title-form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsEditing(false);
        editColumnName.length && setColumnName(editColumnName);
        updateColumn({ boardId, columnId: _id, data: { title: editColumnName, order } });
      }}
    >
      <input
        className="board-column__title-input"
        type="text"
        defaultValue={columnName}
        autoFocus={true}
        onChange={(e) => setEditColumnName(e.target.value)}
      />
      <Button className="board-column__title-confitm" type="submit">
        <CheckIcon />
      </Button>
      <Button className="board-column__title-cancel" onClick={() => setIsEditing(false)}>
        <ClearIcon />
      </Button>
    </form>
  );

  const ColumnTitleText = (
    <>
      <Stack className="column-title__inner-wrapper">
        <Typography className="board-column__title" variant="h6" noWrap>
          {columnName}
        </Typography>
        <EditIcon onClick={() => setIsEditing(true)} />
      </Stack>
      <DeleteForeverIcon className="board-column__delete" onClick={handleClickOpen} />
    </>
  );

  return (
    <>
      <Draggable draggableId={order.toString()} index={index}>
        {(provided, snapshot) => (
          <Box className="board-column" {...provided.draggableProps} ref={provided.innerRef}>
            <div {...provided.dragHandleProps}>
              <Stack className="board-column__title-wrapper">
                {isEditing ? ColumnTitleInput : ColumnTitleText}
              </Stack>
            </div>
            <Dialog
              open={isDeleteModalOpen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" color="error">
                {'Вы уверены, что хотите удалить колонку?'}
              </DialogTitle>
              <DialogActions>
                <Button variant="contained" color="error" onClick={onDeleteColumn}>
                  Да
                </Button>
                <Button color="error" onClick={handleClose}>
                  Нет
                </Button>
              </DialogActions>
            </Dialog>

            <Box className="task-list">
              {tasks.map((task: ITask) => (
                <BoardTask {...task} key={task._id} />
              ))}
            </Box>
            <Button
              className="btn-create_task"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsCreateTaskModalOpen(true)}
            >
              добавить задачу
            </Button>
            <Dialog open={isCreateTaskModalOpen} onClose={() => setIsCreateTaskModalOpen(false)}>
              <DialogTitle id="create-task">{'Добавить новую задачу '}</DialogTitle>
              <form onSubmit={handleSubmit(onCreateTask)}>
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
                  <Button onClick={() => setIsCreateTaskModalOpen(false)} color="primary" autoFocus>
                    Отмена
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </Box>
        )}
      </Draggable>
    </>
  );
}

export default BoardColumn;

{
  /* <Draggable draggableId={title} index={order}>
{(provided, snapshot) => (
  <Container ref={provided.innerRef} {...provided.draggableProps}>
    <Header isDragging={snapshot.isDragging}>
      <Title {...provided.dragHandleProps} aria-label={`${title} quote list`}>
        {title}
      </Title>
    </Header>
    <QuoteList
      listId={title}
      listType="QUOTE"
      style={{
        backgroundColor: snapshot.isDragging ? colors.G50 : undefined,
      }}
      quotes={quotes}
      internalScroll={true}
      isCombineEnabled={true}
      useClone={false}
    />
  </Container>
)}
</Draggable> */
}
