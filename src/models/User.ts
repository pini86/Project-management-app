export interface ISignIn {
  login: string;
  password: string;
}

export interface ISignUp {
  name: string;
  login: string;
  password: string;
}

export interface IUser {
  _id: string;
  name: string;
  login: string;
}
