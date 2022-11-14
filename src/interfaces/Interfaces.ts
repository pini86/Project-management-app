export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: string[];
}

export interface IFile {
  _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

export interface IPoint {
  _id: string;
  title: string;
  taskId: number;
  boardId: string;
  done: boolean;
}

export interface IErrorResponse {
  status: number;
  message: string;
}

export interface ISignIn {
  login: string;
  password: string;
}

export interface ISignUp {
  name: string;
  login: string;
  password: string;
}
