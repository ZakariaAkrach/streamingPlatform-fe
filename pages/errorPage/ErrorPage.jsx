import { Link } from "react-router-dom";
import "./errorPage.scss";

export default function ErrorPage() {
  return (
    <div className="error-page-container">
      <h1 className="error-page-text-title">404</h1>
      <p className="error-page-text-apologize">
        Oops, sorry we can't find that page
      </p>
      <p className="error-page-text">Either something went wrong or the page doesn't exist anymore.</p>
      <Link to="/">
        <button className="error-page-back-to-home">
          <i className="fa-solid fa-arrow-left"></i> Back to homepage
        </button>
      </Link>
    </div>
  );
}
