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
  id: string;
  boardId: string;
}

export interface INewSetTask {
  id: string;
  order: number;
  columnId: string;
}
