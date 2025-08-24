'use client';
import React, { useState } from 'react';

export default function SciFiCards() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: "นาโนเทคโนโลยี",
      description: "สำรวจเทคโนโลยีระดับโมเลกุลที่จะเปลี่ยนแปลงโลกในอนาคต ด้วยการควบคุมสสารในระดับอะตอม เราสามารถสร้างวัสดุที่แข็งแกร่งกว่าและมีประสิทธิภาพสูงสุด การพัฒนานาโนเทคโนโลยีจะนำไปสู่การปฏิวัติในด้านการแพทย์ วิศวกรรม และการผลิตพลังงานสะอาด",
      icon: "💻",
      color: "cyan"
    },
    {
      id: 2,
      title: "ระบบประสาทเทียม",
      description: "การพัฒนาปัญญาประดิษฐ์ที่มีความสามารถในการเรียนรู้และปรับตัวเหมือนสมองมนุษย์ เพื่อสร้างระบบที่สามารถคิดและตัดสินใจได้อย่างอัตโนมัติ ระบบนี้จะช่วยในการประมวลผลข้อมูลขนาดใหญ่และการแก้ปัญหาที่ซับซ้อน",
      icon: "🧠",
      color: "purple"
    },
    {
      id: 3,
      title: "พลังงานควอนตัม",
      description: "การควบคุมและใช้ประโยชน์จากหลักการของฟิสิกส์ควอนตัมในการสร้างพลังงานสะอาดและมีประสิทธิภาพสูง เทคโนโลยีนี้จะเป็นกุญแจสำคัญในการแก้ไขปัญหาพลังงานโลกและสร้างอนาคตที่ยั่งยืน",
      icon: "⚡",
      color: "green"
    }
  ];

  const getGradient = (color) => {
    switch(color) {
      case 'cyan': return 'linear-gradient(135deg, #22d3ee, #2563eb)';
      case 'purple': return 'linear-gradient(135deg, #a855f7, #ec4899)';
      case 'green': return 'linear-gradient(135deg, #22c55e, #059669)';
      default: return 'linear-gradient(135deg, #22d3ee, #2563eb)';
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 50%, #7c2d92 100%)',
      padding: '3rem 1rem',
      position: 'relative',
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
    mainContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    title: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #22d3ee, #3b82f6, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem'
    },
    titleUnderline: {
      width: '6rem',
      height: '4px',
      background: 'linear-gradient(90deg, #22d3ee, #3b82f6)',
      margin: '1.5rem auto',
      borderRadius: '2px'
    },
    subtitle: {
      color: '#d1d5db',
      fontSize: '1.125rem',
      maxWidth: '32rem',
      margin: '1.5rem auto 0'
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
      padding: '0'
    },
    cardWrapper: {
      position: 'relative'
    },
    cardGlow: {
      position: 'absolute',
      inset: '-4px',
      borderRadius: '1rem',
      opacity: 0.2,
      filter: 'blur(8px)',
      transition: 'opacity 0.5s ease, filter 0.5s ease'
    },
    card: {
      position: 'relative',
      background: 'rgba(17, 24, 39, 0.9)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(55, 65, 81, 0.5)',
      borderRadius: '1rem',
      padding: '2rem',
      height: '100%',
      transition: 'all 0.5s ease',
      cursor: 'pointer'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    iconContainer: {
      padding: '1rem',
      borderRadius: '0.75rem',
      color: 'white',
      fontSize: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '4rem',
      height: '4rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
    },
    cardTitle: {
      marginLeft: '1.5rem'
    },
    cardTitleText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0.5rem'
    },
    cardTitleLine: {
      width: '4rem',
      height: '2px',
      borderRadius: '1px'
    },
    hologramContainer: {
      position: 'relative',
      marginBottom: '2rem',
      height: '14rem',
      borderRadius: '0.75rem',
      overflow: 'hidden',
      background: 'rgba(31, 41, 55, 0.4)',
      border: '1px solid rgba(55, 65, 81, 0.3)'
    },
    hologramContent: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(31, 41, 55, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    spinner: {
      position: 'relative',
      width: '5rem',
      height: '5rem',
      border: '2px solid #22d3ee',
      borderRadius: '50%',
      transform: 'rotate(45deg)',
      animation: 'spin 3s linear infinite'
    },
    spinnerInner: {
      position: 'absolute',
      inset: '8px',
      border: '1px solid rgba(168, 85, 247, 0.2)',
      borderRadius: '50%',
      transform: 'rotate(45deg)'
    },
    spinnerCore: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '12px',
      height: '12px',
      background: '#22d3ee',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    cardDescription: {
      color: '#d1d5db',
      lineHeight: 1.7,
      fontSize: '0.875rem',
      marginBottom: '1.5rem'
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      fontSize: '0.75rem',
      color: '#9ca3af'
    },
    statusIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    progressContainer: {
      marginBottom: '1rem'
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.75rem',
      color: '#9ca3af',
      marginBottom: '0.5rem'
    },
    progressBar: {
      width: '100%',
      background: '#1f2937',
      borderRadius: '9999px',
      height: '8px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '8px',
      borderRadius: '9999px',
      transition: 'width 0.7s ease',
      position: 'relative'
    },
    progressGlow: {
      width: '100%',
      height: '100%',
      background: 'rgba(255,255,255,0.2)',
      animation: 'pulse 2s infinite'
    },
    actionButton: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      color: 'white',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },
    bottomDecoration: {
      marginTop: '5rem',
      textAlign: 'center'
    },
    systemStatus: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.75rem 1.5rem',
      background: 'rgba(17, 24, 39, 0.5)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(55, 65, 81, 0.3)',
      borderRadius: '9999px',
      color: '#9ca3af',
      fontSize: '0.875rem',
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
        @keyframes spin {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
      
      {/* Background particles */}
      <div style={styles.backgroundParticles}>
        <div style={{...styles.particle, top: '25%', left: '25%', width: '8px', height: '8px', background: '#22d3ee'}}></div>
        <div style={{...styles.particle, top: '75%', right: '33%', width: '4px', height: '4px', background: '#a855f7'}}></div>
        <div style={{...styles.particle, bottom: '25%', left: '33%', width: '12px', height: '12px', background: '#3b82f6'}}></div>
        <div style={{...styles.particle, top: '50%', right: '25%', width: '4px', height: '4px', background: '#22c55e'}}></div>
      </div>

      <div style={styles.mainContainer}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>กิจกรรมที่เกี่ยวข้อง</h1>
          <div style={styles.titleUnderline}></div>
          <p style={styles.subtitle}>
            ค้นพบเทคโนโลยีล้ำสมัยที่จะเปลี่ยนแปลงอนาคตของเรา
          </p>
        </div>

        {/* Cards Grid */}
        <div style={styles.cardsGrid}>
          {cards.map((card) => (
            <div
              key={card.id}
              style={styles.cardWrapper}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card glow effect */}
              <div 
                style={{
                  ...styles.cardGlow,
                  background: getGradient(card.color),
                  opacity: hoveredCard === card.id ? 0.4 : 0.2,
                  filter: hoveredCard === card.id ? 'blur(12px)' : 'blur(8px)'
                }}
              ></div>
              
              {/* Main card */}
              <div 
                style={{
                  ...styles.card,
                  transform: hoveredCard === card.id ? 'scale(1.05) translateY(-8px)' : 'scale(1)',
                  borderColor: hoveredCard === card.id ? 'rgba(75, 85, 99, 0.8)' : 'rgba(55, 65, 81, 0.5)'
                }}
              >
                {/* Card header */}
                <div style={styles.cardHeader}>
                  <div 
                    style={{
                      ...styles.iconContainer,
                      background: getGradient(card.color)
                    }}
                  >
                    {card.icon}
                  </div>
                  <div style={styles.cardTitle}>
                    <h3 style={styles.cardTitleText}>{card.title}</h3>
                    <div 
                      style={{
                        ...styles.cardTitleLine,
                        background: getGradient(card.color)
                      }}
                    ></div>
                  </div>
                </div>

                {/* Holographic display */}
                <div style={styles.hologramContainer}>
                  <div 
                    style={{
                      ...styles.hologramContainer,
                      position: 'absolute',
                      inset: 0,
                      background: getGradient(card.color),
                      opacity: 0.1
                    }}
                  ></div>
                  <div style={styles.hologramContent}>
                    <div style={styles.spinner}>
                      <div style={styles.spinnerInner}></div>
                      <div style={styles.spinnerCore}></div>
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <p style={styles.cardDescription}>
                  {card.description}
                </p>

                {/* Stats */}
                <div style={styles.statsContainer}>
                  <div style={styles.statusIndicator}>
                    <div 
                      style={{
                        ...styles.statusDot,
                        background: getGradient(card.color)
                      }}
                    ></div>
                    <span>สถานะ: ออนไลน์</span>
                  </div>
                  <div style={{fontFamily: 'monospace'}}>ID: {String(card.id).padStart(3, '0')}</div>
                </div>

                {/* Progress bar */}
                <div style={styles.progressContainer}>
                  <div style={styles.progressHeader}>
                    <span>ความคืบหน้า</span>
                    <span>{hoveredCard === card.id ? '100%' : '67%'}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: hoveredCard === card.id ? '100%' : '67%',
                        background: getGradient(card.color)
                      }}
                    >
                      <div style={styles.progressGlow}></div>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <button 
                  style={{
                    ...styles.actionButton,
                    background: getGradient(card.color),
                    transform: hoveredCard === card.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = '0 8px 25px rgba(34, 211, 238, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                  }}
                >
                  เรียนรู้เพิ่มเติม
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div style={styles.bottomDecoration}>
          <div style={styles.systemStatus}>
            <div style={{...styles.statusDot, background: '#22d3ee'}}></div>
            <span>SYSTEM_STATUS: OPERATIONAL</span>
            <div style={{...styles.statusDot, background: '#22c55e', animation: 'ping 2s infinite'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}