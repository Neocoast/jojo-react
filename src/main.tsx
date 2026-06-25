import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { RouterProvider } from '@tanstack/react-router';

import { store } from './services/store';
import { router } from './router';
import './index.css';

const App = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  return <RouterProvider router={router} context={{ auth: { isAuthenticated } }} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
