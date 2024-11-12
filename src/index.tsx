import React from 'react';
import ReactDOM from 'react-dom/client';
/** Ensure resets is lowest precedence */
import './styles/resets.module.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './routes/home/Home';
import { ValveCover } from './routes/valve_cover/ValveCover';
import { MicrosoftCover } from './routes/microsoft_cover/MicrosoftCover';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/valve',
      element: <ValveCover />,
    },
    {
      path: '/microsoft',
      element: <MicrosoftCover />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </React.StrictMode>
);
