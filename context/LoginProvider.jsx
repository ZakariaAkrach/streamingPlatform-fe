import { useState, createContext } from "react";
import { LoginContext } from "./LoginContext";

export default function LoginProvider({children}) {
     const [isLogged, setIsLogged] = useState(false);

    return(
        <LoginContext.Provider value={{isLogged, setIsLogged}}>
            {children}
        </LoginContext.Provider>
    )
}