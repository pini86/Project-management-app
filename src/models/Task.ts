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
