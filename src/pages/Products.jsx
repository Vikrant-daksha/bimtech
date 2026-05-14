import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(`*[_type == "product"]{
      title,
      "slug": slug.current,
      description,
      "image": models[0].image
    }`)
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading products...</div>;

  return (
    <div className="page-content" style={{ padding: '80px 0', minHeight: '60vh', background: '#fcfdff' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '15px', color: '#051937', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800' }}>Product Catalog</h1>
        <p style={{ textAlign: 'center', marginBottom: '50px', color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto 50px auto' }}>
          Genuine hardware and security solutions for your business. Select a category to see available models.
        </p>

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
                {product.image ? (
                  <img
                    src={urlFor(product.image).url()}
                    alt={product.title}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <div style={{ color: '#eee', fontSize: '40px' }}>📦</div>
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
      </div>
    </div>
  );
};

export default Products;
