import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import AddTask from "../pages/AddTask.jsx";
import EditTask from "../pages/EditTask.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addTask",
        element: <AddTask />,
      },
      {
        path: "/edit",
        element: <EditTask />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
export default router;
