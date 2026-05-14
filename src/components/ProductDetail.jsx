import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, ShieldCheck, Zap, Info } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';
import { client, urlFor } from '../sanity/client';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);

  const CONTACT_NUMBER = "918169670476";

  useEffect(() => {
    client.fetch(`*[_type == "product" && slug.current == $id][0]`, { id })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#666' }}>Gathering product details...</div>;

  if (!product) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', color: '#051937' }}>Product Not Found</h2>
        <Link to="/products" className="btn-primary" style={{ display: 'inline-flex', marginTop: '20px', padding: '12px 24px', backgroundColor: '#007bff', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>Explore Other Products</Link>
      </div>
    );
  }

  const selectedModel = product.models?.[selectedModelIndex];

  const handleWhatsAppQuery = () => {
    const message = encodeURIComponent(`Hi BIMTECH! I'm interested in the ${product.title} - ${selectedModel.modelName}. Could you please share the current market price and availability?`);
    window.open(`https://wa.me/${CONTACT_NUMBER}?text=${message}`, '_blank');
  };

  // Logic to get all unique spec labels across all models for comparison
  const allSpecLabels = Array.from(new Set(
    product.models?.flatMap(m => m.specs?.map(s => s.label) || [])
  )).filter(Boolean);

  return (
    <div className="product-detail-page" style={{ background: '#fcfdff', minHeight: '100vh' }}>
      {/* Hero Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #051937 0%, #004d7a 100%)',
        padding: '100px 0 60px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container" style={{ padding: '0 20px' }}>
          <Link to="/products" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '30px', fontSize: '14px', fontWeight: '500' }}>
            <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Catalog
          </Link>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '15px', fontWeight: '800' }}>{product.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>{product.description}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'start' }}>
          
          {/* Left: Image Showcase */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ 
              background: '#fff', 
              borderRadius: '24px', 
              padding: '40px', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '4/3',
              overflow: 'hidden'
            }}>
              {selectedModel?.image ? (
                <img 
                  src={urlFor(selectedModel.image).url()} 
                  alt={selectedModel.modelName} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'all 0.5s ease' }} 
                />
              ) : (
                <div style={{ color: '#ccc' }}>Image coming soon</div>
              )}
            </div>
            
            {/* Model Selector Thumbnails */}
            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {product.models?.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedModelIndex(idx)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    border: selectedModelIndex === idx ? '2px solid #007bff' : '2px solid #eee',
                    background: selectedModelIndex === idx ? '#f0f7ff' : '#fff',
                    color: selectedModelIndex === idx ? '#007bff' : '#666',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedModelIndex === idx ? '0 5px 15px rgba(0,123,255,0.1)' : 'none'
                  }}
                >
                  {m.modelName}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info & Specs */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <span style={{ 
                background: '#e7f3ff', 
                color: '#007bff', 
                padding: '6px 12px', 
                borderRadius: '6px', 
                fontSize: '14px', 
                fontWeight: '700', 
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Selected Model
              </span>
              <h2 style={{ fontSize: '36px', color: '#051937', marginTop: '15px', marginBottom: '20px' }}>{selectedModel?.modelName}</h2>
              
              <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#28a745', fontWeight: '500' }}>
                  <ShieldCheck size={18} /> Genuine Parts
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fd7e14', fontWeight: '500' }}>
                  <Zap size={18} /> Best Service
                </div>
              </div>

              {/* Specs List */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '20px', color: '#051937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Info size={20} color="#007bff" /> Technical Specifications
                </h3>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                  {selectedModel?.specs?.map((spec, i) => (
                    <li key={i} style={{ 
                      padding: '12px 0', 
                      borderBottom: i === selectedModel.specs.length - 1 ? 'none' : '1px solid #f0f0f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '16px'
                    }}>
                      <span style={{ color: '#888' }}>{spec.label}</span>
                      <span style={{ color: '#333', fontWeight: '600' }}>{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div style={{ 
              background: 'rgba(37, 211, 102, 0.05)', 
              border: '1px solid rgba(37, 211, 102, 0.2)', 
              borderRadius: '20px', 
              padding: '30px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '20px', color: '#1a1a1a', marginBottom: '10px' }}>Interested in this model?</h3>
              <p style={{ color: '#666', marginBottom: '25px', fontSize: '15px' }}>Pricing is subject to market rates. Send us a quick query to get the latest quote.</p>
              
              <button 
                onClick={handleWhatsAppQuery}
                style={{ 
                  width: '100%', 
                  padding: '18px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  background: '#25d366', 
                  color: '#fff', 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '12px', 
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 10px 20px rgba(37, 211, 102, 0.2)'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(37, 211, 102, 0.3)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(37, 211, 102, 0.2)'; }}
              >
                <WhatsAppIcon size={24} />
                Enquire via WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Table Section (Only if 2+ models) */}
        {product.models?.length > 1 && (
          <div style={{ marginTop: '100px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '32px', color: '#051937', marginBottom: '50px' }}>Compare Models</h2>
            <div style={{ overflowX: 'auto', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', background: '#fff' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '30px', textAlign: 'left', background: '#f8f9fa', color: '#888', fontWeight: '600', borderBottom: '1px solid #eee' }}>Specifications</th>
                    {product.models.map((m, idx) => (
                      <th key={idx} style={{ 
                        padding: '30px', 
                        textAlign: 'center', 
                        background: selectedModelIndex === idx ? '#f0f7ff' : '#f8f9fa', 
                        color: '#051937', 
                        fontWeight: '700',
                        fontSize: '18px',
                        borderBottom: '1px solid #eee'
                      }}>
                        {m.modelName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allSpecLabels.map((label, i) => (
                    <tr key={i}>
                      <td style={{ padding: '20px 30px', color: '#666', fontWeight: '500', borderBottom: '1px solid #f0f0f0' }}>{label}</td>
                      {product.models.map((m, idx) => {
                        const specValue = m.specs?.find(s => s.label === label)?.value || "—";
                        return (
                          <td key={idx} style={{ 
                            padding: '20px 30px', 
                            textAlign: 'center', 
                            color: specValue === "—" ? '#ccc' : '#333', 
                            fontWeight: specValue === "—" ? '400' : '600',
                            borderBottom: '1px solid #f0f0f0',
                            background: selectedModelIndex === idx ? 'rgba(0,123,255,0.02)' : 'transparent'
                          }}>
                            {specValue}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
