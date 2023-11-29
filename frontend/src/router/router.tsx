/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthGuard from '../components/authGuard/AuthGuard';
import UserLayout from '../components/layout/UserLayout';
import ErrorPage from '../pages/errorPage/ErrorPage';
import Login from '../pages/auth/login/Login';
import Signup from '../pages/auth/signup/Signup';


const Items = lazy(
  () => import('../pages/screens/common/businessData/Items'),
);

const UserProfile = lazy(() => import('../pages/screens/common/profile/UserProfile'));

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage errorType="NOT_FOUND" />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
  {
    path: '/',
    errorElement: <ErrorPage errorType="NOT_FOUND" />,
    element: (
      <AuthGuard>
        <UserLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Items />,
      },
      {
        path: 'profile',
        element: <UserProfile />,
      }
    ],
  },
]);

export default router;