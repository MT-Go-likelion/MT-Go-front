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
      { path: '/createLodging', element: <CreateLodging /> },
      { path: '/updateLodging', element: <UpdateLodging /> },
      { path: '/recreation', element: <Recreation /> },
      { path: '/recreation/:recreationId', element: <RecreationDetail /> },
      { path: '/recreation/register', element: <RecreationRegistration /> },
      { path: '/recreation/update', element: <UpdateRecreation /> },
      { path: '/shopping', element: <Shopping /> },
      { path: '/mypage', element: <Mypage /> },
      { path: '/mypage/:teamToken', element: <MypageTeamspace /> },
      { path: '/mypage', element: <Mypage /> },
      { path: '/setting', element: <Setting /> },
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
