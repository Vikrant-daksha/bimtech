import React from 'react';

const Offers = () => {
  const offers = [
    { title: "Limited Time Offers", desc: "Special discounts running currently.", icon: "🔥" },
    { title: "CCTV Installation Discount", desc: "Get a flat discount on all new CCTV installation setups.", icon: "🔥" },
    { title: "Computer AMC Offers", desc: "Special pricing for bulk computer Annual Maintenance Contracts.", icon: "🔥" },
    { title: "0% Down Payment", desc: "Available on Selected Products.", icon: "🔥" }
  ];

  return (
    <div className="page-content" style={{ padding: '120px 0', minHeight: '60vh' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '50px', color: '#051937' }}>Special Offers</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
          {offers.map((offer, idx) => (
            <div key={idx} style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #fee2e2' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>{offer.icon}</div>
              <h3 style={{ color: '#cc0000', marginBottom: '15px' }}>{offer.title}</h3>
              <p style={{ color: '#555', fontSize: '16px' }}>{offer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
