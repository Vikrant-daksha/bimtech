import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { client, urlFor } from '../sanity/client';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "gallery" && slug.current == $id][0]{
          title, description, coverImage, images, serviceType, completedAt
        }`,
        { id }
      )
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % project.images.length);
      if (e.key === 'ArrowLeft')
        setLightboxIndex((i) => (i - 1 + project.images.length) % project.images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, project]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Project not found</h2>
        <Link to="/gallery" style={{ color: '#003399', fontWeight: '600' }}>← Back to Gallery</Link>
      </div>
    );
  }

  const allImages = project.images || [];

  return (
    <div className="page-content" style={{ padding: '0 0 80px', minHeight: '60vh', background: '#f8f9fa' }}>

      {/* ── Hero ── */}
      <div
        style={{
          backgroundImage: project.coverImage
            ? `linear-gradient(rgba(5,25,55,0.72), rgba(5,25,55,0.72)), url(${urlFor(project.coverImage).url()})`
            : 'linear-gradient(135deg, #001f5c, #003399)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 20px 50px',
        }}
      >
        <div className="container">
          <Link
            to="/gallery"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '20px',
            }}
          >
            <ArrowLeft size={16} /> Back to Gallery
          </Link>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', color: '#fff', margin: '0 0 12px', fontWeight: '800' }}>
            {project.title}
          </h1>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {project.serviceType && (
              <span
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '700',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                {project.serviceType}
              </span>
            )}
            {project.completedAt && (
              <span
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '12px',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                Completed: {new Date(project.completedAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '50px 20px' }}>

        {/* Description */}
        {project.description && (
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px 32px',
              marginBottom: '50px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid #eef0f8',
            }}
          >
            <h2 style={{ fontSize: '20px', color: '#051937', margin: '0 0 14px', fontWeight: '700' }}>
              About This Project
            </h2>
            <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.8', margin: 0 }}>
              {project.description}
            </p>
          </div>
        )}

        {/* Photo Grid */}
        {allImages.length > 0 ? (
          <>
            <h2 style={{ fontSize: '22px', color: '#051937', marginBottom: '24px', fontWeight: '700' }}>
              Project Photos ({allImages.length})
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '16px',
              }}
            >
              {allImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                  }}
                >
                  <img
                    src={urlFor(img).width(500).url()}
                    alt={img.caption || `Project photo ${i + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                      display: 'block',
                    }}
                  />
                  {img.caption && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '8px 12px',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.65))',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}
                    >
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888', fontSize: '16px' }}>
            No photos uploaded for this project yet.
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && allImages[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10000,
            }}
          >
            <X size={22} />
          </button>

          {/* Prev */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length);
              }}
              style={{
                position: 'absolute',
                left: '16px',
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10000,
              }}
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* Image */}
          <img
            src={urlFor(allImages[lightboxIndex]).url()}
            alt={allImages[lightboxIndex].caption || `Photo ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '92vw',
              maxHeight: '88vh',
              objectFit: 'contain',
              borderRadius: '10px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          />

          {/* Next */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i + 1) % allImages.length);
              }}
              style={{
                position: 'absolute',
                right: '16px',
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10000,
              }}
            >
              <ChevronRight size={26} />
            </button>
          )}

          {/* Counter */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
