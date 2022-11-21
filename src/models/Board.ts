export interface INewBoard {
  description?: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IBoard extends INewBoard {
  id: string;
}
