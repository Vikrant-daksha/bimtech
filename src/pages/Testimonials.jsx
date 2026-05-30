import React, { useState, useEffect } from 'react';
import { Star, Quote, User2 } from 'lucide-react';
import { client, urlFor } from '../sanity/client';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch ALL testimonials for the full reviews page
    client
      .fetch(
        `*[_type == "testimonial"] | order(_createdAt desc) {
          _id, name, role, content, rating, image, projectName
        }`
      )
      .then((data) => {
        setTestimonials(data || []);
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
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="page-content" style={{ padding: '80px 0', minHeight: '60vh', background: '#f8f9fa' }}>
      <div className="container">
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '15px',
            color: '#051937',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '800',
          }}
        >
          Customer Reviews
        </h1>
        <p
          style={{
            textAlign: 'center',
            color: '#666',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto 50px',
          }}
        >
          See what our clients have to say about our premium IT and security services.
        </p>

        {testimonials.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#888', fontSize: '18px' }}>
            No reviews yet. Check back soon!
          </div>
        ) : (
          <div className="testimonials-grid" style={{ marginTop: '40px' }}>
            {testimonials.map((item) => (
              <div key={item._id} className="testimonial-card-v2">
                <div className="quote-icon-blue">
                  <Quote size={24} fill="#007bff" color="#007bff" />
                </div>
                <p className="testimonial-text">"{item.content}"</p>
                <div className="stars">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                  ))}
                </div>
                {item.projectName && (
                  <div
                    style={{
                      display: 'inline-block',
                      background: '#eef2ff',
                      color: '#003399',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      marginBottom: '12px',
                    }}
                  >
                    📁 {item.projectName}
                  </div>
                )}
                <div className="testimonial-user-flex">
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: '#f0f5ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '15px',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {item.image ? (
                      <img
                        src={urlFor(item.image).width(100).url()}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
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
        )}
      </div>
    </div>
  );
};

export default Testimonials;
