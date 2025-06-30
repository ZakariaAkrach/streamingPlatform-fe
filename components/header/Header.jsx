import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import api from "../../api/axiosConfig";
import movie_logo from "../../public/movie.svg";
import { LoginContext } from "../../context/LoginContext";

export default function Header() {
  const { isLogged, setIsLogged } = useContext(LoginContext);
  const navigate = useNavigate();

  function handleLogOut() {
    api.post("https://streamingplatform-be.onrender.com:8080/logout");
    localStorage.removeItem("token");
    setIsLogged(false);
  }

  function handleDashboard() {
    var role = localStorage.getItem("role");

    if (role === "USER") {
      navigate("/user-dasheboard");
      return;
    }

    if (role === "ADMIN") {
    }

    if (role === "CONTENT_MANAGER") {
      navigate("/content-manager");
      return;
    }
  }

  const buttonLoginStyle = {
    backgroundColor: "#1e90ff",
    color: "white",
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav-container">
      <Link to="." className="navbar-brand">
        {" "}
        <img className="logo" src={movie_logo} alt="logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="tv-show">
              Tv Show
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="tv-show">
              Movie
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="content-manager">
              Archive
            </Link>
          </li>
        </ul>
        <div className="search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="search" placeholder="Search Movie" aria-label="Search" />
        </div>
        <div className="button-log-in">
          {!isLogged ? (
            <Link to="login">
              <button type="button" className="btn" style={buttonLoginStyle}>
                Log In
              </button>
            </Link>
          ) : (
            <div className="dashboard-log-out">
              <button
                onClick={handleDashboard}
                type="button"
                className="btn"
                style={buttonLoginStyle}
              >
                Dashboard
              </button>
              <button
                onClick={handleLogOut}
                type="button"
                className="btn"
                style={buttonLoginStyle}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
