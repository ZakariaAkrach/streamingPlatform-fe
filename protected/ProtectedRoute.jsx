import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function ProtectedRoute({children}) {
  const { isLogged } = useContext(LoginContext);

  return isLogged ? children : <Navigate to="/login" />;
}
