import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Timer, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';

import serviceCctv from '../assets/service-cctv.png';
import serviceLaptop from '../assets/service-laptop.png';
import serviceAttendance from '../assets/service-attendance.png';
import intercomSetup from '../assets/intercom-setup.png';
import serverNetworking from '../assets/server-networking.png';
import itSupport from '../assets/it-support.png';

const serviceData = {
  'cctv-installation': {
    title: 'CCTV Installation & Maintenance',
    fullDesc: 'We provide end-to-end security solutions with high-definition CCTV camera installations. Our systems include remote monitoring capabilities so you can watch over your property from anywhere in the world.',
    points: [
      {
        title: "HD & 4K Resolution Cameras",
        details: "Installation of high-definition cameras providing crystal-clear images, ensuring maximum visibility and security for your premises."
      },
      {
        title: "Remote Mobile Viewing",
        details: "Configure secure remote access via smartphone or tablet, allowing you to monitor your property live from anywhere at any time."
      },
      {
        title: "24/7 Recording & Storage",
        details: "Setup of robust DVR/NVR systems with high-capacity hard drives to guarantee uninterrupted recording and extensive video retention."
      },
      {
        title: "AMC & Maintenance Services",
        details: "Comprehensive maintenance covering regular health checks, cleaning, troubleshooting, and priority support to keep your system flawless."
      }
    ],
    image: serviceCctv,
    timeRequired: '1 - 2 Days'
  },
  'laptop-repair': {
    title: 'Laptop & Desktop Repair',
    fullDesc: 'Expert repair services for all major brands of laptops and desktops. From hardware upgrades to complex motherboard repairs and virus removal, our technicians ensure your devices run at peak performance.',
    points: [
      {
        title: "Screen & Battery Replacement",
        details: "Swift and professional replacement of cracked screens and degraded batteries with genuine parts to restore your device's usability."
      },
      {
        title: "Motherboard & Chip-level Repair",
        details: "Advanced diagnostics and repair of complex motherboard issues, including liquid damage, short circuits, and component failures."
      },
      {
        title: "OS Installation & Optimization",
        details: "Clean installation of operating systems, driver updates, malware removal, and system tuning to ensure peak performance and speed."
      },
      {
        title: "Data Recovery Services",
        details: "Expert retrieval of lost, deleted, or corrupted files from failing hard drives, SSDs, and external storage devices."
      }
    ],
    image: serviceLaptop,
    timeRequired: '2 - 24 Hours'
  },
  'attendance-machine': {
    title: 'Attendance Machine (eSSL)',
    fullDesc: 'We provide end-to-end biometric and access control solutions to streamline employee attendance and improve workforce management. From initial site inspection to software integration and long-term maintenance, our eSSL attendance systems ensure accurate tracking, reduced manual errors, and seamless payroll processing for offices, schools, hospitals, and factories.',
    points: [
      {
        title: "Device Installation & Setup",
        details: "Professional mounting and secure wiring of fingerprint, facial recognition, or RFID devices with proper LAN/Wi-Fi connectivity."
      },
      {
        title: "System & Policy Configuration",
        details: "Customizing company details, departments, shift timings, overtime rules, late entry policies, and administrative permissions."
      },
      {
        title: "Employee Biometric Enrollment",
        details: "Registering staff via fingerprints, face scans, or RFID cards to ensure accurate tracking and prevent duplicate entries across multiple devices."
      },
      {
        title: "Software & Payroll Integration",
        details: "Installing desktop or cloud attendance software and integrating it seamlessly with your existing HRMS and payroll systems."
      },
      {
        title: "Network Connectivity & Sync",
        details: "Configuring LAN/Wi-Fi, static IPs, and cloud connections to enable real-time data synchronization across multiple branch locations."
      },
      {
        title: "Reporting & Data Management",
        details: "Setting up automated daily, monthly, and shift-wise reports alongside secure database backups and log management."
      },
      {
        title: "AMC & Maintenance",
        details: "Providing Annual Maintenance Contracts (AMC) to ensure consistent performance with zero downtime."
      }
    ],
    image: serviceAttendance,
    timeRequired: '2 - 4 Hours'
  },
  'intercom-system': {
    title: 'Intercom System',
    fullDesc: 'Enhance the security and convenience of your office or apartment complex with our state-of-the-art audio and video intercom systems. We provide seamless integration for multi-unit buildings.',
    points: [
      {
        title: "Video Door Phones",
        details: "Installation of advanced video intercoms allowing you to visually identify and communicate with visitors before granting access."
      },
      {
        title: "Multi-apartment Systems",
        details: "Scalable intercom networking designed for residential complexes and large office buildings for seamless inter-unit communication."
      },
      {
        title: "Crystal Clear Audio Quality",
        details: "Implementation of noise-canceling audio hardware to ensure clear, interference-free conversations at all entry points."
      },
      {
        title: "Indoor Station Control",
        details: "User-friendly indoor monitors and handsets enabling convenient unlocking of electronic doors or gates with a single button press."
      }
    ],
    image: intercomSetup,
    timeRequired: '1 - 3 Days'
  },
  'networking-services': {
    title: 'Networking Services',
    fullDesc: 'Build a robust and secure digital infrastructure with our networking solutions. We handle everything from structured cabling to router configuration and network security audits.',
    points: [
      {
        title: "Structured Cabling (Cat6/Cat6a)",
        details: "Professional routing, terminating, and testing of high-speed network cables to ensure organized and reliable wired connectivity."
      },
      {
        title: "Wi-Fi Heatmapping & Setup",
        details: "Strategic placement of access points based on thorough signal analysis to guarantee complete wireless coverage without dead zones."
      },
      {
        title: "Firewall & Security Configuration",
        details: "Deployment of robust firewalls, VPNs, and network security protocols to protect your sensitive data from external cyber threats."
      },
      {
        title: "Network Troubleshooting & Repair",
        details: "Rapid identification and resolution of network bottlenecks, IP conflicts, and connectivity drops to minimize operational downtime."
      }
    ],
    image: serverNetworking,
    timeRequired: '1 - 3 Days'
  },
  'amc-maintenance': {
    title: 'AMC Services',
    fullDesc: 'Ensure your IT and security infrastructure runs flawlessly year-round with our Annual Maintenance Contracts. We offer comprehensive support, regular servicing, and emergency repairs to minimize downtime and maximize productivity.',
    points: [
      {
        title: "CCTV AMC",
        details: "Regular cleaning of lenses, DVR/NVR health checks, storage verification, and priority replacement of faulty cables or power supplies."
      },
      {
        title: "Computer & IT AMC",
        details: "Routine hardware diagnostics, OS updates, virus scanning, and physical cleaning of desktops, laptops, and servers."
      },
      {
        title: "Monthly Preventive Maintenance",
        details: "Scheduled visits by our expert technicians to proactively identify and resolve potential issues before they cause system failures."
      },
      {
        title: "Priority Technical Support",
        details: "Access to our dedicated support hotline and rapid on-site response for critical network, security, or hardware emergencies."
      }
    ],
    image: itSupport,
    timeRequired: 'Annual Contract'
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = serviceData[id];
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
      <div className="service-detail-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${service.image})` }}>
        <div className="container" style={{ padding: '0 20px' }}>
          <Link to="/services" className="back-link">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
          </Link>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>{service.title}</h1>
        </div>
      </div>

      <div className="container service-detail-content" style={{ padding: '60px 20px' }}>
        <div className="detail-grid">
          <div className="detail-text">
            <h2 style={{ fontSize: '28px', color: '#051937', marginBottom: '20px' }}>About this Service</h2>
            <p className="large-text" style={{ fontSize: '18px', lineHeight: '1.8', color: '#444', marginBottom: '40px' }}>{service.fullDesc}</p>

            <div className="key-features" style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '24px', color: '#051937', marginBottom: '25px' }}>What's Included</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0', margin: '0', listStyle: 'none', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eef0f2', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                {service.points.map((point, index) => {
                  if (typeof point === 'string') {
                    return (
                      <li key={index} style={{ display: 'flex', alignItems: 'flex-start', padding: '15px 20px', background: '#f8f9fa', borderBottom: index !== service.points.length - 1 ? '1px solid #eef0f2' : 'none', margin: '0' }}>
                        <CheckCircle className="text-blue" style={{ minWidth: '24px', height: '24px', marginRight: '15px', marginTop: '2px', color: '#007bff' }} />
                        <span style={{ fontSize: '16px', color: '#444', fontWeight: '500', lineHeight: '1.5' }}>{point}</span>
                      </li>
                    );
                  } else {
                    const isOpen = openFaqIndex === index;
                    return (
                      <li key={index} style={{ display: 'block', background: '#f8f9fa', borderBottom: index !== service.points.length - 1 ? '1px solid #eef0f2' : 'none', margin: '0', overflow: 'hidden' }}>
                        <button
                          onClick={() => toggleFaq(index)}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircle className="text-blue" style={{ minWidth: '24px', height: '24px', marginRight: '15px', color: '#007bff' }} />
                            <span style={{ fontSize: '16px', color: '#051937', fontWeight: '600' }}>{point.title}</span>
                          </div>
                          {isOpen ? <ChevronUp size={20} color="#666" /> : <ChevronDown size={20} color="#666" />}
                        </button>
                        {isOpen && (
                          <div style={{ padding: '0 20px 20px 59px', color: '#555', fontSize: '15px', lineHeight: '1.6' }}>
                            {point.details}
                          </div>
                        )}
                      </li>
                    );
                  }
                })}
              </ul>
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

                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <Timer style={{ width: '24px', height: '24px', color: '#007bff', marginRight: '15px', marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '16px', color: '#333', marginBottom: '5px' }}>Time Required</strong>
                    <span style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', display: 'block' }}>{service.timeRequired || 'Varies depending on requirements'}</span>
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
                <p style={{ fontSize: '13px', color: '#666', textAlign: 'center', margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#28a745', borderRadius: '50%', display: 'inline-block' }}></span>
                  WhatsApp Support: 24/7 Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
