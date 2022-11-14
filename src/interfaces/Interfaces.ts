export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface INewBoard {
  title: string;
  owner: string;
  users: string[];
}

export interface IBoard extends INewBoard {
  _id: string;
}

export interface INewColumn {
  title: string;
  order: number;
}

export interface INewSetColumn extends INewColumn {
  boardId: string;
}

export interface IColumn extends INewSetColumn {
  _id: string;
}

export interface IUpdateColumn {
  _id: string;
  order: number;
}

export interface INewTask {
  title: string;
  order: number;
  description: string;
  userId: number;
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
