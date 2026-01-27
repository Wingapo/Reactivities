import {createBrowserRouter} from "react-router";
import App from "../layout/App.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityForm from "../../features/activities/form/ActivityForm.tsx";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage.tsx";
import Counter from "../../features/counter/Counter.tsx";

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
    ],
  },
]);
