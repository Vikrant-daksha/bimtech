import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';

// Fallback icon map — shown as emoji if no image exists yet
const ICON_FALLBACKS = {
  'cctv-installation': '📷',
  'boom-barrier-system': '🚧',
  'interactive-panel-solutions': '🖥️',
  'digital-signage-solutions': '📺',
  'intercom-system': '📞',
  'attendance-system': '🖐️',
  'networking-services': '🌐',
  'laptop-repair': '💻',
  'amc-maintenance': '🛡️',
};

const Services = () => {
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "service"] | order(_createdAt asc) {
          title,
          "slug": slug.current,
          image,
          introduction,
          whatsIncluded
        }`
      )
      .then((data) => {
        setServicesList(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading services...
      </div>
    );
  }

  return (
    <div className="page-content" style={{ padding: '80px 0', minHeight: '60vh', background: '#f8f9fa' }}>
      <div className="services-page-container">
        <div className="section-page-header" style={{ textAlign: 'start', marginBottom: '50px' }}>
          <span className="section-subtitle">OUR SERVICES</span>
          <h1 className="section-title">What We Offer</h1>
          <div className="title-underline" style={{ marginLeft: '0 auto' }}></div>
          <p style={{ marginTop: '15px', color: '#666', fontSize: '18px' }}>
            Explore our comprehensive range of IT and security solutions tailored for your business needs.
          </p>
        </div>

        <div className="services-page-grid">
          {servicesList.map((svc, idx) => (
            <Link
              to={`/service/${svc.slug}`}
              key={idx}
              className="service-card-final"
              style={{ textDecoration: 'none' }}
            >
              {/* Image or emoji fallback */}
              {svc.image ? (
                <img
                  src={urlFor(svc.image).width(600).url()}
                  alt={svc.title}
                  className="card-img"
                />
              ) : (
                <div
                  className="card-img"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #e8efff 0%, #f0f4ff 100%)',
                    fontSize: '64px',
                  }}
                >
                  {ICON_FALLBACKS[svc.slug] || '⚙️'}
                </div>
              )}

              <div className="card-body">
                <h3>{svc.title}</h3>

                {/* Show first 3 "What's Included" items as bullet preview */}
                <ul>
                  {(svc.whatsIncluded || []).slice(0, 3).map((item, i) => (
                    <li key={i}>{item.title}</li>
                  ))}
                </ul>

                <div className="btn-see-details">
                  See Details <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
