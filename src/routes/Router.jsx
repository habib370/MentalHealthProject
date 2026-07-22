import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout.jsx";
import Home from "../pages/Home.jsx";
import CheckIn from "../pages/CheckIn.jsx"
import Records from "../pages/Records.jsx"; 
import Progress from "../pages/Progress.jsx";
import Resources from "../pages/Resources.jsx";
import { Login } from "../components/Login.jsx";
import { Register } from "../components/Register.jsx";
import Profile from "../pages/Profile.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/home", element: <Home /> },
      { path: "/check-in", element: <CheckIn /> },
      { path: "/records", element: <Records /> },
      { path: "/progress", element: <Progress /> },
      { path: "/resources", element: <Resources /> },
      { path: "/profile", element: <Profile /> }
    ],
  },
]);
