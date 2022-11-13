import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IUser,
  IBoard,
  IColumn,
  ITask,
  IFile,
  IPoint,
  IErrorResponse,
  ISignIn,
  ISignUp,
} from 'interfaces/Interfaces';

const BASE_URL = 'https://final-task-backend-production-3386.up.railway.app/';

enum StatusCodes {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    signIn: builder.query<{ token: string }, ISignIn>({
      query: ({ login, password }) => ({
        url: `auth/signin`,
        method: 'POST',
        body: { login, password },
      }),
    }),
    signUp: builder.query<IUser, ISignUp>({
      query: ({ name, login, password }) => ({
        url: `auth/signup`,
        method: 'POST',
        body: { name, login, password },
      }),
    }),
  }),
});

export const { useSignInQuery, useSignUpQuery } = authApi;

enum StatusMessages {
  DELETED_POINT = 'Deleted Point',
  BAD_REQUEST = 'Bad request',
  UPDATED_COLUMN = 'Updated column',
  FOUNDED_POINTS = 'Founded Points',
  UPDATED_POINTS = 'Updated Points',
  FILE_ALREADY_EXIST = 'File already exist',
  CREATED_POINT = 'Created Point',
  POINTS_LIST = 'Points list',
  DELETED_FILE = 'Deleted file',
  FOUNDED_FILES = 'Founded files',
  UPLOADED_FILE = 'Uploaded File',
  FILES_LIST = 'Files list',
  TASKS_LIST = 'Tasks list',
  UPDATED_TASKS = 'Updated tasks',
  DELETED_TASK = 'Deleted task',
  UPDATED_TASK = 'Updated task',
  FOUNDED_TASK = 'Founded task',
  TASK_NOT_FOUNDED = 'Task was not founded!',
  CREATED_TASK = 'Created task',
  ALL_TASK_IN_COLUMN = 'All tasks in column',
  CREATED_COLUMN = 'Created columns',
  UPDATED_COLUMNS = 'Updated columns',
  COLUMNS_LIST = 'Columns list',
  DELETED_COLUMN = 'Deleted column',
  COLUMN_WAS_NOT_FOUNDED = 'Column was not founded!',
  FOUNDED_COLUMN = 'Founded column',
  ALL_COLUMN_IN_BOARD = 'All columns in board',
  BOARDS_BY_USERID = 'Boards by userId',
  BOARDS_BY_IDS_LIST = 'Boards by ids list',
  DELETED_BOARD = 'Deleted board',
  UPDATED_BOARD = 'Updated board',
  FOUNDED_BOARD = 'Founded board',
  BOARD_WAS_NOT_FOUNDED = 'Board was not founded!',
  CREATED_BOARD = 'Created board',
  ALL_BOARDS_ON_SERVER = 'All boards on server',
  DELETED_USER = 'Deleted user',
  UPDATED_USER = 'Updated user',
  LOGIN_ALREADY_EXIST = 'Login already exist',
  USER_WAS_NOT_FOUNDED = 'User was not founded!',
  FOUNDED_USER = 'Founded user',
  ALL_USER_ON_SERVER = 'All users on server',
  NEW_USER_IS_CREATED = 'New user is created',
  SUCESSEFUL_LOGIN = 'Successeful login',
  AUTHORIZATION_ERROR = 'Authorization error',
}
