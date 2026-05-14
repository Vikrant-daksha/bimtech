import React from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';
import * as Icons from 'lucide-react';

const Services = () => {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client.fetch('*[_type == "service"] | order(title asc)')
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const getIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.HelpCircle;
    return <Icon className="w-6 h-6" />;
  };

  if (loading) return null; // Or a skeleton
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
          {services.map((service) => (
            <div key={service._id} className="service-card">
              <div className="card-image">
                <img src={service.image ? urlFor(service.image).url() : ''} alt={service.title} />
                <div className="card-icon-overlay">
                  <div className="icon-circle">
                    {getIcon(service.icon)}
                  </div>
                </div>
              </div>
              <div className="card-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={`/service/${service.slug.current}`} className="learn-more-link">
                  Learn More <Icons.ArrowRight style={{ marginLeft: '2px' }} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
