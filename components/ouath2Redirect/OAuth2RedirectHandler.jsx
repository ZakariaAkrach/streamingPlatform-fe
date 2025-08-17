import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

export default function OAuth2RedirectHandler() {
  const location = useLocation();
  const { setIsLogged } = useContext(LoginContext);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (token !== null) {
      setIsLogged(true);
      localStorage.setItem("token", token);

      const role = queryParams.get("role");
      if (role) {
        localStorage.setItem("role", role);
      }

      navigate("/user-dasheboard");
    } else {
      navigate("/login?error=oauth2");
    }
  }, [setIsLogged, navigate, location.search]);

  return <p>Redirecting ...</p>;
}
