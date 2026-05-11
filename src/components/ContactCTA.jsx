import React from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';

const ContactCTA = () => {
  return (
    <section className="contact-cta-bar">
      <div className="container">
        <div className="cta-flex">
          <div className="cta-item phone-cta">
            <div className="cta-icon-circle blue-circle">
              <Phone fill="white" size={24} />
            </div>
            <div className="cta-text">
              <h3>Need Help? We Are Here!</h3>
              <p>Call or WhatsApp us for fast support</p>
              <a href="tel:+918169670476" className="cta-number">+91 81696 70476</a>
            </div>
          </div>
          
          <div className="cta-divider"></div>
          
          <div className="cta-item whatsapp-cta">
            <div className="cta-icon-circle green-circle">
              <WhatsAppIcon size={24} />
            </div>
            <div className="cta-text">
              <h3>Chat on WhatsApp</h3>
              <p>Get instant reply</p>
              <a href="https://wa.me/918169670476" target="_blank" rel="noopener noreferrer" className="chat-now-btn">
                Chat Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
