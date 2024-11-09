import React from 'react';
import ReactDOM from 'react-dom/client';
/** Ensure resets is lowest precedence */
import './styles/resets.module.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './routes/home/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
