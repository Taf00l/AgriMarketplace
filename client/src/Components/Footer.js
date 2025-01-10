import React from "react";
import {
  FaPhoneAlt,
  FaInstagram,
  FaWhatsapp,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa"; // Import email icon
import "./home.css"; // Ensure that the home.css is properly styled

const Footer = () => {
  return (
    <footer className="footer bg-dark-green text-white py-4">
      <div className="container">
        <div className="row">
          {/* First column */}
          <div className="col-md-4">
            <h4 className="footer-heading">Designed for Companies</h4>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white footer-link">
                  Contact us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-white footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/forum" className="text-white footer-link">
                  Forum
                </a>
              </li>
            </ul>
            <p className="mt-3 footer-copyright">Copyright © Agrimarketplace</p>
          </div>

          {/* Second column */}
          <div className="col-md-4">
            <p className="footer-description">
              We are a team of passionate people whose goal is to improve
              everyone's life. Our services are designed for small to medium
              size companies.
            </p>
            <div>
              <p>
                <FaPhoneAlt className="footer-icon" /> +968 91221323
              </p>
              <p>
                <FaEnvelope className="footer-icon" /> agrimarketplace@gmail.com
              </p>{" "}
              {/* Added email icon */}
            </div>
          </div>

          {/* Third column with social media */}
          <div className="col-md-4 d-flex justify-content-end align-items-center">
            <a
              href="https://www.instagram.com/agr_imarketplace?igsh=MTF4dmd0c3YyaG95aA%3D%3D&utm_source=qr"
              className="text-white me-3"
            >
              <FaInstagram className="fa-2x footer-icon" />
            </a>
            <a href="#" className="text-white me-3">
              <FaTimes className="fa-2x footer-icon" />
            </a>{" "}
            {/* FaTimes for closing icon */}
            <a href="#" className="text-white me-3">
              <FaWhatsapp className="fa-2x footer-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
