import React from 'react';
import { Tag, Zap, Percent, ShieldCheck } from 'lucide-react';

const offers = [
  {
    icon: <Zap className="text-orange-500" />,
    title: "Limited Time Offers",
    desc: "Grab exciting discounts on CCTV kits and laptop repairs this month!"
  },
  {
    icon: <ShieldCheck className="text-blue-500" />,
    title: "Free Installation",
    desc: "Available on selected CCTV products and office networking setups."
  },
  {
    icon: <Percent className="text-green-500" />,
    title: "0% Down Payment",
    desc: "Easy EMI options available via Bajaj Finance for all your tech upgrades."
  }
];

const SpecialOffers = () => {
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
          {offers.map((offer, index) => (
            <div key={index} className="offer-card" style={{ 
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
                {offer.icon}
              </div>
              <h3 style={{ marginBottom: '15px', color: '#051937' }}>{offer.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>{offer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
