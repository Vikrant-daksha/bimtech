import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Phone,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  Tag,
} from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';
import { client, urlFor } from '../sanity/client';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "service" && slug.current == $id][0]{
          title,
          "slug": slug.current,
          image,
          introduction,
          description,
          whatsIncluded,
          benefits,
          suitableFor,
          brands
        }`,
        { id }
      )
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  if (loading)
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    );

  if (!service) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Service Not Found</h2>
        <Link
          to="/services"
          style={{
            display: 'inline-flex',
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
          }}
        >
          Back to Services
        </Link>
      </div>
    );
  }

  const intro = service.introduction || service.description || '';

  return (
    <div className="service-detail-page">
      {/* ── Hero Header ── */}
      <div
        className="service-detail-header service-detail-header-hero"
        style={{
          backgroundImage: service.image
            ? `linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)), url(${urlFor(service.image).url()})`
            : 'linear-gradient(135deg, #001f5c 0%, #003399 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 0 60px',
        }}
      >
        <div className="container" style={{ padding: '0 20px' }}>
          <Link
            to="/services"
            style={{
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '20px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#fff', margin: 0 }}>
            {service.title}
          </h1>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container" style={{ padding: '60px 20px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 340px',
            gap: '50px',
            alignItems: 'start',
          }}
          className="service-detail-body"
        >
          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Introduction */}
            {intro && (
              <section style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '26px', color: '#051937', marginBottom: '16px' }}>
                  About This Service
                </h2>
                <p style={{ fontSize: '17px', lineHeight: '1.85', color: '#444' }}>{intro}</p>
              </section>
            )}

            {/* What's Included */}
            {service.whatsIncluded && service.whatsIncluded.length > 0 && (
              <section style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '26px', color: '#051937', marginBottom: '28px' }}>
                  What's Included
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {service.whatsIncluded.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '16px',
                        padding: '20px 22px',
                        background: '#fff',
                        borderRadius: '12px',
                        border: '1px solid #eef0f5',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                      }}
                    >
                      <CheckCircle
                        size={22}
                        style={{ color: '#003399', flexShrink: 0, marginTop: '2px' }}
                      />
                      <div>
                        <strong style={{ display: 'block', color: '#051937', fontSize: '16px', marginBottom: '5px' }}>
                          {item.title}
                        </strong>
                        <span style={{ color: '#666', fontSize: '14px', lineHeight: '1.65' }}>
                          {item.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <section style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '26px', color: '#051937', marginBottom: '20px' }}>
                  Key Benefits
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {service.benefits.map((b, i) => (
                    <li
                      key={i}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: '#444' }}
                    >
                      <Star size={17} style={{ color: '#003399', flexShrink: 0, marginTop: '3px' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Suitable For */}
            {service.suitableFor && service.suitableFor.length > 0 && (
              <section style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '26px', color: '#051937', marginBottom: '20px' }}>
                  Suitable For
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {service.suitableFor.map((s, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#eef2ff',
                        color: '#003399',
                        padding: '7px 14px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600',
                      }}
                    >
                      <Users size={13} />
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Brands */}
            {service.brands && service.brands.length > 0 && (
              <section style={{ marginBottom: '10px' }}>
                <h2 style={{ fontSize: '26px', color: '#051937', marginBottom: '20px' }}>
                  Brands We Work With
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {service.brands.map((brand, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#f5f5f5',
                        color: '#333',
                        padding: '7px 16px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        border: '1px solid #e0e0e0',
                      }}
                    >
                      <Tag size={12} />
                      {brand}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div>
            <div
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid #eaeaea',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                padding: '28px 24px',
                position: 'sticky',
                top: '100px',
              }}
            >
              <h3
                style={{
                  fontSize: '20px',
                  color: '#051937',
                  borderBottom: '2px solid #f0f0f0',
                  paddingBottom: '15px',
                  marginBottom: '24px',
                }}
              >
                Get This Service
              </h3>

              {/* Working Hours */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '24px' }}>
                <Clock size={22} style={{ color: '#003399', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '15px', color: '#333', marginBottom: '4px' }}>
                    Working Hours
                  </strong>
                  <span style={{ color: '#555', fontSize: '13px', display: 'block', lineHeight: '1.5' }}>
                    Mon – Sat: 9:00 AM – 7:00 PM
                  </span>
                  <span style={{ color: '#dc3545', fontSize: '13px', display: 'block', fontWeight: '500' }}>
                    Sunday: Closed
                  </span>
                </div>
              </div>

              <div style={{ borderTop: '2px solid #f0f0f0', paddingTop: '22px' }}>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: '18px',
                  }}
                >
                  Ready to get started? Contact us today.
                </p>

                <a
                  href="tel:+918169670476"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '14px',
                    fontSize: '15px',
                    borderRadius: '8px',
                    backgroundColor: '#003399',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: '700',
                    boxSizing: 'border-box',
                    marginBottom: '12px',
                  }}
                >
                  <Phone size={18} />
                  +91 81696 70476
                </a>

                <a
                  href="https://wa.me/918169670476"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '14px',
                    fontSize: '15px',
                    borderRadius: '8px',
                    backgroundColor: '#25d366',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: '700',
                    boxSizing: 'border-box',
                  }}
                >
                  <WhatsAppIcon size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 995px) {
          .service-detail-header-hero {
            padding: 20px 0 !important;
          }
          .service-detail-body {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceDetail;
