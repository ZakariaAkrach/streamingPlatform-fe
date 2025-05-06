import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.scss";
import AppLayout from "./pages/layout/AppLayout";
import Home from "./pages/home/Home";
import Pagination from "./pages/pagination/Pagination";
import ErrorPage from "./pages/errorPage/ErrorPage";
import HandleGenericError from "./components/handleGenericError/HandleGenericError";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import UserDasheboard from "./pages/dasheboards/user/UserDasheboard";

const root = createRoot(document.getElementById("root"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppLayout />}
      errorElement={<HandleGenericError />}
    >
      <Route index element={<Home />} />
      <Route path="tv-show" element={<Pagination />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="user-dasheboard" element={<UserDasheboard />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

root.render(<RouterProvider router={router} />);
