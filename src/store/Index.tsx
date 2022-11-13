import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/AuthApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const InitStore = () => {
  return configureStore({ reducer: () => {} });
};

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

/* export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getstate>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<appdispatch>();
export const useAppSelector: TypedUseSelectorHook<rootstate> = useSelector; */
