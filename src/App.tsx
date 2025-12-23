import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Assets } from "./pages/Assets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "assets", element: <Assets /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
