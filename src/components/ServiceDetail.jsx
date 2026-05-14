import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Timer, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';
import { client, urlFor } from '../sanity/client';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "service" && slug.current == $id][0]`, { id })
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  if (loading) return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  if (!service) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Service Not Found</h2>
        <Link to="/services" className="btn-call" style={{ display: 'inline-flex', marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: '6px', textDecoration: 'none' }}>Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      <div className="service-detail-header" style={{ 
        backgroundImage: service.image ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${urlFor(service.image).url()})` : 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0 60px'
      }}>
        <div className="container" style={{ padding: '0 20px' }}>
          <Link to="/services" className="back-link" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
          </Link>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#fff' }}>{service.title}</h1>
        </div>
      </div>

      <div className="container service-detail-content" style={{ padding: '60px 20px' }}>
        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div className="detail-text">
            <h2 style={{ fontSize: '28px', color: '#051937', marginBottom: '20px' }}>About this Service</h2>
            <p className="large-text" style={{ fontSize: '18px', lineHeight: '1.8', color: '#444', marginBottom: '40px' }}>{service.description}</p>

            {/* Note: In a real app, you'd use @portabletext/react for service.details */}
            <div className="key-features" style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '24px', color: '#051937', marginBottom: '25px' }}>What's Included</h3>
              <p style={{ color: '#666' }}>Please contact us for a detailed breakdown of this service.</p>
            </div>
          </div>
          <div className="detail-sidebar">
            <div className="contact-card" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.08)', border: '1px solid #eaeaea', background: '#ffffff', padding: '30px 20px', borderRadius: '12px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '22px', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px', marginBottom: '25px', color: '#051937' }}>Service Details</h3>

              <div className="service-meta" style={{ marginBottom: '30px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '25px' }}>
                  <Clock style={{ width: '24px', height: '24px', color: '#007bff', marginRight: '15px', marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '16px', color: '#333', marginBottom: '5px' }}>Working Hours</strong>
                    <span style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', display: 'block' }}>Mon - Sat: 9:00 AM - 7:00 PM</span>
                    <span style={{ color: '#dc3545', fontSize: '14px', lineHeight: '1.5', display: 'block', fontWeight: '500' }}>Sunday: Closed</span>
                  </div>
                </div>
              </div>

              <div className="contact-actions" style={{ borderTop: '2px solid #f0f0f0', paddingTop: '25px' }}>
                <h4 style={{ fontSize: '16px', marginBottom: '20px', color: '#333', textAlign: 'center' }}>Ready to get started?</h4>
                <a href="tel:+918169670476" className="btn-call" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '15px', padding: '14px', fontSize: '16px', borderRadius: '8px', gap: '8px', backgroundColor: '#003399', color: 'white', textDecoration: 'none', fontWeight: 'bold', boxSizing: 'border-box' }}>
                  <Phone size={20} />
                  +91 81696 70476
                </a>

                <a href="https://wa.me/918169670476" className="btn-whatsapp" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '15px', padding: '14px', fontSize: '16px', borderRadius: '8px', gap: '8px', backgroundColor: '#25d366', color: 'white', textDecoration: 'none', fontWeight: 'bold', boxSizing: 'border-box' }}>
                  <WhatsAppIcon size={20} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
