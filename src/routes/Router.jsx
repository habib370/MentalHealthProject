import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout.jsx";
import Home from "../pages/Home.jsx";
import { Login } from "../components/Login.jsx";
import { Register } from "../components/Register.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/home", element: <Home /> },
    ],
  },
]);
