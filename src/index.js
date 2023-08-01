import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';

import {
  ErrorPage,
  Main,
  SignIn,
  SignUp,
  LodgingDetail,
  Recreation,
  Room,
  Shopping,
} from './pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Main /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/room', element: <Room /> },
      { path: '/detail/:lodingId', element: <LodgingDetail /> },
      { path: '/recreation', element: <Recreation /> },
      { path: '/shopping', element: <Shopping /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
