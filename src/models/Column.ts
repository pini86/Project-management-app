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
