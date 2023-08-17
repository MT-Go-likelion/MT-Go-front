import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';

import {
  Error,
  Main,
  SignIn,
  SignUp,
  LodgingDetail,
  Recreation,
  Lodging,
  Shopping,
  Mypage,
  MypageTeamspace,
  RecreationDetail,
  RecreationRegistration,
  CreateLodging,
  UpdateLodging,
  UpdateRecreation,
  Setting,
} from './pages/index';
import ProtectedRoute from './pages/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Main /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/lodging', element: <Lodging /> },
      { path: '/lodging/:lodgingId', element: <LodgingDetail /> },
      {
        path: '/lodging/create',
        element: (
          <ProtectedRoute requireAdmin>
            <CreateLodging />
          </ProtectedRoute>
        ),
      },
      {
        path: '/lodging/update',
        element: (
          <ProtectedRoute requireAdmin>
            <UpdateLodging />
          </ProtectedRoute>
        ),
      },
      { path: '/recreation', element: <Recreation /> },
      { path: '/recreation/:recreationId', element: <RecreationDetail /> },
      {
        path: '/recreation/register',
        element: (
          <ProtectedRoute requireAdmin>
            <RecreationRegistration />
          </ProtectedRoute>
        ),
      },
      {
        path: '/recreation/update',
        element: (
          <ProtectedRoute requireAdmin>
            <UpdateRecreation />
          </ProtectedRoute>
        ),
      },
      {
        path: '/shopping',
        element: (
          <ProtectedRoute>
            <Shopping />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mypage',
        element: (
          <ProtectedRoute>
            <Mypage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mypage/:teamToken',
        element: (
          <ProtectedRoute>
            <MypageTeamspace />
          </ProtectedRoute>
        ),
      },
      {
        path: '/setting',
        element: (
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen />
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
