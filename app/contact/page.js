'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function About() {
  const particlesRef = useRef(null);
  const [isVisible, setIsVisible] = useState({});
  const [counters, setCounters] = useState({
    processes: 0,
    uptime: 0,
    monitoring: 0,
    future: 0
  });

  // Create floating particles
  useEffect(() => {
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      const particleCount = 30;
      const colors = ['#00ffff', '#ff00ff', '#0080ff'];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;
        particle.style.animation = 'float 15s infinite linear';
        
        particlesRef.current.appendChild(particle);
      }
    };

    // Add global CSS for animations
    const style = document.createElement('style');
    style.textContent = `
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
      .particle {
        animation: float 15s infinite linear;
      }
      .glow {
        text-shadow: 0 0 10px #00ffff;
      }
    `;
    document.head.appendChild(style);

    createParticles();

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Counter animation
  useEffect(() => {
    const animateCounter = (target, key, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 50);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCounters(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 50);
    };

    setTimeout(() => {
      animateCounter(999, 'processes', 3000);
      animateCounter(99, 'uptime', 2000);
      animateCounter(24, 'monitoring', 1500);
      animateCounter(2045, 'future', 4000);
    }, 500);
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

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-cyan-300 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Link */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 bg-black/70 border border-cyan-400/50 rounded-lg px-4 py-2 text-cyan-400 hover:text-purple-400 hover:border-purple-400/50 hover:bg-purple-400/10 transition-all duration-300 font-mono font-semibold hover:shadow-lg hover:shadow-purple-400/20"
      >
        ← Back to Home
      </Link>

      {/* Floating Particles */}
      <div 
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-0"
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="page-title text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            SYSTEM PROFILE
          </h1>
          <div className="h-1 w-48 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto animate-pulse"></div>
        </div>

        {/* Introduction */}
        <div 
          className={`bg-black/60 border border-cyan-400/50 rounded-2xl p-8 mb-12 backdrop-blur-lg shadow-2xl shadow-cyan-400/20 transition-all duration-700 ${
            isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          data-animate 
          data-id="intro"
        >
          <div className="text-xl text-center text-gray-300 leading-relaxed">
            <span className="text-cyan-400 font-semibold glow">PETCHRAPEEPHAT</span> represents the convergence of 
            human innovation and artificial intelligence. Our mission transcends conventional 
            boundaries, creating pathways between digital consciousness and human potential.
            <br/><br/>
            Through advanced neural mapping and quantum processing, we've developed a 
            revolutionary platform that bridges the gap between imagination and reality.
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div 
            className={`bg-black/50 border border-cyan-400/50 rounded-xl p-6 text-center hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-400/20 transition-all duration-300 hover:-translate-y-2 ${
              isVisible.stat1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate 
            data-id="stat1"
          >
            <div className="text-4xl font-bold text-cyan-400 font-mono mb-2">∞</div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">Quantum Processes</div>
          </div>
          
          <div 
            className={`bg-black/50 border border-cyan-400/50 rounded-xl p-6 text-center hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-400/20 transition-all duration-300 hover:-translate-y-2 ${
              isVisible.stat2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate 
            data-id="stat2"
          >
            <div className="text-4xl font-bold text-cyan-400 font-mono mb-2">{counters.uptime}.9%</div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">System Uptime</div>
          </div>
          
          <div 
            className={`bg-black/50 border border-cyan-400/50 rounded-xl p-6 text-center hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-400/20 transition-all duration-300 hover:-translate-y-2 ${
              isVisible.stat3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate 
            data-id="stat3"
          >
            <div className="text-4xl font-bold text-cyan-400 font-mono mb-2">{counters.monitoring}/7</div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">Neural Monitoring</div>
          </div>
          
          <div 
            className={`bg-black/50 border border-cyan-400/50 rounded-xl p-6 text-center hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-400/20 transition-all duration-300 hover:-translate-y-2 ${
              isVisible.stat4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate 
            data-id="stat4"
          >
            <div className="text-4xl font-bold text-cyan-400 font-mono mb-2">{counters.future}</div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">Future Ready</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Core Systems */}
          <div 
            className={`bg-black/60 border border-cyan-400/50 rounded-2xl p-8 backdrop-blur-lg shadow-xl shadow-cyan-400/20 hover:border-purple-400/50 hover:shadow-purple-400/20 transition-all duration-500 ${
              isVisible.core ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate 
            data-id="core"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">CORE SYSTEMS</h3>
            
            <div className="space-y-4">
              <div className="bg-black/40 border border-cyan-400/30 rounded-xl p-4 hover:border-purple-400/50 transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🖥️</div>
                <h4 className="text-cyan-400 font-bold mb-2 font-mono">Quantum Neural Networks</h4>
                <p className="text-gray-400 text-sm">Advanced processing using quantum entanglement principles</p>
              </div>
              
              <div className="bg-black/40 border border-cyan-400/30 rounded-xl p-4 hover:border-purple-400/50 transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">💾</div>
                <h4 className="text-cyan-400 font-bold mb-2 font-mono">Holographic Storage</h4>
                <p className="text-gray-400 text-sm">Multi-dimensional data storage with infinite capacity</p>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div 
            className={`bg-black/60 border border-cyan-400/50 rounded-2xl p-8 backdrop-blur-lg shadow-xl shadow-cyan-400/20 hover:border-purple-400/50 hover:shadow-purple-400/20 transition-all duration-500 ${
              isVisible.capabilities ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate 
            data-id="capabilities"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">CAPABILITIES</h3>
            
            <div className="space-y-4">
              <div className="bg-black/40 border border-cyan-400/30 rounded-xl p-4 hover:border-purple-400/50 transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <h4 className="text-cyan-400 font-bold mb-2 font-mono">Real-time Analysis</h4>
                <p className="text-gray-400 text-sm">Instantaneous data processing at light speed</p>
              </div>
              
              <div className="bg-black/40 border border-cyan-400/30 rounded-xl p-4 hover:border-purple-400/50 transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📈</div>
                <h4 className="text-cyan-400 font-bold mb-2 font-mono">Predictive Modeling</h4>
                <p className="text-gray-400 text-sm">AI-powered future scenario generation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div 
          className={`bg-black/60 border border-cyan-400/50 rounded-2xl p-8 backdrop-blur-lg shadow-xl shadow-cyan-400/20 hover:border-purple-400/50 hover:shadow-purple-400/20 transition-all duration-500 ${
            isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          data-animate 
          data-id="mission"
        >
          <h3 className="text-3xl font-bold text-cyan-400 mb-8 text-center">MISSION DIRECTIVE</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🎯</div>
              <h5 className="text-cyan-400 font-bold mb-3 text-xl">INNOVATE</h5>
              <p className="text-gray-400">Push the boundaries of what's possible through cutting-edge technology</p>
            </div>
            
            <div className="text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">👥</div>
              <h5 className="text-cyan-400 font-bold mb-3 text-xl">CONNECT</h5>
              <p className="text-gray-400">Bridge human consciousness with digital intelligence</p>
            </div>
            
            <div className="text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🚀</div>
              <h5 className="text-cyan-400 font-bold mb-3 text-xl">EVOLVE</h5>
              <p className="text-gray-400">Continuously adapt and enhance our neural capabilities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}