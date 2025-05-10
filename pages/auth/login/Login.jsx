import "./login.scss";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../../api/axiosConfig";
import photo_google from "../../../src/images/google.png";
import { LoginContext } from "../../../context/LoginContext";

export default function Login() {
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginOauth2Failed, setLoginOauth2Failed] = useState(false);
  const { setIsLogged } = useContext(LoginContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const errorOauth2 = queryParams.get("errorOauth2");

  useEffect(() => {
    if (errorOauth2 === null) {
      setLoginOauth2Failed(false);
    } else {
      setLoginOauth2Failed(true)
    }
  }, [errorOauth2]);

  function loginForm(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    localStorage.removeItem("token");
    api
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.token !== null) {
          setLoginFailed(false);
          localStorage.setItem("token", res.data.token);
          setIsLogged(true);
          navigate("/user-dasheboard");
        } else {
          setLoginFailed(true);
        }
      });
  }

  function loginGoogle() {
    localStorage.removeItem("token");
    //window.location.href = "http://localhost:8080/oauth2/authorization/google";
    window.location.href = "https://streamingplatform-be.onrender.com/oauth2/authorization/google"
  }

  return (
    <div className="login-container">
      <div className="login-container-wrapper">
        <div className="login-form-container">
          <h1>Welcome back</h1>
          <p>Please enter your details</p>

          {loginFailed ? (
            <p className="login-failed">
              Invalid credentials. Please try again.
            </p>
          ) : null}

          {loginOauth2Failed ? (
            <p className="login-oauth2-failed">{errorOauth2}</p>
          ) : null}

          <form className="login-form" action={loginForm}>
            <div className="login-form-email-wrapper">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                aria-label="email input"
                autoComplete="email"
                required={true}
              />
            </div>

            <div className="login-form-password-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                aria-label="password input"
                autoComplete="current-password"
                required={true}
              />
            </div>

            <p>
              <Link to="">Forgot password</Link>
            </p>
            <button className="login-form-button-sign-in">Sign in</button>

            <button className="login-form-button" onClick={loginGoogle}>
              <img className="img-google" src={photo_google} alt="google" />
              Sign in with Google
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>

        <div className="login-information">
          <h1>Note:</h1>
          <p>
            I prepare for you 3 type of role user to enter with them if you
            don't want to sign up
          </p>
          <ol>
            <li>
              User = With this user you can comment, add to favorite, and like
              the movies
            </li>
            <li>
              Admin = With this role you can see a dasheboard with data about
              movies...
            </li>
            <li>
              content manager = With this role you can add, delete or update a
              movie of your own.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
