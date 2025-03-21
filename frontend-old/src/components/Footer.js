import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Side: Contact Information */}
        <div className="footer-left">
          <h3>Contact Us</h3>
          <p><FaMapMarkerAlt /> 123 Tech Street, New York, NY 10001</p>
          <p><FaPhone /> +1 (555) 123-4567</p>
          <p><FaEnvelope /> aisolution.contact@gmail.com</p>
        </div>

        {/* Right Side: Links & Social Media */}
        <div className="footer-right">
          <div className="footer-logo">AI SOLUTION</div>

          {/* Navigation Links */}
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Solution">Solution</Link></li>
            <li><Link to="/Industries">Industries</Link></li>
            <li><Link to="/Blog">Blogs</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
          </ul>

          {/* Social Media Links */}
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
