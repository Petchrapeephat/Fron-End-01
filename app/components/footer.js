"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style jsx>{`
        .scifi-footer {
          background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          border-top: 2px solid #00ffff;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .scifi-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffff, transparent);
          animation: pulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes pulse {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        
        .scifi-section-title {
          color: #00ffff;
          font-family: 'Orbitron', monospace;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 10px #00ffff;
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .scifi-section-title::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, #00ffff, transparent);
        }
        
        .scifi-nav-link {
          color: #b0b8c4 !important;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 400;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          padding: 5px 0;
          border-left: 2px solid transparent;
          padding-left: 10px;
        }
        
        .scifi-nav-link:hover {
          color: #00ffff !important;
          text-shadow: 0 0 8px #00ffff;
          border-left-color: #00ffff;
          padding-left: 15px;
          transform: translateX(5px);
        }
        
        .scifi-newsletter {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid #00ffff;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }
        
        .scifi-newsletter h5 {
          color: #ff00ff;
          font-family: 'Orbitron', monospace;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 0 10px #ff00ff;
        }
        
        .scifi-newsletter p {
          color: #b0b8c4;
          font-family: 'Rajdhani', sans-serif;
        }
        
        .scifi-input {
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid #00ffff;
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.2);
        }
        
        .scifi-input::placeholder {
          color: #6c757d;
        }
        
        .scifi-input:focus {
          background: rgba(0, 0, 0, 0.8);
          border-color: #ff00ff;
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.4);
          color: #ff00ff;
        }
        
        .scifi-btn-subscribe {
          background: linear-gradient(45deg, #ff00ff, #8000ff);
          border: none;
          color: #fff;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: 'Rajdhani', sans-serif;
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.4);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .scifi-btn-subscribe::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        
        .scifi-btn-subscribe:hover::before {
          left: 100%;
        }
        
        .scifi-btn-subscribe:hover {
          background: linear-gradient(45deg, #00ffff, #0080ff);
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.8);
          transform: translateY(-2px);
        }
        
        .scifi-copyright {
          color: #6c757d;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
        }
        
        .scifi-social-link {
          color: #b0b8c4;
          transition: all 0.3s ease;
          padding: 10px;
          border: 1px solid transparent;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
        }
        
        .scifi-social-link:hover {
          color: #00ffff;
          border-color: #00ffff;
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
          transform: translateY(-3px) scale(1.1);
        }
        
        .scifi-grid-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Rajdhani:wght@300;400;500;600&display=swap');
      `}</style>
      
      <div className="container-fluid">
        <footer className="py-5 scifi-footer">
          <div className="scifi-grid-bg"></div>
          <div className="position-relative">
            <div className="row">
              <div className="col-6 col-md-2 mb-3">
                <h5 className="scifi-section-title">NAVIGATION</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      Central Hub
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      Neural Features
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      Data Pricing
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      System FAQ
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      Core Protocol
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="col-6 col-md-2 mb-3">
                <h5 className="scifi-section-title">SERVICES</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      Quantum Computing
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      AI Integration
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      Data Mining
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      Cyber Security
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      Neural Networks
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="col-6 col-md-2 mb-3">
                <h5 className="scifi-section-title">RESOURCES</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      Data Archives
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      Code Repository
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      API Documentation
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      System Updates
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link href="#" className="scifi-nav-link">
                      Tech Support
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="col-md-5 offset-md-1 mb-3">
                <div className="scifi-newsletter">
                  <form>
                    <h5>Neural Network Updates</h5>
                    <p>Subscribe to receive encrypted transmissions of our latest quantum developments.</p>
                    <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                      <label htmlFor="newsletter1" className="visually-hidden">
                        Neural Address
                      </label>
                      <input
                        id="newsletter1"
                        type="email"
                        className="form-control scifi-input"
                        placeholder="neural.address@cyberspace.net"
                      />
                      <button className="btn scifi-btn-subscribe" type="button">
                        CONNECT
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4" style={{borderTop: '1px solid #00ffff'}}>
              <p className="scifi-copyright">© 2025 CyberTech Corporation. All neural patterns reserved.</p>
              <ul className="list-unstyled d-flex">
                <li className="ms-3">
                  <Link className="scifi-social-link" href="#" aria-label="Neural Instagram">
                    <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </Link>
                </li>
                <li className="ms-3">
                  <Link className="scifi-social-link" href="#" aria-label="Neural Facebook">
                    <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </Link>
                </li>
                <li className="ms-3">
                  <Link className="scifi-social-link" href="#" aria-label="Neural Twitter">
                    <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}