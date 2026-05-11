import React from 'react';
import { Star, Quote, User2 } from 'lucide-react';

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
  },
  {
    id: 4,
    name: "Retail Shop",
    role: "Store Manager",
    text: "Installed biometric attendance for my staff. Working flawlessly.",
    rating: 5
  },
  {
    id: 5,
    name: "Tech Solutions",
    role: "IT Director",
    text: "Their networking services and AMC plans are top-notch.",
    rating: 5
  },
  {
    id: 6,
    name: "School Admin",
    role: "Principal",
    text: "The intercom system they set up has made communication so much easier.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <div className="page-content" style={{ padding: '80px 0', minHeight: '60vh', background: '#f8f9fa' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '15px', color: '#051937', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800' }}>Customer Reviews</h1>
        <p style={{ textAlign: 'center', marginBottom: '50px', color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          See what our clients have to say about our premium IT and security services.
        </p>

        <div className="testimonials-grid" style={{ marginTop: '40px' }}>
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
    </div>
  );
};

export default Testimonials;
