import { ITask, INewTask, IUpdateTask, INewSetTask } from 'interfaces/Interfaces';
import { api } from './Api';

const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasksInColumn: builder.query<ITask[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        method: 'GET',
      }),
    }),
    createTask: builder.query<ITask, { boardId: string; columnId: string; data: INewTask }>({
      query: ({ boardId, columnId, data }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: data,
      }),
    }),
    getTaskById: builder.query<ITask, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'GET',
      }),
    }),
    updateTaskById: builder.query<
      ITask,
      { boardId: string; columnId: string; taskId: string; data: IUpdateTask }
    >({
      query: ({ boardId, columnId, taskId, data }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleletTaskById: builder.query<ITask, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),
    getTasksByIdsListOrUserIdOrSearch: builder.query<
      ITask[],
      { columnIds?: string[]; userId?: string; search?: string[] }
    >({
      query: ({ columnIds, userId, search }) => ({
        url: `tasksSet?
        ${columnIds ? `ids=${[...columnIds]}` : ''}
        ${columnIds && (userId || search) ? `&` : ''}
        ${userId ? `userId=${userId}` : ''}
        ${userId && search ? `&` : ''}
        ${search ? `search=${search}` : ''}`,
        method: 'GET',
      }),
    }),
    updateSetOfTasks: builder.query<ITask[], { data: INewSetTask[] }>({
      query: ({ data }) => ({
        url: `tasksSet`,
        method: 'PATCH',
        body: data,
      }),
    }),
    getTasksByBoardId: builder.query<ITask[], { boardId: string }>({
      query: ({ boardId }) => ({
        url: `tasksSet/${boardId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetTasksInColumnQuery,
  useCreateTaskQuery,
  useGetTaskByIdQuery,
  useUpdateTaskByIdQuery,
  useDeleletTaskByIdQuery,
  useGetTasksByIdsListOrUserIdOrSearchQuery,
  useUpdateSetOfTasksQuery,
  useGetTasksByBoardIdQuery,
} = tasksApi;
