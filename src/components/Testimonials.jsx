import React, { useState, useEffect } from 'react';
import { Star, Quote, ArrowRight, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch('*[_type == "testimonial"]')
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return null;
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header-flex">
          <div className="header-left">
            <span className="section-subtitle">TESTIMONIALS</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <Link to="/reviews" className="view-all-outline">
            View All Reviews <ArrowRight size={18} />
          </Link>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item._id} className="testimonial-card-v2">
              <div className="quote-icon-blue">
                <Quote size={24} fill="#007bff" color="#007bff" />
              </div>
              <p className="testimonial-text">"{item.content}"</p>
              <div className="stars">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                ))}
              </div>
              <div className="testimonial-user-flex">
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', overflow: 'hidden' }}>
                  {item.image ? (
                    <img src={urlFor(item.image).url()} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <User2 size={24} color="#007bff" />
                  )}
                </div>
                <div className="user-info">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
