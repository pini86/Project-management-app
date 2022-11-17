import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api } from '../api/Api';
import userReducer from './reducers/userSlice';
import { initialState } from '../utils/authUtils';

const localStorageState = localStorage.getItem('reduxState');
const persistedState = localStorageState ? JSON.parse(localStorageState) : initialState;

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  userReducer,
  persistedState,
});

export const InitStore = () => {
  return configureStore({ reducer: () => {} });
};

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
