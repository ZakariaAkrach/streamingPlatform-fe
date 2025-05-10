import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/axiosConfig";
import "./register.scss";

export default function Register() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigate();

  localStorage.removeItem("token");
  function registerForm(formData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    api
      .post("/auth/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.status === 201) {
          setHasError(false)
          setIsRegistered(true);
        } else {
          setHasError(true);
          setErrorMessage(res.data.message);
        }
      });
  }

  if (isRegistered) {
    setTimeout(() => {
      navigation("/login");
    }, 3000);
  }

  return (
    <div className="register-container">
      <div className="register-container-wrapper">
        <div className="registration-form-container">
          <h1>Welcome Sign up</h1>
          <p>Sign up to continue</p>

          {isRegistered ? (
            <p style={{ color: "green" }}>
              Account created successfully! Redirecting to the login page...
            </p>
          ) : null}

          {hasError ? (
            <p style={{ color: "red" }}>
              {errorMessage}
            </p>
          ) : null}

          <form className="register-form" action={registerForm}>
            <div className="register-form-input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                aria-label="email input"
                autoComplete="username"
                required={true}
              />
            </div>

            <div className="register-form-input-wrapper">
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

            <div className="register-form-input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                aria-label="password input"
                autoComplete="current-password"
                required={true}
                minLength={3}
              />
            </div>

            <button className="register-form-button-sign-up">Sign up</button>
            <p>
              <Link to="/login">Already have an account?</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
