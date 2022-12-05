import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserStateFromLocalStorage } from 'utils/authUtils';
import { IUser } from '../../models/User';

export interface IUserState {
  isLoggedIn: boolean;
  user: IUser;
  token: null | string;
}

export const defaultState: IUserState = {
  isLoggedIn: false,
  user: {
    _id: '',
    name: '',
    login: '',
  },
  token: null,
};

const initialState: IUserState = getUserStateFromLocalStorage();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    updateUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    updateToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    resetUser: () => defaultState,
  },
});
export default userSlice.reducer;
