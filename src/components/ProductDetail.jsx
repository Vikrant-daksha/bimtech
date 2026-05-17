import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, MessageSquare, ShieldCheck, Zap, Info, Trash2, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';
import { client, urlFor } from '../sanity/client';

// Add global styles for animations and responsive layout
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 800px) {
    .hero-header {
      display: none !important;
    }
    
    .sticky-container {
      position: static !important;
    }
    
    .model-selector-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 30px;
    }
    
    .model-selector-container {
      display: flex;
      gap: 15px;
      overflow-x: auto;
      scroll-behavior: smooth;
      flex-wrap: nowrap !important;
      padding-bottom: 10px;
      -ms-overflow-style: none;
      scrollbar-width: none;
      width: 100%;
    }
    
    .model-selector-container::-webkit-scrollbar {
      display: none;
    }

    .model-btn {
      white-space: nowrap;
      flex-shrink: 0;
    }

    .scroll-arrow {
      display: flex !important;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: white;
      border: 1px solid #eee;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 10;
      color: #333;
    }
    
    .scroll-arrow.left { left: -10px; }
    .scroll-arrow.right { right: -10px; }

    /* Better solution for compare table on mobile */
    .compare-table thead tr {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: transparent !important;
    }
    .compare-table thead th {
      width: 100% !important;
      border: none !important;
      padding: 10px 0 !important;
    }
    .compare-table thead th:first-child {
      display: none; /* Hide 'Technical Feature' text */
    }
    
    .compare-table tbody {
      display: block;
      margin-top: 20px;
    }
    .compare-table tbody tr {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      border: 1px solid #eee;
      border-radius: 12px;
      padding: 0;
      overflow: hidden;
    }
    .compare-table tbody td {
      width: 100% !important;
      display: flex;
      justify-content: space-between;
      text-align: right !important;
      padding: 15px !important;
      border-bottom: 1px solid #f9f9f9 !important;
      border-right: none !important;
      box-sizing: border-box;
      max-width: none !important;
    }
    .compare-table tbody td:first-child {
      justify-content: center;
      background: #f8f9fa;
      font-weight: 700 !important;
      text-align: center !important;
      color: #051937 !important;
    }
    .compare-table tbody td:not(:first-child):before {
      content: attr(data-model);
      color: #888;
      font-weight: 600;
      text-align: left;
      margin-right: 15px;
    }
  }

  @media (min-width: 801px) {
    .scroll-arrow {
      display: none !important;
    }
  }
