import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import cctvInstallation from '../assets/cctv-installation.png';
import itSupport from '../assets/it-support.png';
import biometricSystem from '../assets/biometric-machines.webp';
import serverNetworking from '../assets/server-networking.png';
import intercomSetup from '../assets/intercom-setup.png';

const projects = [
  { id: 1, image: cctvInstallation, title: 'CCTV Installation' },
  { id: 2, image: itSupport, title: 'IT Support Setup' },
  { id: 3, image: biometricSystem, title: 'Biometric System' },
  { id: 4, image: serverNetworking, title: 'Server Networking' },
  { id: 5, image: intercomSetup, title: 'Intercom Setup' },
];

const Projects = () => {
  return (
    <section className="projects-section">
      <div className="container">
        <div className="section-header-flex">
          <div className="header-left">
            <span className="section-subtitle">OUR WORK GALLERY</span>
            <h2 className="section-title">Our Recent Projects</h2>
          </div>
          <Link to="/gallery" className="view-all-outline">
            View Full Gallery <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="projects-grid-5">
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              <img src={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
