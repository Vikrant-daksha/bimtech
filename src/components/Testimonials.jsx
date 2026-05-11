import React from 'react';
import { Star, Quote, ArrowRight, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: "Happy Customer",
    role: "Local Business Owner",
    text: "Very fast and reliable service. Highly recommended!",
    rating: 5
  },
  {
    id: 2,
    name: "Home Owner",
    role: "Residence",
    text: "Best CCTV installation service in area.",
    rating: 5
  },
  {
    id: 3,
    name: "Client",
    role: "Office Manager",
    text: "Affordable pricing and good support.",
    rating: 5
  }
];

const Testimonials = () => {
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
            <div key={item.id} className="testimonial-card-v2">
              <div className="quote-icon-blue">
                <Quote size={24} fill="#007bff" color="#007bff" />
              </div>
              <p className="testimonial-text">"{item.text}"</p>
              <div className="stars">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                ))}
              </div>
              <div className="testimonial-user-flex">
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                  <User2 size={24} color="#007bff" />
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
