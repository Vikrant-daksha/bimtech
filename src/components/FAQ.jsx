import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "CCTV installation kitne time me ho jata hai?",
    answer: "Usually 1 day ke andar complete ho jata hai."
  },
  {
    question: "Kya aap home service dete ho?",
    answer: "Haan, hum home aur office dono ke liye service provide karte hain."
  },
  {
    question: "Payment options kya hai?",
    answer: "Cash, Online, aur EMI options available hain (including 0% Down Payment via Bajaj Finance)."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    // We compare numbers (primitives), not objects!
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <section className="faq-section" style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="section-subtitle">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="title-underline" style={{ margin: '0 auto' }}></div>
        </div>

        <div className="faq-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
              style={{ 
                marginBottom: '15px', 
                border: '1px solid #f0f0f0', 
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
                style={{ 
                  padding: '20px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  background: openIndex === index ? '#f8f9fa' : '#fff',
                  fontWeight: '600',
                  color: '#051937'
                }}
              >
                {item.question}
                {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {openIndex === index && (
                <div className="faq-answer" style={{ padding: '20px', background: '#fff', color: '#555', borderTop: '1px solid #f0f0f0' }}>
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
