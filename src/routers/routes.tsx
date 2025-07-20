import { createBrowserRouter } from "react-router-dom";

import EventScheduler from "../components/EventScheduler";
import ArchivedEventsPage from "../components/ArchivedEventsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EventScheduler />,
  },
  {
    path: "/archived",
    element: <ArchivedEventsPage />,
  },
]);

export default router;
