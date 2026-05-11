import React from 'react';
import { Shield, Target, Eye, Cpu, Users, Award, Zap, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page" style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', overflow: 'hidden' }}>

      {/* --- HERO SECTION --- */}
      <section style={{
        padding: '120px 0 80px',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '30px',
              color: '#020617',
              letterSpacing: '-2px'
            }}>
              Defining the Future of <br />
              <span style={{
                background: 'linear-gradient(to right, #0891b2, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>IT Infrastructure</span>
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#475569',
              lineHeight: '1.6',
              maxWidth: '700px',
              margin: '0 auto 50px'
            }}>
              BIMTECH IT SOLUTIONS is more than a service provider. We are your strategic partners in navigating the complex world of security and IT connectivity.
            </p>
          </div>
        </div>

        {/* Subtle Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'rgba(34, 211, 238, 0.1)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
      </section>

      {/* --- MISSION & VISION (MODERN LIGHT CARDS) --- */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

            {/* Mission Card */}
            <div style={{
              padding: '40px',
              borderRadius: '24px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '30px',
                boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)'
              }}>
                <Target color="white" size={30} />
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px', color: '#0f172a' }}>Our Mission</h2>
              <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.7' }}>
                To empower businesses and residential spaces with cutting-edge security and IT solutions that are reliable, scalable, and futuristic, ensuring maximum protection and seamless connectivity.
              </p>
            </div>

            {/* Vision Card */}
            <div style={{
              padding: '40px',
              borderRadius: '24px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '30px',
                boxShadow: '0 10px 20px rgba(139, 92, 246, 0.2)'
              }}>
                <Eye color="white" size={30} />
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px', color: '#0f172a' }}>Our Vision</h2>
              <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.7' }}>
                To lead the IT infrastructure landscape in Mumbai and beyond, becoming the first choice for security systems and technical support through constant innovation and unmatched service quality.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '20px', color: '#0f172a' }}>Our Core Pillars</h2>
            <div style={{ width: '60px', height: '4px', background: '#3b82f6', margin: '0 auto', borderRadius: '2px' }}></div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '25px'
          }}>
            {[
              { icon: <Shield size={24} />, title: "Ironclad Security", desc: "Military-grade CCTV and surveillance setups for absolute peace of mind." },
              { icon: <Cpu size={24} />, title: "Smart Tech", desc: "Leveraging the latest in AI-powered attendance and hardware diagnostics." },
              { icon: <Zap size={24} />, title: "Instant Support", desc: "Rapid response times that minimize your business downtime." },
              { icon: <Users size={24} />, title: "Client First", desc: "Tailoring every solution to the unique needs of our diverse clientele." },
              { icon: <Award size={24} />, title: "Certified Expertise", desc: "Professional technicians with years of hands-on industry experience." },
              { icon: <Globe size={24} />, title: "Future Ready", desc: "Scalable infrastructure that grows as your business expands." }
            ].map((value, idx) => (
              <div key={idx} style={{
                padding: '30px',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ color: '#2563eb', marginBottom: '20px' }}>{value.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#0f172a' }}>{value.title}</h3>
                <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section style={{ padding: '120px 0' }}>
        <div className="container">
          <div style={{
            padding: '80px 40px',
            borderRadius: '40px',
            background: '#ffffff',
            textAlign: 'center',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '30px' }}>Ready to Secure Your Future?</h2>
            <p style={{ fontSize: '20px', color: '#475569', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
              Experience the 2026 standard of IT support today. Let's build your infrastructure together.
            </p>
            <a href="tel:+918169670476" style={{
              display: 'inline-block',
              padding: '16px 40px',
              borderRadius: '12px',
              background: '#2563eb',
              color: '#fff',
              fontWeight: '700',
              fontSize: '18px',
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)'
            }}>
              Contact Us Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
