import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api } from '../api/Api';
import userReducer from './reducers/userSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  userReducer,
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
