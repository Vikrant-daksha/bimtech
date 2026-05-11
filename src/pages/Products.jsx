import React from 'react';
import './Products.css'; // We'll add some CSS to index.css or a new file, let's use inline/index.css classes

// Import images (if using vite, this works well, or just use absolute paths if they are in public)
// Since they are in src/assets, we should import them or use new URL
import cctvImg from '../assets/cctv-cameras.avif';
import dvrImg from '../assets/dvr-nvr.png';
import hardDiskImg from '../assets/hard-disk.png';
import biometricImg from '../assets/biometric-machines.webp';
import computerImg from '../assets/computers-laptops.jpg';
import routerImg from '../assets/router-networking-accessories.webp';
import intercomImg from '../assets/intercom-systems.webp';
import powerImg from '../assets/power-supply-smps.webp';

const Products = () => {
  const products = [
    { name: "CCTV Cameras", image: cctvImg },
    { name: "DVR & NVR", image: dvrImg },
    { name: "Hard Disk", image: hardDiskImg },
    { name: "Biometric Machines", image: biometricImg },
    { name: "Computers & Laptops", image: computerImg },
    { name: "Router & Networking Accessories", image: routerImg },
    { name: "Intercom Systems", image: intercomImg },
    { name: "Power Supply & SMPS", image: powerImg }
  ];

  return (
    <div className="page-content" style={{ padding: '80px 0', minHeight: '60vh', background: '#f8f9fa' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '15px', color: '#051937', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800' }}>Available Products</h1>
        <p style={{ textAlign: 'center', marginBottom: '50px', color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto 50px auto' }}>
          Explore our range of premium IT, security, and networking hardware.
        </p>

        <div className="products-grid">
          {products.map((product, idx) => (
            <div key={idx} className="product-card" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '1/1', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', cursor: 'pointer', background: '#fff' }}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }}
              />
              <div
                className="product-overlay"
                style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)', padding: '30px 20px', display: 'flex', alignItems: 'flex-end', height: '50%' }}
              >
                <h3 style={{ margin: '0', color: 'white', fontSize: '22px', fontWeight: '600', letterSpacing: '0.5px' }}>
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
