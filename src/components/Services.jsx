import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Laptop, Fingerprint, Phone, Network, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'cctv-installation',
    title: 'CCTV Installation & Maintenance',
    desc: 'Complete CCTV camera setup for homes, offices, and shops with HD quality cameras and remote mobile viewing.',
    icon: <Camera className="w-6 h-6" />,
    image: '/src/assets/service-cctv.png'
  },
  {
    id: 'laptop-repair',
    title: 'Laptop & Desktop Repair',
    desc: 'All types of computer repair services including hardware, software, formatting, and upgrades.',
    icon: <Laptop className="w-6 h-6" />,
    image: '/src/assets/service-laptop.png'
  },
  {
    id: 'attendance-machine',
    title: 'Attendance Machine (ESSL)',
    desc: 'Biometric attendance system installation and support for offices and companies.',
    icon: <Fingerprint className="w-6 h-6" />,
    image: '/src/assets/service-attendance.png'
  },
  {
    id: 'intercom-system',
    title: 'Intercom System',
    desc: 'Internal communication systems for offices, buildings, and apartments.',
    icon: <Phone className="w-6 h-6" />,
    image: '/src/assets/intercom-setup.png'
  },
  {
    id: 'networking-services',
    title: 'Networking Services',
    desc: 'LAN setup, WiFi installation, and network troubleshooting for smooth connectivity.',
    icon: <Network className="w-6 h-6" />,
    image: '/src/assets/server-networking.png'
  }
];

const Services = () => {
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
            View All Services <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="card-image">
                <img src={service.image} alt={service.title} />
                <div className="card-icon-overlay">
                  <div className="icon-circle">
                    {service.icon}
                  </div>
                </div>
              </div>
              <div className="card-content">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <Link to={`/service/${service.id}`} className="learn-more-link">
                  Learn More <ArrowRight style={{ marginLeft: '2px' }} />
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
