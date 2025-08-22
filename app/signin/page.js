"use client";
import { useState } from 'react';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (type, title, text, timer = 1500) => {
    setAlert({ type, title, text });
    setTimeout(() => setAlert(null), timer);
  };

  const handleLogin = async () => {
    if (isLoading) return;

    if (!username.trim() || !password.trim()) {
      showAlert('warning', 'ข้อมูลไม่ครบถ้วน', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim()
        }),
      });

      const data = await res.json();

      if (data.token) {
        // บันทึก token
        if (remember) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', username.trim());
        } else {
          sessionStorage.setItem('token', data.token);
        }

        showAlert('success', 'เข้าสู่ระบบสำเร็จ!', 'ยินดีต้อนรับเข้าสู่ระบบ', 1500);
        
        setTimeout(() => {
          window.location.href = "/admin/users";
        }, 1500);
      } else {
        throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      console.error('Login error:', error);
      showAlert('error', 'เกิดข้อผิดพลาด', error.message || 'การเข้าสู่ระบบล้มเหลว');
    } finally {
      setIsLoading(false);
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
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
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
            border-color: #00ffff;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
          }
          50% { 
            border-color: #ff00ff;
            box-shadow: 0 0 40px rgba(255, 0, 255, 0.6);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .scifi-login-box {
          max-width: 450px;
          width: 100%;
          background: rgba(0, 0, 0, 0.9);
          border: 2px solid #00ffff;
          border-radius: 20px;
          box-shadow: 
            0 0 30px rgba(0, 255, 255, 0.4),
            inset 0 0 30px rgba(0, 255, 255, 0.1);
          padding: 3rem;
          backdrop-filter: blur(15px);
          position: relative;
          animation: glow-border 3s ease-in-out infinite, float 6s ease-in-out infinite;
          overflow: hidden;
          z-index: 10;
        }
        
        .scifi-login-box::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #00ffff, #ff00ff, #00ffff);
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
          color: #00ffff;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 2rem;
          text-shadow: 0 0 20px #00ffff;
          text-transform: uppercase;
          letter-spacing: 3px;
          position: relative;
        }
        
        .scifi-title::after {
          content: 'ACCESS TERMINAL';
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
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .scifi-label {
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          display: block;
          text-shadow: 0 0 5px #00ffff;
        }
        
        .scifi-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #00ffff;
          border-radius: 8px;
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.1rem;
          padding: 12px 16px;
          box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.2);
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
        
        .checkbox-container {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .scifi-checkbox {
          width: 20px;
          height: 20px;
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #00ffff;
          border-radius: 4px;
          position: relative;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
        }
        
        .scifi-checkbox:checked {
          background: #00ffff;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
        }
        
        .scifi-checkbox:checked::after {
          content: '✓';
          position: absolute;
          color: #000;
          font-weight: bold;
          font-size: 14px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .scifi-checkbox-label {
          color: #b0b8c4;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 500;
          margin-left: 10px;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        
        .scifi-checkbox:checked + .scifi-checkbox-label {
          color: #00ffff;
          text-shadow: 0 0 5px #00ffff;
        }
        
        .scifi-btn {
          background: linear-gradient(45deg, #00ffff, #0080ff);
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
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
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
        
        .scifi-btn:hover:not(:disabled) {
          background: linear-gradient(45deg, #ff00ff, #ff0080);
          box-shadow: 0 0 30px rgba(255, 0, 255, 0.8);
          transform: translateY(-2px);
        }
        
        .scifi-btn:active:not(:disabled) {
          transform: translateY(0px);
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.6);
        }
        
        .scifi-btn:disabled {
          background: linear-gradient(45deg, #666, #888);
          color: #ccc;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
          opacity: 0.5;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
          display: inline-block;
          cursor: pointer;
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

        .alert-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .alert-box {
          background: rgba(0, 0, 0, 0.95);
          border: 2px solid;
          border-radius: 15px;
          padding: 2rem;
          max-width: 400px;
          width: 90%;
          text-align: center;
          font-family: 'Rajdhani', sans-serif;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
          animation: alertSlideIn 0.3s ease-out;
        }

        .alert-box.success {
          border-color: #00ffff;
          color: #00ffff;
        }

        .alert-box.error {
          border-color: #ff00ff;
          color: #ff00ff;
        }

        .alert-box.warning {
          border-color: #ffff00;
          color: #ffff00;
        }

        .alert-title {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .alert-text {
          font-size: 1.1rem;
          font-weight: 500;
          opacity: 0.9;
        }

        @keyframes alertSlideIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
      
      <div className="scifi-login-container">
        <div className="matrix-rain"></div>
        
        {alert && (
          <div className="alert-overlay">
            <div className={`alert-box ${alert.type}`}>
              <div className="alert-title">{alert.title}</div>
              <div className="alert-text">{alert.text}</div>
            </div>
          </div>
        )}
        
        <div className="scifi-login-box">
          <h1 className="scifi-title">Login System</h1>

          <div>
            <div className="form-group">
              <label htmlFor="username" className="scifi-label">Username</label>
              <input
                type="text"
                id="username"
                className="scifi-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={isLoading}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="scifi-label">Password</label>
              <input
                type="password"
                id="password"
                className="scifi-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="remember"
                className="scifi-checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                disabled={isLoading}
              />
              <label htmlFor="remember" className="scifi-checkbox-label">
                Remember me
              </label>
            </div>

            <button onClick={handleLogin} className="scifi-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="scifi-links">
            <span className="scifi-link" onClick={() => window.location.href = '/Register'}>
              Create Account
            </span>
            {' | '}
            <span className="scifi-link" onClick={() => window.location.href = '/forgot-password'}>
              Forget Password
            </span>
          </div>
        </div>
      </div>
    </>
  );
}