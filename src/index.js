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
} from './pages/index';

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
      { path: '/recreation', element: <Recreation /> },
      { path: '/recreation/:recreationId', element: <RecreationDetail /> },
      { path: '/recreation/register', element: <RecreationRegistration /> },
      { path: '/shopping', element: <Shopping /> },
      { path: '/mypage', element: <Mypage /> },
      { path: '/mypageTeamspace', element: <MypageTeamspace /> },
      { path: '/mypage', element: <Mypage /> },
      { path: '/createLodging', element: <CreateLodging /> },
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
