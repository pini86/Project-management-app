import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/Api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const InitStore = () => {
  return configureStore({ reducer: () => {} });
};

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
