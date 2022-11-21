import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../models/Board';

export interface IBoardsState {
  boards: IBoard[];
}

export const initialState: IBoardsState = {
  boards: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createBoard(state, action: PayloadAction<IBoard>) {
      return { ...state, boards: [...state.boards, action.payload] };
    },
    updateBoard(state, action: PayloadAction<IBoard>) {
      return {
        ...state,
        boards: [...state.boards.filter((elem) => elem.id !== action.payload.id), action.payload],
      };
    },
    deleteBoard(state, action: PayloadAction<IBoard>) {
      return { ...state, boards: state.boards.filter((elem) => elem.id !== action.payload.id) };
    },
    resetBoards: () => initialState,
  },
});
export default boardSlice.reducer;
