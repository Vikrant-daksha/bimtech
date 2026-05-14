import React, { useState, useEffect } from 'react';
import { client } from '../sanity/client';

const AMCPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch('*[_type == "amcPlan"] | order(price asc)')
      .then(data => {
        setPlans(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return null;

  return (
    <div className="page-content" style={{ padding: '120px 0', minHeight: '60vh' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '50px', color: '#051937' }}>CCTV AMC Plans</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{ border: `2px solid ${plan.color}`, borderRadius: '12px', overflow: 'hidden', textAlign: 'center' }}>
              <div style={{ background: plan.color, color: '#fff', padding: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '24px' }}>{plan.title}</h2>
              </div>
              <div style={{ padding: '30px' }}>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: '15px', fontSize: '18px', color: '#444' }}>{feature}</li>
                  ))}
                </ul>
                <button style={{ marginTop: '30px', padding: '12px 24px', background: plan.color, color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AMCPlans;
