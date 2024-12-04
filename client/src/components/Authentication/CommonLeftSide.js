// CommonLeftSide.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CommonLeftSide = ({ slides }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{
        padding: '40px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
      }}>
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          transitionTime={1000}
          swipeable
          emulateTouch
        >
          {slides.map(slide => (
            <div key={slide.id} style={{
              backgroundImage: `url(${slide.image})`,
              height: '70vh',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 4,
              padding: 6,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
            }}>
              <span style={{ visibility: 'hidden' }}>dumPlaceholder</span>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CommonLeftSide;
