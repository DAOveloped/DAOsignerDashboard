import React, { useEffect, useState } from 'react';
import './Matrix.css'; 

const Matrix = () => {
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section-col');
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveItem(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="section-fluid-main">
      {/* Your existing code */}
      <div className="status-bar">
        {/* Render status bar indicators based on activeItem */}
        {/* Example: Dots representing each section */}
        <div className={`status-dot ${activeItem === 'section1' && 'active'}`} />
        <div className={`status-dot ${activeItem === 'section2' && 'active'}`} />
        {/* Add more dots for each section */}
      </div>
      {/* Your existing content */}
    </div>
  );
};

export default Matrix;
