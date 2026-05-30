import React, { useState, useEffect } from 'react';
import { ArrowRight, Images } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latest 5 projects that have a cover image
    client
      .fetch(
        `*[_type == "gallery" && defined(coverImage)] | order(completedAt desc)[0...5] {
          _id, title, "slug": slug.current, coverImage, serviceType, "imageCount": count(images)
        }`
      )
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (projects.length === 0) return null;

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
        
        <div className="projects-grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {projects.map((project) => (
            <Link 
              to={`/gallery/${project.slug}`} 
              key={project._id} 
              className="project-item"
              style={{ 
                display: 'block', 
                position: 'relative', 
                borderRadius: '12px', 
                overflow: 'hidden',
                aspectRatio: '1',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <img 
                src={urlFor(project.coverImage).width(400).url()} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '15px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <h4 style={{ color: '#fff', margin: '0 0 5px', fontSize: '15px', fontWeight: '600' }}>{project.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {project.serviceType && (
                    <span style={{ color: '#aaa', fontSize: '12px' }}>{project.serviceType}</span>
                  )}
                  {project.imageCount > 0 && (
                    <span style={{ color: '#fff', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Images size={14} /> {project.imageCount}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
