import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/User';

export interface IUserState {
  isLoggedIn: boolean;
  user: IUser;
  token: null | string;
}
const initialState: IUserState = {
  isLoggedIn: false,
  user: {
    _id: '',
    name: '',
    login: '',
  },
  token: null,
};

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
  },
});
export default userSlice.reducer;