`;
document.head.appendChild(styleSheet);

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [compareId1, setCompareId1] = useState(null);
  const [compareId2, setCompareId2] = useState(null);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const scrollContainerRef = React.useRef(null);

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

  const { search } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(search);
    const modelParam = params.get('model');
    if (modelParam !== null && product?.models) {
      const idx = parseInt(modelParam);
      if (!isNaN(idx) && idx >= 0 && idx < product.models.length) {
        setSelectedModelIndex(idx);
      }
    }
  }, [search, product]);

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
    const message = encodeURIComponent(`Hi! I'm interested in the ${product.title} - ${selectedModel.modelName}. Could you please share the current market price and availability?`);
    window.open(`https://wa.me/${CONTACT_NUMBER}?text=${message}`, '_blank');
  };

  // Logic to get all unique spec labels across all models for comparison
  const allSpecLabels = Array.from(new Set(
    product.models?.flatMap(m => m.specs?.map(s => s.label) || [])
  )).filter(Boolean);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  return (
    <div className="product-detail-page" style={{ background: '#fcfdff', minHeight: '100vh' }}>
      {/* Hero Header */}
      <div className="hero-header" style={{
        background: 'linear-gradient(135deg, #051937 0%, #004d7a 100%)',
        padding: '50px 0 60px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container" style={{ padding: '0px' }}>
          <Link to="/products" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '15px', fontSize: '14px', fontWeight: '500' }}>
            <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Catalog
          </Link>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '10px', fontWeight: '800' }}>{product.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>{product.description}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'start' }}>

          {/* Left: Image Showcase */}
          <div className="sticky-container" style={{ position: 'sticky', top: '100px' }}>
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
            <div className="model-selector-wrapper" style={{ marginTop: '30px' }}>
              <button className="scroll-arrow left" onClick={scrollLeft} aria-label="Scroll left">
                <ChevronLeft size={20} />
              </button>
              <div
                className="model-selector-container"
                ref={scrollContainerRef}
                style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', padding: '0px 30px' }}
              >
                {product.models?.map((m, idx) => (
                  <button
                    key={idx}
                    className="model-btn"
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
              <button className="scroll-arrow right" onClick={scrollRight} aria-label="Scroll right">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right: Info & Specs */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <span style={{
                color: '#0252a8ff',

                fontSize: '18px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '4px'
              }}>
                Model
              </span>
              <h2 style={{ fontSize: '36px', color: '#051937', marginTop: '15px', marginBottom: '20px' }}>{selectedModel?.modelName}</h2>

              {/* Specs List */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '20px', color: '#051937', margin: '10px 0px 20px 5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Info size={20} color="#007bff" /> Technical Specifications
                </h3>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                  {selectedModel?.specs?.map((spec, i) => (
                    <li key={i} style={{
                      padding: '12px 0',
                      borderBottom: i === selectedModel.specs.length - 1 ? 'none' : '1px solid #f0f0f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '24px',
                      fontSize: '16px'
                    }}>
                      <span style={{ color: '#888', flexShrink: 0 }}>{spec.label}</span>
                      <span style={{ color: '#333', fontWeight: '600', textAlign: 'right' }}>{spec.value}</span>
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
              <h3 style={{ fontSize: '20px', color: '#1a1a1a', marginBottom: '10px' }}>Contact for Model Price</h3>
              <p style={{ color: '#666', marginBottom: '25px', fontSize: '15px' }}>Click the button below to get the latest price for this model.</p>

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

        {/* Comparison Section */}
        {product.models?.length > 1 && (
          <div style={{ marginTop: '100px', borderTop: '2px solid #eee', paddingTop: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: '36px', color: '#051937', marginBottom: '15px', fontWeight: '800' }}>Compare Models</h2>
              <p style={{ color: '#666', fontSize: '18px' }}>Select any two models to see their technical differences side-by-side.</p>
            </div>

            {/* Comparison Selectors (Integrated in Table) */}
            <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', overflow: 'visible' }}>
              <table className="compare-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '25px 30px', textAlign: 'left', width: '30%', color: '#888', fontWeight: '600', borderBottom: '2px solid #eee' }}>Technical Feature</th>
                    {[1, 2].map(num => {
                      const currentId = num === 1 ? compareId1 : compareId2;
                      const setFunc = num === 1 ? setCompareId1 : setCompareId2;
                      const otherId = num === 1 ? compareId2 : compareId1;
                      const isOpen = num === 1 ? showDropdown1 : showDropdown2;
                      const setOpen = num === 1 ? setShowDropdown1 : setShowDropdown2;

                      return (
                        <th key={num} style={{ padding: '20px', textAlign: 'center', borderBottom: '2px solid #eee', background: '#fff', position: 'relative', width: '35%', zIndex: isOpen ? 50 : 1 }}>
                          <div style={{ display: 'flex', gap: '0', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                            <div style={{ position: 'relative', width: '100%', maxWidth: '200px', zIndex: isOpen ? 50 : 10 }}>
                              <div
                                onClick={() => setOpen(!isOpen)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '10px 15px',
                                  borderRadius: currentId !== null ? '10px 0 0 10px' : '10px',
                                  border: '1px solid #eee',
                                  borderRight: currentId !== null ? 'none' : '1px solid #eee',
                                  background: '#f8f9fa',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <span style={{
                                  fontSize: '13px',
                                  fontWeight: '700',
                                  color: currentId === null ? '#aaa' : '#051937',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}>
                                  {currentId !== null ? product.models[currentId].modelName : `Select Model ${num}`}
                                </span>
                                <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.3s', color: '#888' }} />
                              </div>

                              {/* Dropdown Menu */}
                              {isOpen && (
                                <div style={{
                                  position: 'absolute',
                                  top: '100%',
                                  left: '0',
                                  right: '0',
                                  zIndex: '100',
                                  background: '#fff',
                                  borderRadius: '10px',
                                  marginTop: '5px',
                                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                  border: '1px solid #f0f0f0',
                                  maxHeight: '250px',
                                  overflowY: 'auto',
                                  animation: 'slideDown 0.3s ease forwards'
                                }}>
                                  {product.models.map((m, idx) => (
                                    <div
                                      key={idx}
                                      onClick={() => {
                                        setFunc(idx);
                                        setOpen(false);
                                      }}
                                      style={{
                                        padding: '10px 15px',
                                        textAlign: 'left',
                                        fontSize: '12px',
                                        color: idx === otherId ? '#ccc' : '#333',
                                        fontWeight: '600',
                                        cursor: idx === otherId ? 'not-allowed' : 'pointer',
                                        background: currentId === idx ? '#f0f7ff' : 'transparent',
                                        borderBottom: '1px solid #f9f9f9'
                                      }}
                                      onMouseOver={(e) => { if (idx !== otherId) e.currentTarget.style.background = '#f8f9fa'; }}
                                      onMouseOut={(e) => { if (idx !== otherId) e.currentTarget.style.background = currentId === idx ? '#f0f7ff' : 'transparent'; }}
                                    >
                                      {m.modelName}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFunc(null);
                              }}
                              style={{
                                background: '#ff4d4d',
                                border: '1px solid #ff4d4d',
                                borderRadius: '0 10px 10px 0',
                                width: currentId !== null ? '40px' : '0',
                                height: '38px', // Match the height of the dropdown
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#fff',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: currentId !== null ? 1 : 0,
                                transform: currentId !== null ? 'translateX(0)' : 'translateX(-40px)',
                                overflow: 'hidden',
                                boxShadow: '0 4px 10px rgba(255, 77, 77, 0.2)',
                                zIndex: 5,
                                marginLeft: currentId !== null ? '0' : '-40px'
                              }}
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {(compareId1 === null && compareId2 === null) ? (
                    <tr>
                      <td colSpan="3" style={{ padding: '100px 0', textAlign: 'center', color: '#888', fontSize: '18px' }}>
                        Pick two models from the dropdowns above to compare specs.
                      </td>
                    </tr>
                  ) : (
                    allSpecLabels.filter(label => {
                      const val1 = compareId1 !== null ? (product.models[compareId1].specs?.find(s => s.label === label)?.value || "—") : "—";
                      const val2 = compareId2 !== null ? (product.models[compareId2].specs?.find(s => s.label === label)?.value || "—") : "—";
                      return val1 !== "—" || val2 !== "—";
                    }).map((label, i) => {
                      const val1 = compareId1 !== null ? (product.models[compareId1].specs?.find(s => s.label === label)?.value || "—") : "—";
                      const val2 = compareId2 !== null ? (product.models[compareId2].specs?.find(s => s.label === label)?.value || "—") : "—";
                      const isDifferent = compareId1 !== null && compareId2 !== null && val1 !== val2;

                      return (
                        <tr key={i} style={{
                          background: 'transparent',
                          transition: 'background 0.3s ease'
                        }}>
                          <td style={{ padding: '18px 30px', color: '#666', fontWeight: '600', borderBottom: '1px solid #f0f0f0', fontSize: '15px' }}>{label}</td>
                          <td data-model={compareId1 !== null ? product.models[compareId1].modelName : "Model 1"} style={{
                            padding: '18px 30px',
                            textAlign: 'center',
                            color: val1 === "—" ? '#ccc' : '#333',
                            fontWeight: '500',
                            borderBottom: '1px solid #f0f0f0',
                            borderRight: '1px solid #f9f9f9',
                            fontSize: '15px',
                            maxWidth: '250px',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal'
                          }}>
                            {val1}
                          </td>
                          <td data-model={compareId2 !== null ? product.models[compareId2].modelName : "Model 2"} style={{
                            padding: '18px 30px',
                            textAlign: 'center',
                            color: val2 === "—" ? '#ccc' : '#333',
                            fontWeight: '500',
                            borderBottom: '1px solid #f0f0f0',
                            fontSize: '15px',
                            maxWidth: '250px',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal'
                          }}>
                            {val2}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <p style={{ textAlign: 'center', marginTop: '30px', color: '#888', fontSize: '14px', fontStyle: 'italic' }}>
              Compare technical specifications side-by-side.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
