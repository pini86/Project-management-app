import jwt_decode from 'jwt-decode';
import { IUserState } from 'store/reducers/userSlice';

export const extractUserIdFromToken = (token: string): string => {
  const { id }: { id: string } = jwt_decode(token);
  return id;
};

export const initialState = {
  isLoggedIn: false,
  user: {
    _id: '',
    name: '',
    login: '',
  },
  token: null,
};

export const getUserStateFromLocalStorage = (): IUserState => {
  const localStorageState = localStorage.getItem('reduxState');
  return localStorageState ? JSON.parse(localStorageState) : initialState;
};
