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
