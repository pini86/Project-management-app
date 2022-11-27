import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from '../../models/Column';

export interface IColumnState {
  columns: IColumn[];
}

export const initialState: IColumnState = {
  columns: [],
};

export const boardColumnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    createColumn(state, action: PayloadAction<IColumn>) {
      return { ...state, columns: [...state.columns, action.payload] };
    },
    updateColumn(state, action: PayloadAction<IColumn>) {
      return {
        ...state,
        columns: [
          ...state.columns.filter((elem) => elem._id !== action.payload._id),
          action.payload,
        ],
      };
    },
    deleteColumn(state, action: PayloadAction<IColumn>) {
      return { ...state, columns: state.columns.filter((elem) => elem._id !== action.payload._id) };
    },
    resetColumns: () => initialState,
  },
});
export default boardColumnSlice.reducer;
