import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    client.fetch(`*[_type == "product"]{
      title,
      "slug": slug.current,
      description,
      models[]{
        modelName,
        image,
        specs
      }
    }`)
      .then(data => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return null;

    const term = searchTerm.toLowerCase();
    const results = [];

    products.forEach(product => {
      const categoryMatches = product.title.toLowerCase().includes(term);
      const matchingModels = (product.models || []).map((model, index) => ({ ...model, originalIndex: index }))
        .filter(model =>
          model.modelName?.toLowerCase().includes(term) || categoryMatches
        );

      if (matchingModels.length > 0) {
        results.push({
          category: product.title,
          slug: product.slug,
          models: matchingModels
        });
      }
    });

    return results;
  }, [searchTerm, products]);

  if (loading) return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading products...</div>;

  return (
    <div className="page-content" style={{ padding: '80px 0', minHeight: '60vh', background: '#fcfdff' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '15px', color: '#051937', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800' }}>Product Catalog</h1>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px auto' }}>
          Genuine hardware and security solutions for your business. Search by model name or category.
        </p>

        {/* Search Bar */}
        <div className="search-container" style={{ maxWidth: '600px', margin: '0 auto 50px auto', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search for models (e.g., ZKTeco, Barrier, Fingerprint)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '18px 25px 18px 55px',
              borderRadius: '50px',
              border: '2px solid #eee',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23aaa\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Ccircle cx=\'11\' cy=\'11\' r=\'8\'%3E%3C/circle%3E%3Cline x1=\'21\' y1=\'21\' x2=\'16.65\' y2=\'16.65\'%3E%3C/line%3E%3C/svg%3E") no-repeat 20px center'
            }}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#aaa',
                fontSize: '18px'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {!searchTerm ? (
          /* Original Category Grid */
          <div className="products-grid">
            {products.map((product, idx) => (
              <Link
                key={idx}
                to={`/product/${product.slug}`}
                className="product-card"
                style={{
                  textDecoration: 'none',
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  aspectRatio: '1/1',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  background: '#fff',
                  display: 'block',
                  border: '1px solid #f0f0f0',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.04)'; }}
              >
                <div style={{ width: '100%', height: '100%', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {product.models?.find(m => m.image)?.image ? (
                    <img
                      src={urlFor(product.models.find(m => m.image).image).url()}
                      alt={product.title}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <div style={{ color: '#eee', fontSize: '60px' }}>📦</div>
                  )}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: 'linear-gradient(to top, rgba(5,25,55,0.9) 0%, rgba(5,25,55,0.4) 70%, transparent 100%)',
                    padding: '30px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: '60%'
                  }}
                >
                  <h3 style={{ margin: '0', color: 'white', fontSize: '22px', fontWeight: '700', letterSpacing: '0.5px' }}>
                    {product.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '5px' }}>View Models & Specs</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Grouped Search Results */
          <div className="search-results">
            {filteredResults.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p style={{ fontSize: '20px' }}>No models found matching "<strong>{searchTerm}</strong>"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  style={{ background: 'none', border: 'none', color: '#4776E6', cursor: 'pointer', textDecoration: 'underline', marginTop: '10px' }}
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredResults.map((group, gIdx) => (
                <div key={gIdx} className="search-group" style={{ marginBottom: '60px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '25px',
                    borderBottom: '1px solid #eee',
                    paddingBottom: '10px'
                  }}>
                    <h2 style={{
                      fontSize: '24px',
                      color: '#051937',
                      margin: '0',
                      fontWeight: '700'
                    }}>
                      {group.category}
                    </h2>
                    <span style={{
                      background: '#eef2ff',
                      color: '#4776E6',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}>
                      {group.models.length} {group.models.length === 1 ? 'Model' : 'Models'}
                    </span>
                  </div>

                  <div className="results-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '25px'
                  }}>
                    {group.models.map((model, mIdx) => (
                      <Link
                        key={mIdx}
                        to={`/product/${group.slug}?model=${model.originalIndex}`}
                        className="model-result-card"
                        style={{
                          textDecoration: 'none',
                          background: '#fff',
                          borderRadius: '16px',
                          padding: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '30px',
                          border: '1px solid #f0f0f0',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                          const title = e.currentTarget.querySelector('h4');
                          if (title) title.style.color = '#000';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
                          const title = e.currentTarget.querySelector('h4');
                          if (title) title.style.color = '#9b9b9bff';
                        }}
                      >
                        <div style={{
                          width: '120px',
                          height: '120px',
                          flexShrink: 0,
                          background: '#f9f9f9',
                          borderRadius: '12px',
                          padding: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {model.image ? (
                            <img src={urlFor(model.image).url()} alt={model.modelName} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          ) : (
                            <div style={{ fontSize: '36px' }}>📦</div>
                          )}
                        </div>
                        <div>
                          <h4 style={{ margin: '0', color: '#9b9b9bff', fontSize: '22px', fontWeight: '500' }}>{model.modelName}</h4>
                          {/* Category label removed for cleaner UI */}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

