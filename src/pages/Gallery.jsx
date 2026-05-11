import React from 'react';

import cctvInstallation from '../assets/cctv-installation.png';
import itSupport from '../assets/it-support.png';
import biometricSystem from '../assets/biometric-machines.webp';
import serverNetworking from '../assets/server-networking.png';
import intercomSetup from '../assets/intercom-setup.png';
import corporateWorkstation from '../assets/corporate-workstation.png';

const galleryItems = [
  { id: 1, image: cctvInstallation, title: 'CCTV Installation' },
  { id: 2, image: itSupport, title: 'IT Support Setup' },
  { id: 3, image: biometricSystem, title: 'Biometric System' },
  { id: 4, image: serverNetworking, title: 'Server Networking' },
  { id: 5, image: intercomSetup, title: 'Intercom Setup' },
  { id: 6, image: corporateWorkstation, title: 'Corporate Workstation' } 
];

const Gallery = () => {
  return (
    <div className="page-content" style={{ padding: '80px 0', minHeight: '60vh', background: '#f8f9fa' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ color: '#051937', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '15px' }}>Our Work Gallery</h1>
          <p style={{ color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            A glimpse into our successful installations and IT setups across various commercial and residential spaces.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                position: 'relative',
                borderRadius: '16px', 
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                aspectRatio: '1 / 1',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                e.currentTarget.querySelector('.overlay').style.opacity = '1';
                e.currentTarget.querySelector('h3').style.transform = 'translateY(0)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                e.currentTarget.querySelector('.overlay').style.opacity = '0';
                e.currentTarget.querySelector('h3').style.transform = 'translateY(20px)';
              }}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }} 
              />
              <div 
                className="overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(5, 25, 55, 0.9) 0%, rgba(5, 25, 55, 0.2) 50%, transparent 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '30px'
                }}
              >
                <h3 style={{ 
                  color: '#fff', 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  margin: 0,
                  transform: 'translateY(20px)',
                  transition: 'transform 0.3s ease'
                }}>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
