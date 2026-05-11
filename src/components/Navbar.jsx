import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Menu, X, Cpu } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container flex-between">
          <div className="welcome-msg">Welcome to BIMTECH IT SOLUTIONS</div>
          <div className="top-contacts">
            <a href="tel:+918169670476"><Phone size={14} /> +91 81696 70476</a>
            <a href="mailto:info.bimtechitsolutions@gmail.com"><Mail size={14} /> info.bimtechitsolutions@gmail.com</a>
            <div className="social-links">
              <FacebookIcon size={14} />
              <InstagramIcon size={14} />
              <LinkedinIcon size={14} />
              <WhatsAppIcon size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-nav">
        <div className="container flex-between">
          <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
            <Cpu size={32} className="logo-icon" />
            <div className="logo-text">
              <span className="name">BIMTECH</span>
              <span className="sub">IT SOLUTIONS</span>
            </div>
          </Link>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            {isMobileMenuOpen && (
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">Menu</span>
                <button className="mobile-menu-close" onClick={closeMobileMenu}>
                  <X size={24} />
                </button>
              </div>
            )}
            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMobileMenu}>About Us</Link></li>
            <li><Link to="/services" onClick={closeMobileMenu}>Services</Link></li>
            <li><Link to="/amc-plans" onClick={closeMobileMenu}>AMC Plans</Link></li>
            <li><Link to="/products" onClick={closeMobileMenu}>Products</Link></li>
            <li><Link to="/gallery" onClick={closeMobileMenu}>Gallery</Link></li>
            <li><Link to="/testimonials" onClick={closeMobileMenu}>Testimonials</Link></li>
            <li><Link to="/support" onClick={closeMobileMenu}>Support</Link></li>
          </ul>

          <div className="nav-actions">
            <Link to="/contact" className="quote-btn" style={{ textDecoration: 'none' }}>Get a Quote</Link>
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <Menu size={28} color="#003399" />
            </button>
          </div>

          {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu}></div>}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
