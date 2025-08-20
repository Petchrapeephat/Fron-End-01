"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSuccess(true);
      setEmail("");
    }
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        .scifi-login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          position: relative;
          overflow: hidden;
          padding-top: 70px;
        }
        
        .scifi-login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, #00ffff 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, #ff00ff 0%, transparent 50%);
          opacity: 0.1;
          animation: pulse 4s ease-in-out infinite alternate;
        }
        
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: matrix-scroll 20s linear infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 0.1; }
          100% { opacity: 0.2; }
        }
        
        @keyframes matrix-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes glow-border {
          0%, 100% { 
            border-color: #ff4500;
            box-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
          }
          50% { 
            border-color: #ff00ff;
            box-shadow: 0 0 30px rgba(255, 0, 255, 0.7);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .scifi-login-box {
          max-width: 450px;
          background: rgba(0, 0, 0, 0.9);
          border: 2px solid #ff4500;
          border-radius: 20px;
          box-shadow: 
            0 0 30px rgba(255, 69, 0, 0.4),
            inset 0 0 30px rgba(255, 69, 0, 0.1);
          padding: 3rem;
          backdrop-filter: blur(15px);
          position: relative;
          animation: glow-border 3s ease-in-out infinite, float 6s ease-in-out infinite;
          overflow: hidden;
        }
        
        .scifi-login-box::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ff4500, #ff00ff, #00ffff);
          border-radius: 20px;
          z-index: -1;
          animation: rotate-border 4s linear infinite;
        }
        
        .scifi-login-box::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          border-radius: 18px;
          z-index: -1;
        }
        
        @keyframes rotate-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .scifi-title {
          color: #ff4500;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 2rem;
          text-shadow: 0 0 20px #ff4500;
          text-transform: uppercase;
          letter-spacing: 3px;
          position: relative;
        }
        
        .scifi-title::after {
          content: 'RECOVERY PROTOCOL';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.4em;
          color: #ff00ff;
          font-weight: 400;
          letter-spacing: 2px;
          text-shadow: 0 0 10px #ff00ff;
        }
        
        .scifi-label {
          color: #ff4500;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 5px #ff4500;
        }
        
        .scifi-input {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #ff4500;
          border-radius: 8px;
          color: #ff4500;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.1rem;
          padding: 12px 16px;
          box-shadow: inset 0 0 10px rgba(255, 69, 0, 0.2);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .scifi-input::placeholder {
          color: rgba(176, 184, 196, 0.6);
          font-style: italic;
        }
        
        .scifi-input:focus {
          outline: none;
          background: rgba(0, 0, 0, 0.9);
          border-color: #ff00ff;
          box-shadow: 
            0 0 20px rgba(255, 0, 255, 0.5),
            inset 0 0 20px rgba(255, 0, 255, 0.1);
          color: #ff00ff;
          text-shadow: 0 0 5px #ff00ff;
        }
        
        .scifi-btn {
          background: linear-gradient(45deg, #ff4500, #ff6600);
          border: none;
          border-radius: 8px;
          color: #000;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 14px 28px;
          width: 100%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
        }
        
        .scifi-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s;
        }
        
        .scifi-btn:hover::before {
          left: 100%;
        }
        
        .scifi-btn:hover {
          background: linear-gradient(45deg, #ff00ff, #ff0080);
          box-shadow: 0 0 30px rgba(255, 0, 255, 0.8);
          transform: translateY(-2px);
        }
        
        .scifi-btn:active {
          transform: translateY(0px);
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.6);
        }
        
        .scifi-links {
          text-align: center;
          margin-top: 2rem;
          font-family: 'Rajdhani', sans-serif;
        }
        
        .scifi-link {
          color: #b0b8c4;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          padding: 5px 10px;
        }
        
        .scifi-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #00ffff;
          transition: width 0.3s ease;
        }
        
        .scifi-link:hover {
          color: #00ffff;
          text-shadow: 0 0 8px #00ffff;
          text-decoration: none;
        }
        
        .scifi-link:hover::before {
          width: 100%;
        }
        
        .scifi-separator {
          color: #6c757d;
          margin: 0 10px;
          font-weight: 300;
        }
        
        .scifi-success-alert {
          background: rgba(0, 255, 128, 0.1);
          border: 2px solid #00ff80;
          border-radius: 8px;
          color: #00ff80;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          text-align: center;
          padding: 1rem;
          margin-bottom: 1.5rem;
          text-shadow: 0 0 5px #00ff80;
          box-shadow: 0 0 20px rgba(0, 255, 128, 0.3);
          animation: pulse-success 2s ease-in-out infinite alternate;
        }
        
        @keyframes pulse-success {
          0% { 
            box-shadow: 0 0 20px rgba(0, 255, 128, 0.3);
          }
          100% { 
            box-shadow: 0 0 30px rgba(0, 255, 128, 0.5);
          }
        }
      `}</style>
      
      <div className="scifi-login-container">
        <div className="matrix-rain"></div>
        <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 70px)' }}>
          <div className="scifi-login-box">
            <h1 className="scifi-title">Forgot Password</h1>

            {success && (
              <div className="scifi-success-alert">
                Neural link restoration initiated!<br/>
                Check your quantum communication channel.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="scifi-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control scifi-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="neural.address@quantum.net"
                />
              </div>

              <button type="submit" className="scifi-btn">
                Initiate Recovery
              </button>
            </form>

            <div className="scifi-links">
              <Link href="/Login" className="scifi-link">
                Back to Terminal
              </Link>
              <span className="scifi-separator">|</span>
              <Link href="/Register" className="scifi-link">
                Register Neural Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}