import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ScrollToTop from './components/ScrollToTop';
import { WhatsAppIcon } from './components/SocialIcons';

import ServicesSection from './components/Services';
import AboutSection from './components/AboutSection';
import Projects from './components/Projects';
import TestimonialsSection from './components/Testimonials';
import ContactCTA from './components/ContactCTA';
import ServiceDetail from './components/ServiceDetail';
import FAQ from './components/FAQ';
import SpecialOffers from './components/SpecialOffers';
import ProductDetail from './components/ProductDetail';

// New Pages
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import AMCPlans from './pages/AMCPlans';
import Offers from './pages/Offers';
import Support from './pages/Support';

function Home() {
  return (
    <div className="home-page">
      <Hero />
      <ServicesSection />
      <AboutSection />
      <SpecialOffers />
      <Projects />
      <TestimonialsSection />
      <FAQ />
      <ContactCTA />
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/amc-plans" element={<AMCPlans />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918169670476"
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#25D366',
          color: 'white',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          zIndex: 1000,
          textDecoration: 'none',
          fontSize: '32px'
        }}
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon size={32} />
      </a>
    </div>
  );
}

export default App;
