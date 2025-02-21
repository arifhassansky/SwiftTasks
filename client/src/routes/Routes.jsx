import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import AddTask from "../pages/AddTask.jsx";

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
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
export default router;
