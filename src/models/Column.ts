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
