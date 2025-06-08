import { useState, useEffect } from "react";
import { LoginContext } from "./LoginContext";
import { safeGET } from "../api/authenticatedApi";

export default function LoginProvider({ children }) {
  const [isLogged, setIsLogged] = useState(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isLogged) {
      safeGET("/auth/user-info").then((response) => {
        if (response.data.status === 200) {
          localStorage.setItem("username", response.data.data.username);
        }
      });
    } else {
      localStorage.removeItem("username");
    }
  }, [isLogged]);

  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </LoginContext.Provider>
  );
}
