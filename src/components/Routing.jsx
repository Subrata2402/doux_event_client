import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Loader = lazy(() => import('./loader/Loader'));
const Layout = lazy(() => import('./Layout'));
const Home = lazy(() => import('./home/Home'));
const SignIn = lazy(() => import('./auth/signin/SignIn'));
const SignUp = lazy(() => import('./auth/signup/SignUp'));
const ForgotPassword = lazy(() => import('./auth/forgot_password/ForgotPassword'));
const ProtectedRoute = lazy(() => import('../guard/ProtectedRoute'));
const GuestRoute = lazy(() => import('../guard/GuestRoute'));
const Verification = lazy(() => import('./auth/verification/Verification'));
const CreateEvent = lazy(() => import('./event/create_event/CreateEvent'));
const EventDetails = lazy(() => import('./event/event_details/EventDetails'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: '/events/:eventId',
        element: (
          <Suspense fallback={<Loader />}>
            <EventDetails />
          </Suspense>
        )
      },
      {
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute />
          </Suspense>
        ),
        children: [
          {
            path: '/create-event',
            element: (
              <Suspense fallback={<Loader />}>
                <CreateEvent />
              </Suspense>
            )
          }
        ]
      }
    ]
  },
  {
    element: (
      <Suspense fallback={<Loader />}>
        <GuestRoute />
      </Suspense>
    ),
    children: [
      {
        path: '/auth/signin',
        element: (
          <Suspense fallback={<Loader />}>
            <SignIn />
          </Suspense>
        ),
        children: [
          {
            path: 'forgot-password',
            element: (
              <Suspense fallback={<Loader />}>
                <ForgotPassword />
              </Suspense>
            )
          }
        ]
      },
      {
        path: '/auth/signup',
        element: (
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        ),
        children: [
          {
            path: 'verification',
            element: (
              <Suspense fallback={<Loader />}>
                <Verification />
              </Suspense>
            )
          }
        ]
      },
    ]
  },
]);

function Routing() {
  return (
    <RouterProvider router={router} />
  )
}

export default Routing;