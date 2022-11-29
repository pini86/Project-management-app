import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export interface INewColumn {
  title: string;
  order: number;
}

export interface INewSetColumn extends INewColumn {
  boardId: string;
}

export interface IColumn extends INewSetColumn {
  id: string;
}

export interface IUpdateColumn {
  id: string;
  order: number;
}

export interface IColumnRefetch extends IColumn {
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      { boardId: string },
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, never>,
        FetchBaseQueryMeta
      >,
      never,
      IColumn[],
      'api'
    >
  >;
}
