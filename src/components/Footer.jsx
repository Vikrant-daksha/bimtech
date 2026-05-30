import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe, Cpu } from 'lucide-react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './SocialIcons';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-col">
            <div className="footer-logo">
              <Cpu size={32} className="logo-icon" />
              <div className="logo-text">
                <span className="name">BIMTECH</span>
                <span className="sub">IT SOLUTIONS</span>
              </div>
            </div>
            <p className="footer-desc">
              BIMTECH IT SOLUTIONS – Your Trusted IT Partner. We provide complete IT and security solutions 
              with professional service and affordable pricing.
            </p>
            <div className="social-circles">
              <div className="circle fb"><FacebookIcon size={16} /></div>
              <div className="circle ig"><InstagramIcon size={16} /></div>
              <a href="https://wa.me/918169670476" className="circle wa"><WhatsAppIcon size={16} /></a>
              <div className="circle gl"><Globe size={16} /></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/amc-plans">AMC Plans</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Our Services</h3>
            <ul>
              <li><Link to="/service/cctv-installation">CCTV Installation</Link></li>
              <li><Link to="/service/boom-barrier-system">Boom Barrier System</Link></li>
              <li><Link to="/service/interactive-panel-solutions">Interactive Panels</Link></li>
              <li><Link to="/service/digital-signage-solutions">Digital Signage</Link></li>
              <li><Link to="/service/intercom-system">Intercom System</Link></li>
              <li><Link to="/service/attendance-system">Attendance System</Link></li>
              <li><Link to="/service/networking-services">Networking Solutions</Link></li>
              <li><Link to="/service/laptop-repair">Computer &amp; Laptop Services</Link></li>
              <li><Link to="/service/amc-maintenance">AMC Services</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="footer-col hide-mobile">
            <h3>Contact Us</h3>
            <div className="contact-item">
              <Phone size={18} />
              <div>
                <p>+91 81696 70476</p>
                <p>+91 88882 42029</p>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <p>info.bimtechitsolutions@gmail.com</p>
            </div>
            <div className="contact-item">
              <MapPin size={18} />
              <p>F-702, Rashmi Heights, New Link Road, Nalasopara East, Mumbai, Palghar, Vasai – 401209</p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="footer-col map-col hide-mobile">
            <div className="map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.535697669527!2d72.825!3d19.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzEyLjAiTiA3MsKwNDknMzAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="150" 
                style={{ border: 0, borderRadius: '8px' }} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Maps"
              ></iframe>
              <div className="map-info">
                <strong>BIMTECH IT SOLUTIONS</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <p style={{ fontWeight: 'bold' }}>Services Available Across Mumbai, Vasai, Virar & Nalasopara.</p>
          <p>© 2026 BIMTECH IT SOLUTIONS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
