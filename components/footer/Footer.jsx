import { Link } from "react-router-dom";
import "./footer.scss";
import foto_zakaria from "../../src/images/foto_zakaria.png"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={foto_zakaria} alt="foto zakaria" />
          <div className="info-footer-logo">
            <h3>Zakaria Akrach</h3>
            <p>Software Developer</p>
          </div>
        </div>
        <nav className="footer-nav">
          <h2>Menu</h2>
          <ul className="footer-nav-links">
            <li>
              <Link onClick={() => window.scrollTo(0,0)} className="footer-nav-link-tag" to=".">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => window.scrollTo(0,0)} className="footer-nav-link-tag" to="tv-show">
                Tv Show
              </Link>
            </li>
            <li>
              <Link className="footer-nav-link-tag" to="">
                Movie
              </Link>
            </li>
            <li>
              <Link className="footer-nav-link-tag" to="">
                Archive
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Social media">
          <h1>Social</h1>
          <ul className="footer-social-media-links">
            <li>
              <a
                href="https://www.linkedin.com/in/zakaria-akrach-72b335203"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin footer-icon"></i>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ZakariaAkrach"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-disable-color-default"
              >
                <i className="fa-brands fa-github footer-icon"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="footer-right-reserved">
        © 2025 Zakaria Akrach. All rights reserved.
      </p>
    </footer>
  );
}
