import { useEffect, useState } from 'react';
import { IColumn, INewColumn } from 'models/Column';
import { ITask } from 'models/Task';
import {
  useCreateColumnMutation,
  useGetColumnsInBoardQuery,
  useUpdateColumnByIdMutation,
} from 'api/ColumnsApi';
import { useGetTasksByBoardIdQuery } from 'api/TasksApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Page404 from 'pages/Page404';
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
import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
  DroppableProvided,
} from '@hello-pangea/dnd';
import reorder, { reorderQuoteMap } from './reorder';

type FormValues = {
  title: string;
};

interface QuoteMap {
  [key: string]: ITask[];
}

function BoardPage() {
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
  const { data: tasksInBoard, isSuccess: isSuccessTasks } = useGetTasksByBoardIdQuery({
    boardId: boardId!,
  });
  const {
    data: columns,
    refetch: refetchGetColumns,
    isLoading: isColumnLoading,
    isSuccess: isSuccessColumn,
  } = useGetColumnsInBoardQuery({ boardId: boardId! });

  const [columnsDnD, setColumnsDnD] = useState({} as QuoteMap);
  const [updateColumnById] = useUpdateColumnByIdMutation();

  const changeOrder = async () => {
    if (columns) {
      for (let i = 0; i < columns.length; i++) {
        const newData: INewColumn = { title: columns[i]['title'], order: i };
        await updateColumnById({
          boardId: boardId!,
          columnId: columns![i]['_id'],
          data: newData,
        }).unwrap();
      }
    }
  };
  useEffect(() => {
    const setOrder = new Set();
    if (isSuccessTasks && isSuccessColumn && columns && tasksInBoard) {
      columns.forEach((col) => {
        setOrder.add(col['order']);
      });

      if (setOrder.size === columns.length) {
        let setCol = {} as QuoteMap;
        for (let i = 0; i < columns.length; i++) {
          const tasks = tasksInBoard!.filter((task: ITask) => task.columnId === columns[i]._id);
          setCol = { ...setCol, [i.toString()]: tasks };
        }
        setColumnsDnD(setCol);
      } else {
        changeOrder();
      }
    }
  }, [isSuccessColumn, isSuccessTasks]);

  const [ordered, setOrdered] = useState([] as string[]);

  useEffect(() => {
    if (columnsDnD) {
      setOrdered(Object.keys(columnsDnD!));
    }
  }, [columnsDnD]);

  const onSubmit = async (data: FormValues) => {
    const newColumn: INewColumn = {
      title: data.title,
      order: 1,
    };
    await createColumn({ boardId: boardId!, data: newColumn }).unwrap();
    refetchGetColumns();
    reset();
    setIsModalOpen(false);
  };

  const onDragEnd = (result: DropResult): void => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow: string[] = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column: ITask[] = columnsDnD![result.source.droppableId];
      const withQuoteRemoved: ITask[] = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      setColumnsDnD({
        ...columnsDnD,
        [result.source.droppableId]: withQuoteRemoved,
      });
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // reordering column
    if (result.type === 'COLUMN') {
      setOrdered(reorder(ordered, source.index, destination.index));
      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columnsDnD,
      source,
      destination,
    });

    setColumnsDnD(data.quoteMap);
  };

  return !boardId ? (
    <Page404 />
  ) : (
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={true}
            isCombineEnabled={true}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ display: 'inline-flex' }}
              >
                {isSuccessColumn &&
                  isSuccessTasks &&
                  columns &&
                  tasksInBoard &&
                  ordered &&
                  ordered.map((key: string, index: number) => (
                    <BoardColumn
                      key={index}
                      {...columns.find((col) => col['order'].toString() === key)}
                      index={index}
                      tasks={columnsDnD[key]}
                    />
                  ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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

/* {isColumnLoading ? (
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
          )} */

/*    {ordered.map((key: string, index: number) => (
            <BoardColumn
              key={key}
              tasks={columnsDnD![key]}
              {...columns?.filter((col) => {
                col.order.toString() === key;
              })}
            />
          ))} */
/*    {!isColumnLoading &&
            columns &&
            tasksInBoard &&
            columns.map((column: IColumn) => (
              <BoardColumn
                {...column}
                tasks={tasksInBoard!.filter((task: ITask) => task.columnId === column._id)}
                key={column._id}
              />
            ))} */

/*      {ordered.map((key: string, index: number) => (
              <BoardColumn
                key={index}
                {...columns!.filter((col) => {
                  col.order.toString() === key;
                })[0]}
              />
            ))} */
