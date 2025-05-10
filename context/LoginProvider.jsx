import { useState } from "react";
import { LoginContext } from "./LoginContext";

export default function LoginProvider({ children }) {
  const [isLogged, setIsLogged] = useState(isLoggedCheck);

  function isLoggedCheck() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      return true;
    }
    return false;
  }

  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </LoginContext.Provider>
  );
}
