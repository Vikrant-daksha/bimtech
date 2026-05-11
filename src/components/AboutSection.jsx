import React from 'react';
import { Users, Trophy, Settings, Headphones, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-flex">
        <div className="about-left">
          <span className="section-subtitle">ABOUT US</span>
          <h2 className="section-title">BIMTECH IT SOLUTIONS</h2>
          <p className="about-description">
            BIMTECH IT SOLUTIONS is a trusted name in IT services and security solutions. 
            We have years of experience in providing high-quality services to homes, shops, and offices. 
            Our goal is to deliver reliable, affordable, and quick solutions to our customers.
          </p>
          <p className="about-mission">
            We believe in customer satisfaction and long-term relationships. 
            Our expert team ensures every project is completed with perfection.
          </p>
          <Link to="/about" className="read-more-btn">
            Read More About Us <ArrowRight style={{ marginLeft: '15px' }} />
          </Link>
        </div>

        <div className="about-right">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <Users className='icons' />
              </div>
              <div className="stat-info">
                <h3>500+</h3>
                <p>Happy Customers</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <Trophy className='icons' />
              </div>
              <div className="stat-info">
                <h3>10+</h3>
                <p>Years of Experience</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <Settings className='icons' />
              </div>
              <div className="stat-info">
                <h3>100+</h3>
                <p>Projects Completed</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <Headphones className='icons' />
              </div>
              <div className="stat-info">
                <h3>24/7</h3>
                <p>Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
