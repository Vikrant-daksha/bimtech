import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { client } from '../sanity/client';

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch('*[_type == "deal"]')
      .then(data => {
        setOffers(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const getIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.Zap;
    return <Icon className="text-orange-500" />;
  };

  if (loading) return null;
  return (
    <section className="offers-section" style={{ padding: '80px 0', background: '#f8f9fa' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="section-subtitle">SPECIAL OFFERS</span>
          <h2 className="section-title">Deals Just For You</h2>
          <div className="title-underline" style={{ margin: '0 auto' }}></div>
        </div>

        <div className="offers-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {offers.map((offer) => (
            <div key={offer._id} className="offer-card" style={{ 
              background: '#fff', 
              padding: '30px', 
              borderRadius: '12px', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid #f0f0f0'
            }}>
              <div className="offer-icon" style={{ 
                marginBottom: '20px',
                padding: '15px',
                background: '#f0f7ff',
                borderRadius: '50%',
                color: '#007bff'
              }}>
                {getIcon(offer.icon)}
              </div>
              <h3 style={{ marginBottom: '15px', color: '#051937' }}>{offer.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
