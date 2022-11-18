import { configureStore, combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';
import { api } from '../api/Api';
import userReducer from './reducers/userSlice';
import { defaultState } from './reducers/userSlice';

export type RootState = ReturnType<typeof combinedReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore['dispatch'];

const localStorageState = localStorage.getItem('reduxState');
const persistedState = localStorageState ? JSON.parse(localStorageState) : defaultState;

const combinedReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  userReducer,
  persistedState,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'user/resetUser') {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export const InitStore = () => {
  return configureStore({ reducer: () => {} });
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
