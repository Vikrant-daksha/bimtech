import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import serviceCctv from '../assets/service-cctv.png';
import serviceLaptop from '../assets/service-laptop.png';
import serviceAttendance from '../assets/service-attendance.png';
import intercomSetup from '../assets/intercom-setup.png';
import serverNetworking from '../assets/server-networking.png';
import itSupport from '../assets/it-support.png';

const Services = () => {
  const servicesList = [
    {
      id: 'cctv-installation',
      title: "CCTV Camera Sales & Installation",
      image: serviceCctv,
      items: ["Dome Camera", "Bullet Camera", "IP Camera", "Wireless CCTV"]
    },
    {
      id: 'laptop-repair',
      title: "Computer & Laptop Service",
      image: serviceLaptop,
      items: ["Desktop Repair", "Laptop Repair", "Windows Installation", "Data Backup"]
    },
    {
      id: 'attendance-machine',
      title: "Attendance Machine Service",
      image: serviceAttendance,
      items: ["ESSL Device Setup", "Fingerprint Registration", "Software Support"]
    },
    {
      id: 'intercom-system',
      title: "Intercom Services",
      image: intercomSetup,
      items: ["Building Intercom", "Office Intercom", "Video Door Phone"]
    },
    {
      id: 'networking-services',
      title: "Networking Services",
      image: serverNetworking,
      items: ["Router Setup", "LAN Cabling", "WiFi Installation", "Office Networking"]
    },
    {
      id: 'amc-maintenance',
      title: "AMC Services",
      image: itSupport,
      items: ["CCTV AMC", "Computer AMC", "Monthly Maintenance", "Tech Support"]
    }
  ];

  return (
    <div className="page-content" style={{ padding: '80px 0', minHeight: '60vh', background: '#f8f9fa' }}>
      <div className="services-page-container">
        <div className="section-page-header" style={{ textAlign: 'start', marginBottom: '50px' }}>
          <span className="section-subtitle">OUR SERVICES</span>
          <h1 className="section-title">What We Offer</h1>
          <div className="title-underline" style={{ marginLeft: '0 auto' }}></div>
          <p style={{ marginTop: '15px', color: '#666', fontSize: '18px' }}>
            Explore our comprehensive range of IT and security solutions tailored for your business needs.
          </p>
        </div>

        <div className="services-page-grid">
          {servicesList.map((svc, idx) => (
            <Link to={`/service/${svc.id}`} key={idx} className="service-card-final" style={{ textDecoration: 'none' }}>
              <img src={svc.image} alt={svc.title} className="card-img" />
              <div className="card-body">
                <h3>{svc.title}</h3>
                <ul>
                  {svc.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="btn-see-details">
                  See Details <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Services;
