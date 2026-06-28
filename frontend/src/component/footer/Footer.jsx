import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">

        {/* Logo + Description */}
        <div className="footer-logo-section">
          <h3 className="footer-logo-text">
            <p className="package-lucide">F</p> FreshMart
          </h3>
          <span className="logo-footer-subtitle">
            Your trusted destination for fresh, quality groceries delivered right to your doorstep. We bring farm-fresh produce and everyday essentials to your home.
          </span>
          <div className="social-icons">
              <a href="#" className="social-icon">
                <FaFacebookF className="social-icon__svg" />
              </a>

              <a href="#" className="social-icon">
                <FaTwitter className="social-icon__svg" />
              </a>

              <a href="#" className="social-icon">
                <FaInstagram className="social-icon__svg" />
              </a>

              <a href="#" className="social-icon">
                <FaLinkedinIn className="social-icon__svg" />
              </a>
          </div>
        </div>

        {/* Shop */}
        <div className="footer-section">
          <ul>
            <li className="footer-bold">Shop</li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products">Vegetables</Link></li>
            <li><Link to="/products">Fruits</Link></li>
            <li><Link to="/products">Dairy</Link></li>
          </ul>
        </div>

        {/* Accounts */}
        <div className="footer-section">
          <ul>
            <li className="footer-bold">Accounts</li>
            <li>My Profile</li>
            <li>My Orders</li>
            <li>Cart</li>
          </ul>
        </div>

        {/* Help */}
        <div className="footer-section">
          <ul>
            <li className="footer-bold">Help</li>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        
      </footer>
      <div className="footer-copyright">
            <p className="copyright">&copy;2026 FreshMart. All rights reserved.</p>
        </div>
    </div>
  );
};