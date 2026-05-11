import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, Globe, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../components/SocialIcons';

const Contact = () => {
  return (
    <div className="contact-page" style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', overflow: 'hidden' }}>

      {/* --- HERO HEADER --- */}
      <section style={{
        padding: '50px 0 20px',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: '800',
            lineHeight: '1.1',
            color: '#020617',
            letterSpacing: '-2px'
          }}>
            <span style={{
              background: 'linear-gradient(to right, #003399, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Contact Us</span>
          </h1>
        </div>
      </section>

      {/* --- CONTACT INFO GRID --- */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {/* Phone Info */}
            <div className="contact-card-hover" style={{
              padding: '40px',
              borderRadius: '24px',
              background: '#fff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: '#f0f5ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '25px'
              }}>
                <Phone size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>Phone Support</h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Available Mon-Sat, 9am - 7pm</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="tel:+918169670476" style={{ color: '#0f172a', fontWeight: '600', textDecoration: 'none', fontSize: '18px' }}>+91 81696 70476</a>
                <a href="tel:+918888242029" style={{ color: '#0f172a', fontWeight: '600', textDecoration: 'none', fontSize: '18px' }}>+91 88882 42029</a>
              </div>
            </div>

            {/* Email Info */}
            <div className="contact-card-hover" style={{
              padding: '40px',
              borderRadius: '24px',
              background: '#fff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: '#f0fdf4',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '25px'
              }}>
                <Mail size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>Email Address</h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Expect a reply within 2 hours</p>
              <a href="mailto:info.bimtechitsolutions@gmail.com" style={{ color: '#0f172a', fontWeight: '600', textDecoration: 'none', fontSize: '16px', wordBreak: 'break-all' }}>
                info.bimtechitsolutions@gmail.com
              </a>
            </div>

            {/* Location Info */}
            <div className="contact-card-hover" style={{
              padding: '40px',
              borderRadius: '24px',
              background: '#fff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: '#fff7ed',
                color: '#ea580c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '25px'
              }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>Visit Our Office</h3>
              <p style={{ color: '#64748b', lineHeight: '1.5' }}>
                F-702, Rashmi Heights, New Link Road, Nalasopara East, Mumbai, Palghar – 401209
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT: FORM & MAP --- */}
      <section style={{ padding: '60px 0 120px', background: '#f8fafc' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '50px',
            alignItems: 'start'
          }}>

            {/* Contact Form */}
            <div style={{
              background: '#ffffff',
              padding: '50px',
              borderRadius: '32px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>Send us a Message</h2>
                <p style={{ color: '#64748b' }}>Complete the form below and an expert will reach out to you.</p>
              </div>

              <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '14px' }}>Full Name</label>
                  <input type="text" placeholder="John Doe" style={inputStyle} />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '14px' }}>Phone Number</label>
                  <input type="tel" placeholder="+91 00000 00000" style={inputStyle} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '14px' }}>Email Address</label>
                  <input type="email" placeholder="john@company.com" style={inputStyle} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '14px' }}>Service Interested In</label>
                  <select style={inputStyle}>
                    <option>CCTV Installation</option>
                    <option>IT & Networking</option>
                    <option>Laptop/Desktop Repair</option>
                    <option>Biometric & Attendance</option>
                    <option>Intercom Systems</option>
                    <option>Other Inquiry</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '600', fontSize: '14px' }}>Your Message</label>
                  <textarea placeholder="How can we help you?" rows="4" style={inputStyle}></textarea>
                </div>
                <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                  <button type="button" style={{
                    padding: '18px 30px',
                    background: 'linear-gradient(135deg, #003399 0%, #001f5c 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '18px',
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 10px 20px rgba(0, 51, 153, 0.2)',
                    transition: 'all 0.3s ease'
                  }}>
                    <Send size={20} /> Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Map & Meta Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{
                borderRadius: '32px',
                overflow: 'hidden',
                height: '400px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.535697669527!2d72.825!3d19.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzEyLjAiTiA3MsKwNDknMzAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="BIMTECH Location"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

const inputStyle = {
  padding: '16px',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  width: '100%',
  fontSize: '16px',
  boxSizing: 'border-box',
  background: '#f8fafc',
  color: '#0f172a',
  outline: 'none',
  transition: 'border-color 0.3s ease'
};

export default Contact;
