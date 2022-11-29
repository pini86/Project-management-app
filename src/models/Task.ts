import {
  QueryDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';

export interface INewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface IUpdateTask extends INewTask {
  columnId: string;
}

export interface ITask extends IUpdateTask {
  _id: string;
  boardId: string;
}

export interface INewSetTask {
  _id: string;
  order: number;
  columnId: string;
}

export interface ITaskRefetch extends ITask {
  refetch(): QueryActionCreatorResult<
    QueryDefinition<
      {
        boardId: string;
        columnId: string;
      },
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, never>,
        FetchBaseQueryMeta
      >,
      never,
      ITask[],
      'api'
    >
  >;
}
