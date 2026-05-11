import React from 'react';
import { Phone, ShieldCheck, Users, BadgePercent, Clock4 } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';
import heroCctv from '../assets/hero-cctv.png';

const Hero = () => {
  return (
    <section className="hero-section full-width">
      <div className="hero-flex-container">
        {/* Left Content */}
        <div className="hero-content-left">
          <span className="hero-subtitle">BIMTECH IT SOLUTIONS</span>
          <h1 className="hero-title">Reliable & Affordable IT Solutions for Your Home & Business</h1>
          <p className="hero-desc">
            CCTV | Laptop & Desktop Repair | Attendance Machine | Intercom | Networking<br />
            Professional service and affordable pricing for all your IT needs.
          </p>

          <div className="hero-btns">
            <a href="tel:+918169670476" className="btn-call">
              <Phone size={18} fill="currentColor" /> Call Now
            </a>
            <a href="https://wa.me/918169670476" className="btn-whatsapp">
              <WhatsAppIcon size={20} /> WhatsApp Us
            </a>
          </div>

          <div className="hero-features-grid">
            <div className="feature-item">
              <ShieldCheck className="feature-icon" size={24} />
              <div className="feature-text">
                <strong>Trusted Service</strong>
                <span>100% Satisfaction</span>
              </div>
            </div>
            <div className="feature-item">
              <Users className="feature-icon" size={24} />
              <div className="feature-text">
                <strong>Professional Team</strong>
                <span>Expert Staff</span>
              </div>
            </div>
            <div className="feature-item">
              <BadgePercent className="feature-icon" size={24} />
              <div className="feature-text">
                <strong>Best Pricing</strong>
                <span>Affordable Rates</span>
              </div>
            </div>
            <div className="feature-item">
              <Clock4 className="feature-icon" size={24} />
              <div className="feature-text">
                <strong>Quick Support</strong>
                <span>24/7 Reliable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Full Image */}
        <div className="hero-image-right">
          <img src={heroCctv} alt="CCTV Security" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
