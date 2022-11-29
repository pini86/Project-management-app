import { IBoard, INewBoard } from '../models/Board';
import { api } from './Api';

const boardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBoards: builder.query<IBoard[], void>({
      query: () => ({
        url: `boards`,
        method: 'GET',
      }),
    }),
    createBoard: builder.mutation<IBoard, { data: INewBoard }>({
      query: ({ data }) => ({
        url: `boards`,
        method: 'POST',
        body: data,
      }),
    }),
    getBoardById: builder.query<IBoard, { boardId: string }>({
      query: ({ boardId }) => ({
        url: `boards/${boardId}`,
        method: 'GET',
      }),
    }),
    updateBoardById: builder.mutation<IBoard, { boardId: string; data: INewBoard }>({
      query: ({ boardId, data }) => ({
        url: `boards/${boardId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleletBoardById: builder.mutation<IBoard, { boardId: string }>({
      query: ({ boardId }) => ({
        url: `boards/${boardId}`,
        method: 'DELETE',
      }),
    }),
    getBoardsByIdsList: builder.query<IBoard[], { listIds: string[] }>({
      query: ({ listIds }) => ({
        url: `boardsSet?ids=${[...listIds]}`,
        method: 'GET',
      }),
    }),
    getBoardsByUserId: builder.query<IBoard[], { userId: string }>({
      query: ({ userId }) => ({
        url: `boardsSet/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardByIdMutation,
  useDeleletBoardByIdMutation,
  useGetBoardsByIdsListQuery,
  useGetBoardsByUserIdQuery,
} = boardsApi;
