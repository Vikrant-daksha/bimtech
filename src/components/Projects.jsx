import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { client, urlFor } from '../sanity/client';

const Projects = () => {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client.fetch('*[_type == "gallery"][0...5]')
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return null;
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
            <div key={project._id} className="project-item">
              <img src={project.image ? urlFor(project.image).url() : ''} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
