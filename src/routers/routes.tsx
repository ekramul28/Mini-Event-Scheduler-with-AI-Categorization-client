import { createBrowserRouter } from "react-router-dom";
import React from "react";
import EventScheduler from "../components/EventScheduler";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EventScheduler />,
  },
]);

export default router;
