'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function About() {
  const particlesRef = useRef(null);
  const [isVisible, setIsVisible] = useState({});

  // Create floating particles
  useEffect(() => {
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      const particleCount = 30;
      const colors = ['#00ffff', '#ff00ff', '#0080ff'];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;
        
        particlesRef.current.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  // Counter animation
  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        const target = counter.textContent;
        if (target === '∞' || target.includes('%') || target.includes('/')) return;
        
        const targetNum = parseInt(target);
        let current = 0;
        const increment = targetNum / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNum) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 20);
      });
    };

    setTimeout(animateCounters, 500);
  }, []);

  // Glitch effect
  useEffect(() => {
    const addGlitchEffect = () => {
      const title = document.querySelector('.page-title');
      if (!title) return;
      
      const interval = setInterval(() => {
        if (Math.random() > 0.95) {
          title.style.transform = 'translateX(' + (Math.random() * 6 - 3) + 'px)';
          setTimeout(() => {
            title.style.transform = 'translateX(0)';
          }, 100);
        }
      }, 2000);

      return () => clearInterval(interval);
    };

    addGlitchEffect();
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.dataset.id]: true
          }));
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        body {
          background: linear-gradient(45deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 128, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: -1;
        }

        .main-container {
          padding: 120px 20px 50px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-title {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 3.5rem;
          text-align: center;
          margin-bottom: 3rem;
          background: linear-gradient(45deg, #00ffff, #ff00ff, #00ffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
          position: relative;
          animation: titleGlow 3s ease-in-out infinite alternate;
        }

        @keyframes titleGlow {
          0% { text-shadow: 0 0 30px rgba(0, 255, 255, 0.5); }
          100% { text-shadow: 0 0 50px rgba(255, 0, 255, 0.7); }
        }

        .page-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ffff, transparent);
          box-shadow: 0 0 10px #00ffff;
          animation: lineGlow 2s ease-in-out infinite alternate;
        }

        @keyframes lineGlow {
          0% { box-shadow: 0 0 10px #00ffff; }
          100% { box-shadow: 0 0 20px #ff00ff; }
        }

        .sci-fi-card {
          background: rgba(0, 0, 0, 0.7);
          border: 2px solid #00ffff;
          border-radius: 15px;
          padding: 2rem;
          margin: 2rem 0;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.3),
            inset 0 0 20px rgba(0, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .sci-fi-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #00ffff, #ff00ff, #00ffff, #ff00ff);
          z-index: -1;
          border-radius: 15px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .sci-fi-card:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 10px 40px rgba(0, 255, 255, 0.4),
            inset 0 0 30px rgba(0, 255, 255, 0.2);
        }

        .sci-fi-card:hover::before {
          opacity: 0.7;
          animation: borderPulse 2s infinite;
        }

        @keyframes borderPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .intro-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: #b0b8c4;
          text-align: center;
          margin-bottom: 2rem;
        }

        .highlight {
          color: #00ffff;
          text-shadow: 0 0 10px #00ffff;
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .stat-item {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid #00ffff;
          border-radius: 10px;
          padding: 2rem 1rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .stat-item:hover::before {
          left: 100%;
        }

        .stat-item:hover {
          border-color: #ff00ff;
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.4);
          transform: translateY(-5px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #00ffff;
          font-family: 'Orbitron', monospace;
          display: block;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
        }

        .stat-item:hover .stat-number {
          color: #ff00ff;
          text-shadow: 0 0 15px #ff00ff;
        }

        .stat-label {
          color: #b0b8c4;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .feature-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .feature-card {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid #00ffff;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00ffff, #ff00ff);
          transition: width 0.5s ease;
        }

        .feature-card:hover::after {
          width: 100%;
        }

        .feature-card:hover {
          border-color: #ff00ff;
          box-shadow: 0 0 25px rgba(255, 0, 255, 0.4);
        }

        .feature-icon {
          font-size: 2.5rem;
          color: #00ffff;
          margin-bottom: 1rem;
          display: block;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          color: #ff00ff;
          transform: scale(1.1) rotate(5deg);
        }

        .feature-title {
          color: #00ffff;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          font-family: 'Orbitron', monospace;
        }

        .feature-desc {
          color: #b0b8c4;
          line-height: 1.6;
        }

        .floating-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #00ffff;
          border-radius: 50%;
          animation: float 15s infinite linear;
          box-shadow: 0 0 10px #00ffff;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-link {
          position: fixed;
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid #00ffff;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          color: #00ffff;
          text-decoration: none;
          font-family: 'Orbitron', monospace;
          font-weight: 600;
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .nav-link:hover {
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
          color: #ff00ff;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }
          
          .main-container {
            padding: 80px 15px 30px;
          }
        }
      `}</style>

      {/* Navigation Link */}
      <Link href="/" className="nav-link">
        ← Back to Home
      </Link>

      {/* Floating Particles */}
      <div className="floating-particles" ref={particlesRef}></div>

      <div className="main-container">
        <h1 className="page-title">SYSTEM PROFILE</h1>
        
        {/* Introduction */}
        <div className={`sci-fi-card fade-in ${isVisible.intro ? 'visible' : ''}`} 
             data-animate data-id="intro">
          <div className="intro-text">
            <span className="highlight">PETCHRAPEEPHAT</span> represents the convergence of 
            human innovation and artificial intelligence. Our mission transcends conventional 
            boundaries, creating pathways between digital consciousness and human potential.
            <br/><br/>
            Through advanced neural mapping and quantum processing, we've developed a 
            revolutionary platform that bridges the gap between imagination and reality.
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-grid">
          <div className={`stat-item fade-in ${isVisible.stat1 ? 'visible' : ''}`} 
               data-animate data-id="stat1">
            <span className="stat-number">∞</span>
            <div className="stat-label">Quantum Processes</div>
          </div>
          <div className={`stat-item fade-in ${isVisible.stat2 ? 'visible' : ''}`} 
               data-animate data-id="stat2">
            <span className="stat-number">99.9%</span>
            <div className="stat-label">System Uptime</div>
          </div>
          <div className={`stat-item fade-in ${isVisible.stat3 ? 'visible' : ''}`} 
               data-animate data-id="stat3">
            <span className="stat-number">24/7</span>
            <div className="stat-label">Neural Monitoring</div>
          </div>
          <div className={`stat-item fade-in ${isVisible.stat4 ? 'visible' : ''}`} 
               data-animate data-id="stat4">
            <span className="stat-number">2045</span>
            <div className="stat-label">Future Ready</div>
          </div>
        </div>

        {/* Features */}
        <div className="row">
          <div className="col-md-6">
            <div className={`sci-fi-card fade-in ${isVisible.core ? 'visible' : ''}`} 
                 data-animate data-id="core">
              <h3 className="highlight mb-3">CORE SYSTEMS</h3>
              <div className="feature-section">
                <div className="feature-card">
                  <i className="bi bi-cpu feature-icon">🖥️</i>
                  <h4 className="feature-title">Quantum Neural Networks</h4>
                  <p className="feature-desc">Advanced processing using quantum entanglement principles</p>
                </div>
                <div className="feature-card">
                  <i className="bi bi-hdd feature-icon">💾</i>
                  <h4 className="feature-title">Holographic Storage</h4>
                  <p className="feature-desc">Multi-dimensional data storage with infinite capacity</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className={`sci-fi-card fade-in ${isVisible.capabilities ? 'visible' : ''}`} 
                 data-animate data-id="capabilities">
              <h3 className="highlight mb-3">CAPABILITIES</h3>
              <div className="feature-section">
                <div className="feature-card">
                  <i className="bi bi-lightning feature-icon">⚡</i>
                  <h4 className="feature-title">Real-time Analysis</h4>
                  <p className="feature-desc">Instantaneous data processing at light speed</p>
                </div>
                <div className="feature-card">
                  <i className="bi bi-graph-up feature-icon">📈</i>
                  <h4 className="feature-title">Predictive Modeling</h4>
                  <p className="feature-desc">AI-powered future scenario generation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className={`sci-fi-card mt-4 fade-in ${isVisible.mission ? 'visible' : ''}`} 
             data-animate data-id="mission">
          <h3 className="highlight text-center mb-3">MISSION DIRECTIVE</h3>
          <div className="row">
            <div className="col-md-4 text-center">
              <i className="bi bi-bullseye feature-icon">🎯</i>
              <h5 className="highlight">INNOVATE</h5>
              <p className="text-muted">Push the boundaries of what's possible through cutting-edge technology</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-people feature-icon">👥</i>
              <h5 className="highlight">CONNECT</h5>
              <p className="text-muted">Bridge human consciousness with digital intelligence</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-rocket feature-icon">🚀</i>
              <h5 className="highlight">EVOLVE</h5>
              <p className="text-muted">Continuously adapt and enhance our neural capabilities</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}