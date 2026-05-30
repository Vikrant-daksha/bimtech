import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Images, ArrowRight } from 'lucide-react';
import { client, urlFor } from '../sanity/client';

const Gallery = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    client
      .fetch(
        `*[_type == "gallery"] | order(completedAt desc) {
          _id, title, "slug": slug.current, description, coverImage, serviceType, completedAt,
          "imageCount": count(images)
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

  // Build filter list from available projects
  const filters = ['All', ...Array.from(new Set(projects.map((p) => p.serviceType).filter(Boolean)))];

  const filtered =
    activeFilter === 'All' ? projects : projects.filter((p) => p.serviceType === activeFilter);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading gallery...
      </div>
    );
  }

  return (
    <div className="page-content" style={{ padding: '80px 0', minHeight: '60vh', background: '#f8f9fa' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#051937', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '15px' }}>
            Our Work Gallery
          </h1>
          <p style={{ color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            A glimpse into our successful installations and IT setups across various commercial and residential spaces.
          </p>
        </div>

        {/* Filter Chips */}
        {filters.length > 1 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '50px',
            }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '30px',
                  border: '2px solid',
                  borderColor: activeFilter === f ? '#003399' : '#dde3f0',
                  background: activeFilter === f ? '#003399' : '#fff',
                  color: activeFilter === f ? '#fff' : '#555',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {/* Project Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#888', fontSize: '18px' }}>
            No projects found. Upload your first project in Sanity Studio.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '28px',
            }}
          >
            {filtered.map((project) => (
              <Link
                key={project._id}
                to={`/gallery/${project.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.07)',
                    background: '#fff',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.07)';
                  }}
                >
                  {/* Cover Image */}
                  <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: '#e8efff' }}>
                    {project.coverImage ? (
                      <img
                        src={urlFor(project.coverImage).width(700).url()}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '56px',
                          background: 'linear-gradient(135deg, #e8efff, #f0f4ff)',
                        }}
                      >
                        🏗️
                      </div>
                    )}
                    {/* Service type badge */}
                    {project.serviceType && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '14px',
                          left: '14px',
                          background: 'rgba(0,51,153,0.88)',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '5px 12px',
                          borderRadius: '20px',
                          backdropFilter: 'blur(4px)',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {project.serviceType}
                      </div>
                    )}
                    {/* Image count badge */}
                    {project.imageCount > 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '14px',
                          right: '14px',
                          background: 'rgba(0,0,0,0.6)',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: '600',
                          padding: '5px 10px',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <Images size={13} /> {project.imageCount} photos
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '20px 22px 22px' }}>
                    <h3
                      style={{
                        margin: '0 0 8px',
                        fontSize: '17px',
                        fontWeight: '700',
                        color: '#051937',
                        lineHeight: '1.3',
                      }}
                    >
                      {project.title}
                    </h3>
                    {project.description && (
                      <p
                        style={{
                          margin: '0 0 14px',
                          fontSize: '13px',
                          color: '#666',
                          lineHeight: '1.6',
                        }}
                      >
                        {project.description.length > 90
                          ? project.description.slice(0, 90) + '…'
                          : project.description}
                      </p>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: '#003399',
                        fontSize: '13px',
                        fontWeight: '700',
                      }}
                    >
                      View Project <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
