import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from './routes/Router.jsx'
import {ToastProvider} from './context/Toast.jsx'
import { AuthProvider } from "./context/Auth.jsx";
import { ApiProvider } from "./context/Api.jsx";
import { AccountProvider } from "./context/Account.jsx";

createRoot(document.getElementById("root")).render(
 <ApiProvider>
  <AuthProvider>
    <AccountProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AccountProvider>
  </AuthProvider>
</ApiProvider>
);