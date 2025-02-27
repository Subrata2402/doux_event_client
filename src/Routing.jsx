import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Loader = lazy(() => import('./components/loader/Loader'));
const Layout = lazy(() => import('./Layout'));
const SignIn = lazy(() => import('./components/auth/signin/SignIn'));
const SignUp = lazy(() => import('./components/auth/signup/SignUp'));
const ForgotPassword = lazy(() => import('./components/auth/forgot_password/ForgotPassword'));
const ProtectedRoute = lazy(() => import('./guard/ProtectedRoute'));
const GuestRoute = lazy(() => import('./guard/GuestRoute'));
const Verification = lazy(() => import('./components/auth/verification/Verification'));
const CreateEvent = lazy(() => import('./components/event/create_event/CreateEvent'));
const EventDetails = lazy(() => import('./components/event/event_details/EventDetails'));
const Events = lazy(() => import('./pages/events/Events'));
const Home = lazy(() => import('./pages/home/Home'));
const NotFound = lazy(() => import('./pages/not_found/NotFound'));

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
        path: '/events',
        element: (
          <Suspense fallback={<Loader />}>
            <Events />
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
  {
    path: '*',
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    )
  }
]);

function Routing() {
  return (
    <RouterProvider router={router} />
  )
}

export default Routing;