import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './store/Store';
import App from './App';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const store = setupStore();
setupListeners(store.dispatch);
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState().userReducer));
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
