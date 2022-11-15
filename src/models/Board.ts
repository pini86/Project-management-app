export interface INewBoard {
  title: string;
  owner: string;
  users: string[];
}

export interface IBoard extends INewBoard {
  _id: string;
}
