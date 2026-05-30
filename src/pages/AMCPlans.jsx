import React, { useState, useEffect } from 'react';
import { CheckCircle, ShieldCheck, Zap, Crown, MessageCircle } from 'lucide-react';
import { client } from '../sanity/client';

// WhatsApp number
const WA_NUMBER = '918169670476';

// Icon and badge per plan slot (ordered by price asc: Basic → Standard → Premium)
const PLAN_META = [
  {
    icon: ShieldCheck,
    badge: null,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    accent: '#4776E6',
    glow: 'rgba(71,118,230,0.18)',
  },
  {
    icon: Zap,
    badge: 'Most Popular',
    gradient: 'linear-gradient(135deg, #003399 0%, #0056cc 100%)',
    accent: '#fff',
    glow: 'rgba(0,51,153,0.25)',
  },
  {
    icon: Crown,
    badge: 'Enterprise',
    gradient: 'linear-gradient(135deg, #7b0000 0%, #cc0000 100%)',
    accent: '#ffcc00',
    glow: 'rgba(204,0,0,0.22)',
  },
];

const AMCPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch('*[_type == "amcPlan"] | order(_createdAt asc)')
      .then((data) => {
        setPlans(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  function buildWhatsAppLink(planTitle) {
    const msg = encodeURIComponent(
      `Hi BIMTECH IT Solutions! I'm interested in the ${planTitle} plan. Please share the pricing details.`
    );
    return `https://wa.me/${WA_NUMBER}?text=${msg}`;
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: '18px',
        }}
      >
        Loading plans...
      </div>
    );
  }

  return (
    <div
      className="page-content amc-plans-page"
      style={{
        padding: '80px 0 100px',
        minHeight: '60vh',
        background: 'linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)',
      }}
    >
      <div className="container">
        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span
            style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, #003399, #4776E6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700',
              fontSize: '13px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            MAINTENANCE PLANS
          </span>
          <h1
            style={{
              fontSize: 'clamp(30px, 5vw, 48px)',
              fontWeight: '800',
              color: '#051937',
              margin: '0 0 16px 0',
              lineHeight: '1.15',
            }}
          >
            AMC Service Plans
          </h1>
          <p
            style={{
              maxWidth: '560px',
              margin: '0 auto',
              color: '#5a6575',
              fontSize: '17px',
              lineHeight: '1.7',
            }}
          >
            Keep your IT and security systems running at peak performance year-round.
            Choose a plan and{' '}
            <strong style={{ color: '#003399' }}>contact us for custom pricing</strong>.
          </p>
        </div>

        {/* ── "No hidden pricing" strip ── */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#25d366',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
        </div>

        {/* ── Plan Cards ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            maxWidth: '1050px',
            margin: '0 auto',
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan, idx) => {
            const meta = PLAN_META[idx] || PLAN_META[0];
            const Icon = meta.icon;
            const isHighlighted = idx === 1; // middle card is featured

            return (
              <div
                key={plan._id}
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: isHighlighted
                    ? `0 20px 60px ${meta.glow}, 0 4px 20px rgba(0,0,0,0.12)`
                    : `0 10px 40px ${meta.glow}, 0 2px 10px rgba(0,0,0,0.06)`,
                  transform: isHighlighted ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = isHighlighted ? 'scale(1.06)' : 'scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 28px 70px ${meta.glow}, 0 6px 24px rgba(0,0,0,0.14)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = isHighlighted ? 'scale(1.04)' : 'scale(1)';
                  e.currentTarget.style.boxShadow = isHighlighted
                    ? `0 20px 60px ${meta.glow}, 0 4px 20px rgba(0,0,0,0.12)`
                    : `0 10px 40px ${meta.glow}, 0 2px 10px rgba(0,0,0,0.06)`;
                }}
              >
                {/* Badge */}
                {meta.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '18px',
                      right: '18px',
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                      zIndex: 2,
                    }}
                  >
                    {meta.badge}
                  </div>
                )}

                {/* Dark gradient header */}
                <div
                  style={{
                    background: meta.gradient,
                    padding: '36px 30px 28px',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      background: 'rgba(255,255,255,0.12)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 18px',
                      border: '2px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <Icon size={28} color={meta.accent} />
                  </div>

                  <h2
                    style={{
                      margin: '0 0 8px 0',
                      fontSize: '22px',
                      fontWeight: '800',
                      color: '#fff',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {plan.title || plan.name}
                  </h2>

                  {/* Price tag */}
                  <div
                    style={{
                      display: 'inline-block',
                      background: 'rgba(255,255,255,0.13)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      borderRadius: '20px',
                      padding: '5px 18px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: 'rgba(255,255,255,0.9)',
                      marginTop: '4px',
                    }}
                  >
                    {plan.price || 'Contact for Pricing'}
                  </div>
                </div>

                {/* Features list */}
                <div
                  style={{
                    background: '#fff',
                    padding: '28px 28px 12px',
                    flexGrow: 1,
                  }}
                >
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {(plan.features || []).map((feature, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          marginBottom: '16px',
                          fontSize: '15px',
                          color: '#333',
                          lineHeight: '1.5',
                        }}
                      >
                        <CheckCircle
                          size={18}
                          style={{
                            color: plan.color || '#003399',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div style={{ background: '#fff', padding: '0 28px 30px' }}>
                  <a
                    href={buildWhatsAppLink(plan.title || plan.name)}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '15px',
                      background: isHighlighted
                        ? 'linear-gradient(135deg, #003399, #4776E6)'
                        : '#25d366',
                      color: '#fff',
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '15px',
                      textDecoration: 'none',
                      boxSizing: 'border-box',
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                      boxShadow: isHighlighted
                        ? '0 6px 20px rgba(0,51,153,0.35)'
                        : '0 6px 20px rgba(37,211,102,0.35)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* WhatsApp SVG inline */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Contact for Pricing
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .amc-plans-page .amc-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AMCPlans;
