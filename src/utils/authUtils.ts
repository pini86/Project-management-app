import jwt_decode from 'jwt-decode';
import { IUserState } from 'store/reducers/userSlice';
import { defaultState } from '../store/reducers/userSlice';

interface IToken {
  id: string;
  iat: number;
  exp: number;
  login: string;
}

export const extractUserIdFromToken = (token: string): string => {
  const { id }: IToken = jwt_decode<IToken>(token);
  return id;
};

export const getUserStateFromLocalStorage = (): IUserState => {
  const localStorageState = localStorage.getItem('reduxState');
  return localStorageState ? JSON.parse(localStorageState) : defaultState;
};
