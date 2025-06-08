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
import UserDashboard from "./pages/dashboard/user/UserDashboard";
import LoginProvider from "./context/LoginProvider";
import ProtectedRoute from "./protected/ProtectedRoute";
import OAuth2RedirectHandler from "./components/ouath2Redirect/OAuth2RedirectHandler";
import ContentManager from "./pages/dashboard/contentManager/ContentManager";
import DetailPage from "./components/detailPage/DetailPage";

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
      <Route
        path="oauth2-redirect-handler"
        element={<OAuth2RedirectHandler />}
      />

      <Route
        path="user-dasheboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="content-manager"
        element={
          <ProtectedRoute>
            <ContentManager />
          </ProtectedRoute>
        }
      />

      <Route path="content-detail/:id" element={<DetailPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

root.render(
  <LoginProvider>
    <RouterProvider router={router} />
  </LoginProvider>
);
