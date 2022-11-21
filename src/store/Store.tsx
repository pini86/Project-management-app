import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api } from '../api/Api';
import userReducer from './reducers/userSlice';
import boardReduser from './reducers/boardSlice';
import { defaultState } from './reducers/userSlice';

const localStorageState = localStorage.getItem('reduxState');
const persistedState = localStorageState ? JSON.parse(localStorageState) : defaultState;

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  userReducer,
  boardReduser,
  persistedState,
});

export const InitStore = () => {
  return configureStore({ reducer: () => {} });
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore['dispatch'];
