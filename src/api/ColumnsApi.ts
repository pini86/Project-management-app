import { IColumn, INewColumn, IUpdateColumn, INewSetColumn } from 'interfaces/Interfaces';
import { api } from './Api';

const columnsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getColumnsInBoard: builder.query<IColumn[], { boardId: string }>({
      query: ({ boardId }) => ({
        url: `boards/${boardId}/columns`,
        method: 'GET',
      }),
    }),
    createColumn: builder.query<IColumn, { boardId: string; data: INewColumn }>({
      query: ({ boardId, data }) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body: data,
      }),
    }),
    getColumnById: builder.query<IColumn, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'GET',
      }),
    }),
    updateColumnById: builder.query<
      IColumn,
      { boardId: string; columnId: string; data: INewColumn }
    >({
      query: ({ boardId, columnId, data }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleletColumnById: builder.query<IColumn, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
    }),
    getColumnsByIdsListOrUserId: builder.query<IColumn[], { userId?: string; listIds?: string[] }>({
      query: ({ userId, listIds }) => ({
        url: `columnsSet?
        ${listIds?.length ? `ids=${[...listIds]}` : ''}
        ${listIds?.length && userId ? `&` : ''}
        ${userId ? `userId=${userId}` : ''}`,
        method: 'GET',
      }),
    }),
    updateSetOfColumns: builder.query<IColumn[], { data: IUpdateColumn[] }>({
      query: ({ data }) => ({
        url: `columnsSet`,
        method: 'PATCH',
        body: data,
      }),
    }),
    createSetOfColumns: builder.query<IColumn[], { data: INewSetColumn[] }>({
      query: ({ data }) => ({
        url: `columnsSet`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetColumnsInBoardQuery,
  useCreateColumnQuery,
  useGetColumnByIdQuery,
  useUpdateColumnByIdQuery,
  useDeleletColumnByIdQuery,
  useGetColumnsByIdsListOrUserIdQuery,
  useUpdateSetOfColumnsQuery,
  useCreateSetOfColumnsQuery,
} = columnsApi;
