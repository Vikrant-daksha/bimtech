import React, { useState } from 'react';
import { Wrench, ShieldCheck, FileWarning, CalendarCheck, AlertCircle } from 'lucide-react';
import { WhatsAppIcon } from '../components/SocialIcons';

const Support = () => {
  const [selectedRequest, setSelectedRequest] = useState("");

  const supportItems = [
    { name: "Technical Support", icon: Wrench },
    { name: "AMC Support Request", icon: ShieldCheck },
    { name: "Complaint Registration", icon: FileWarning },
    { name: "Service Booking", icon: CalendarCheck },
    { name: "Emergency Visit", icon: AlertCircle },
    { name: "Online Inquiry", icon: WhatsAppIcon }
  ];

  return (
    <div className="page-content" style={{ padding: '80px 0', minHeight: '60vh', background: '#f4f7f6' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ color: '#051937', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '15px' }}>Support Services</h1>
          <p style={{ color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            We're here to help. Select a service category or submit a direct request below for immediate assistance.
          </p>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Support Categories Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '60px' }}>
            {supportItems.map((item, idx) => {
              const isActive = selectedRequest === item.name;
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedRequest(item.name)}
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #0080ff 0%, #004797 100%)' : '#fff',
                    padding: '30px',
                    borderRadius: '16px',
                    boxShadow: isActive ? '0 15px 35px rgba(0, 123, 255, 0.2)' : '0 10px 30px rgba(0,0,0,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    transform: isActive ? 'translateY(-5px)' : 'translateY(0)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 123, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)';
                    }
                  }}
                >
                  <div style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : '#f0f5ff',
                    padding: '15px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComp size={32} color={isActive ? "#fff" : "#007bff"} />
                  </div>
                  <span style={{ fontWeight: '700', color: isActive ? '#fff' : '#051937', fontSize: '18px' }}>
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Support Form */}
          <div style={{ background: '#fff', padding: '50px', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h3 style={{ fontSize: '28px', color: '#051937', marginBottom: '10px' }}>Submit a Ticket</h3>
              <p style={{ color: '#666' }}>Our support team typically responds within 2 hours.</p>
            </div>

            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Your Name</label>
                <input type="text" placeholder="your name..." style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e0e0e0', width: '100%', fontSize: '16px', boxSizing: 'border-box', background: '#f9fafb' }} />
              </div>
              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Phone Number</label>
                <input type="tel" placeholder="+91 0000000000" style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e0e0e0', width: '100%', fontSize: '16px', boxSizing: 'border-box', background: '#f9fafb' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Request Type</label>
                <select
                  value={selectedRequest}
                  onChange={(e) => setSelectedRequest(e.target.value)}
                  style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e0e0e0', width: '100%', fontSize: '16px', boxSizing: 'border-box', background: '#f9fafb', color: '#333', cursor: 'pointer', appearance: 'none' }}
                >
                  <option value="" disabled>Select an option...</option>
                  {supportItems.map((item, idx) => <option key={idx} value={item.name}>{item.name}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Issue Description</label>
                <textarea placeholder="Please provide details about your problem or request..." rows="5" style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e0e0e0', width: '100%', fontSize: '16px', boxSizing: 'border-box', background: '#f9fafb', resize: 'vertical' }}></textarea>
              </div>
              <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                <button type="button" style={{
                  padding: '18px 30px',
                  background: 'linear-gradient(135deg, #0080ff 0%, #004797 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  cursor: 'pointer',
                  width: '100%',
                  boxShadow: '0 6px 15px rgba(0, 123, 255, 0.3)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 123, 255, 0.4)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 123, 255, 0.3)'; }}
                >
                  Submit Support Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
