import React from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';
import * as Icons from 'lucide-react';

// Only these 5 slugs are shown on the homepage — change to any 5 you prefer
const FEATURED_SLUGS = [
  'cctv-installation',
  'networking-services',
  'attendance-system',
  'intercom-system',
  'amc-maintenance',
];

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

const getIcon = (iconName) => {
  const Icon = Icons[iconName] || Icons.HelpCircle;
  return <Icon className="w-6 h-6" />;
};

const Services = () => {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch only the 5 featured services by slug
    const inList = FEATURED_SLUGS.map((s) => `"${s}"`).join(', ');
    client
      .fetch(`*[_type == "service" && slug.current in [${inList}]]{ title, slug, image, icon, introduction, description }`)
      .then((data) => {
        // Sort to match FEATURED_SLUGS order
        const sorted = FEATURED_SLUGS
          .map((slug) => data.find((d) => d.slug?.current === slug))
          .filter(Boolean);
        setServices(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <div className="header-text">
            <span className="section-subtitle">OUR SERVICES</span>
            <h2 className="section-title">What We Offer</h2>
            <div className="title-underline"></div>
          </div>
          <Link to="/services" className="view-all-btn">
            View All Services <Icons.ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const slug = service.slug?.current;
            const hasImage = !!service.image;
            const desc = service.introduction || service.description || '';
            const truncated = desc.length > 110 ? desc.slice(0, 110).trimEnd() + '…' : desc;

            return (
              <div key={slug} className="service-card">
                <div className="card-image">
                  {hasImage ? (
                    <img
                      src={urlFor(service.image).width(600).url()}
                      alt={service.title}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #e8efff, #f0f4ff)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '56px',
                      }}
                    >
                      {ICON_FALLBACKS[slug] || '⚙️'}
                    </div>
                  )}
                  <div className="card-icon-overlay">
                    <div className="icon-circle">
                      {getIcon(service.icon)}
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{service.title}</h3>
                  <p>{truncated}</p>
                  <Link to={`/service/${slug}`} className="learn-more-link">
                    Learn More <Icons.ArrowRight style={{ marginLeft: '2px' }} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
