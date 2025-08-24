'use client';
import React, { useState, useEffect } from 'react';

export default function SciFiCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "อนาคตแห่งเทคโนโลจี",
      subtitle: "การปฏิวัติทางวิทยาศาสตร์",
      description: "สำรวจโลกแห่งอนาคตที่เทคโนโลยีก้าวล้ำผสานเข้ากับชีวิตประจำวัน"
    },
    {
      id: 2,
      title: "ระบบนิเวศดิจิทัล",
      subtitle: "การเชื่อมโยงไร้ขีดจำกัด",
      description: "เข้าสู่ยุคของการเชื่อมต่อที่ไร้ขีดจำกัดระหว่างมนุษย์และเทคโนโลยี"
    },
    {
      id: 3,
      title: "ปัญญาประดิษฐ์",
      subtitle: "อนาคตแห่งการเรียนรู้",
      description: "ค้นพบพลังของปัญญาประดิษฐ์ที่จะเปลี่ยนแปลงวิธีการทำงานและการใช้ชีวิต"
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 50%, #7c2d92 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'Arial, sans-serif'
    },
    backgroundParticles: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    },
    particle: {
      position: 'absolute',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    carouselContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '1152px',
      height: '24rem',
      background: 'linear-gradient(90deg, rgba(17, 24, 39, 0.8), rgba(30, 58, 138, 0.8), rgba(124, 45, 146, 0.8))',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(55, 65, 81, 0.5)',
      overflow: 'hidden',
      borderRadius: '1rem'
    },
    backgroundPattern: {
      position: 'absolute',
      inset: 0,
      opacity: 0.1
    },
    gradientOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(8, 145, 178, 0.2), rgba(168, 85, 247, 0.2))'
    },
    radialGradient: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle at 50% 50%, rgba(120, 119, 198, 0.1), transparent 50%)'
    },
    cornerDecoration: {
      position: 'absolute',
      width: '32px',
      height: '32px',
      border: '2px solid'
    },
    slidesContainer: {
      position: 'relative',
      height: '100%'
    },
    slide: {
      position: 'absolute',
      inset: 0,
      transition: 'all 0.7s ease'
    },
    slideContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '3rem'
    },
    slideInner: {
      textAlign: 'center',
      maxWidth: '64rem'
    },
    slideHeader: {
      marginBottom: '1.5rem'
    },
    slideTitle: {
      fontSize: 'clamp(2rem, 5vw, 4rem)',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #22d3ee, #3b82f6, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem'
    },
    titleUnderline: {
      width: '8rem',
      height: '4px',
      background: 'linear-gradient(90deg, #22d3ee, #a855f7)',
      margin: '0 auto 1rem',
      borderRadius: '2px'
    },
    slideSubtitle: {
      fontSize: 'clamp(1.25rem, 3vw, 2rem)',
      color: '#67e8f9',
      fontWeight: '300',
      marginBottom: '1.5rem'
    },
    slideDescription: {
      color: '#d1d5db',
      fontSize: '1.125rem',
      lineHeight: 1.7,
      maxWidth: '32rem',
      margin: '0 auto'
    },
    animatedDots: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem',
      gap: '1rem'
    },
    animatedDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#22d3ee',
      animation: 'pulse 2s infinite'
    },
    scanningLine: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
      transition: 'transform 2s ease'
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(17, 24, 39, 0.8)',
      border: '1px solid rgba(34, 211, 238, 0.3)',
      color: '#22d3ee',
      padding: '0.75rem',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(4px)',
      cursor: 'pointer',
      fontSize: '1.25rem'
    },
    prevButton: {
      left: '1rem'
    },
    nextButton: {
      right: '1rem'
    },
    indicators: {
      position: 'absolute',
      bottom: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '0.75rem'
    },
    indicator: {
      position: 'relative',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      padding: 0
    },
    indicatorDot: {
      borderRadius: '50%',
      transition: 'all 0.3s ease'
    },
    indicatorPing: {
      position: 'absolute',
      inset: 0,
      background: '#22d3ee',
      borderRadius: '50%',
      animation: 'ping 2s infinite',
      opacity: 0.3
    },
    autoPlayToggle: {
      position: 'absolute',
      top: '1rem',
      right: '4rem',
      padding: '0.5rem',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      border: '1px solid',
      cursor: 'pointer'
    },
    autoPlayDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      transition: 'all 0.3s ease'
    },
    statusText: {
      position: 'absolute',
      top: '0.5rem',
      right: '0.5rem',
      fontSize: '0.75rem',
      color: '#9ca3af',
      fontFamily: 'monospace'
    }
  };

  return (
    <div style={styles.container}>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { 
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% { 
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      `}</style>

      {/* Animated background elements */}
      <div style={styles.backgroundParticles}>
        <div style={{
          ...styles.particle, 
          top: '25%', 
          left: '25%', 
          width: '8px', 
          height: '8px', 
          background: '#22d3ee',
          opacity: 0.6
        }}></div>
        <div style={{
          ...styles.particle, 
          top: '75%', 
          right: '33%', 
          width: '4px', 
          height: '4px', 
          background: '#a855f7',
          opacity: 0.4,
          animation: 'ping 2s infinite'
        }}></div>
        <div style={{
          ...styles.particle, 
          bottom: '25%', 
          left: '33%', 
          width: '12px', 
          height: '12px', 
          background: '#3b82f6',
          opacity: 0.3,
          animation: 'bounce 2s infinite'
        }}></div>
        <div style={{
          ...styles.particle, 
          top: '50%', 
          right: '25%', 
          width: '4px', 
          height: '4px', 
          background: '#22c55e',
          opacity: 0.5
        }}></div>
      </div>

      <div style={styles.carouselContainer}>
        {/* Background pattern */}
        <div style={styles.backgroundPattern}>
          <div style={styles.gradientOverlay}></div>
          <div style={styles.radialGradient}></div>
        </div>

        {/* Corner decorations */}
        <div style={{
          ...styles.cornerDecoration,
          top: '1rem',
          left: '1rem',
          borderColor: 'rgba(34, 211, 238, 0.5)',
          borderRight: 'none',
          borderBottom: 'none'
        }}></div>
        <div style={{
          ...styles.cornerDecoration,
          top: '1rem',
          right: '1rem',
          borderColor: 'rgba(168, 85, 247, 0.5)',
          borderLeft: 'none',
          borderBottom: 'none'
        }}></div>
        <div style={{
          ...styles.cornerDecoration,
          bottom: '1rem',
          left: '1rem',
          borderColor: 'rgba(34, 197, 94, 0.5)',
          borderRight: 'none',
          borderTop: 'none'
        }}></div>
        <div style={{
          ...styles.cornerDecoration,
          bottom: '1rem',
          right: '1rem',
          borderColor: 'rgba(236, 72, 153, 0.5)',
          borderLeft: 'none',
          borderTop: 'none'
        }}></div>

        {/* Slides */}
        <div style={styles.slidesContainer}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                ...styles.slide,
                opacity: index === currentSlide ? 1 : 0,
                transform: index === currentSlide 
                  ? 'translateX(0)' 
                  : index < currentSlide 
                  ? 'translateX(-100%)' 
                  : 'translateX(100%)'
              }}
            >
              <div style={styles.slideContent}>
                <div style={styles.slideInner}>
                  <div style={styles.slideHeader}>
                    <h2 style={styles.slideTitle}>
                      {slide.title}
                    </h2>
                    <div style={styles.titleUnderline}></div>
                    <h3 style={styles.slideSubtitle}>
                      {slide.subtitle}
                    </h3>
                  </div>
                  <p style={styles.slideDescription}>
                    {slide.description}
                  </p>
                  
                  {/* Animated elements */}
                  <div style={styles.animatedDots}>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          ...styles.animatedDot,
                          animationDelay: `${i * 0.2}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scanning line effect */}
              <div style={{
                ...styles.scanningLine,
                transform: index === currentSlide ? 'translateX(100%)' : 'translateX(-100%)'
              }}></div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          style={{
            ...styles.navButton,
            ...styles.prevButton
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(31, 41, 55, 0.9)';
            e.target.style.borderColor = 'rgba(34, 211, 238, 0.6)';
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(17, 24, 39, 0.8)';
            e.target.style.borderColor = 'rgba(34, 211, 238, 0.3)';
            e.target.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          style={{
            ...styles.navButton,
            ...styles.nextButton
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(31, 41, 55, 0.9)';
            e.target.style.borderColor = 'rgba(34, 211, 238, 0.6)';
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(17, 24, 39, 0.8)';
            e.target.style.borderColor = 'rgba(34, 211, 238, 0.3)';
            e.target.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ›
        </button>

        {/* Slide indicators */}
        <div style={styles.indicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                ...styles.indicator,
                width: index === currentSlide ? '32px' : '12px',
                height: '12px'
              }}
            >
              <div style={{
                ...styles.indicatorDot,
                width: '100%',
                height: '100%',
                background: index === currentSlide ? '#22d3ee' : '#4b5563',
                transform: index === currentSlide ? 'scale(1.25)' : 'scale(1)'
              }}></div>
              {index === currentSlide && (
                <div style={styles.indicatorPing}></div>
              )}
            </button>
          ))}
        </div>

        {/* Auto-play toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          style={{
            ...styles.autoPlayToggle,
            background: isAutoPlaying ? 'rgba(34, 211, 238, 0.2)' : 'rgba(55, 65, 81, 0.5)',
            color: isAutoPlaying ? '#22d3ee' : '#9ca3af',
            borderColor: isAutoPlaying ? 'rgba(34, 211, 238, 0.3)' : 'rgba(75, 85, 99, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = isAutoPlaying ? 'rgba(34, 211, 238, 0.3)' : 'rgba(75, 85, 99, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = isAutoPlaying ? 'rgba(34, 211, 238, 0.2)' : 'rgba(55, 65, 81, 0.5)';
          }}
        >
          <div style={{
            ...styles.autoPlayDot,
            background: isAutoPlaying ? '#22d3ee' : '#9ca3af',
            animation: isAutoPlaying ? 'pulse 2s infinite' : 'none'
          }}></div>
        </button>

        {/* Status text */}
        <div style={styles.statusText}>
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}