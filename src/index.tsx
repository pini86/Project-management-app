import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import App from './App';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

setupListeners(store.dispatch);
store.subscribe(() => {
  localStorage.setItem(
    'reduxState',
    JSON.stringify({
      token: store.getState().userReducer.token,
      isLoggedIn: store.getState().userReducer.isLoggedIn,
    })
  );
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
