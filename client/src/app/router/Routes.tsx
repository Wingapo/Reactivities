import {createBrowserRouter, Navigate} from "react-router";
import App from "../layout/App.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityForm from "../../features/activities/form/ActivityForm.tsx";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage.tsx";
import Counter from "../../features/counter/Counter.tsx";
import TestErrors from "../../features/errors/TestErrors.tsx";
import NotFound from "../../features/errors/NotFound.tsx";
import ServerError from "../../features/errors/ServerError.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'activities', element: <ActivityDashboard /> },
      { path: 'activities/:id', element: <ActivityDetailsPage /> },
      { path: 'activities/new', element: <ActivityForm key="empty" /> },
      { path: 'activities/:id/edit', element: <ActivityForm /> },
      { path: 'counter', element: <Counter /> },
      { path: 'errors', element: <TestErrors /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'server-error', element: <ServerError /> },
      { path: '*', element: <Navigate replace to="/not-found"/> },
    ],
  },
]);
