import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/User';

interface UserState {
  isLoggedIn: boolean;
  user: IUser;
}
const initialState: UserState = {
  isLoggedIn: false,
  user: {
    _id: '',
    name: '',
    login: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    upgradeUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
});
export default userSlice.reducer;
