"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
const [tokenState, setToken] = useState("");

useEffect(() => {
  // อ่าน token จาก localStorage (ตอน mount)
  const token = localStorage.getItem("token");
  setToken(token);
}, []);

const handleSignOut = () => {
  localStorage.removeItem("token");
  setToken(null);
  router.push("/signin");
};
  return (
    <>
      <style jsx>{`
        .scifi-navbar {
          background: linear-gradient(135deg, #8d8d8dff 0%, #424242ff 50%, #16213e 100%);
          border-bottom: 2px solid #00ffff;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }
        
        .scifi-brand {
          color: #00ffff !important;
          text-shadow: 0 0 10px #00ffff;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        
        .scifi-brand:hover {
          color: #ff00ff !important;
          text-shadow: 0 0 15px #ff00ff;
        }
        
        .scifi-logo {
          filter: drop-shadow(0 0 10px #00ffff);
          transition: all 0.3s ease;
        }
        
        .scifi-logo:hover {
          filter: drop-shadow(0 0 15px #ff00ff);
          transform: rotate(360deg);
        }
        
        .scifi-nav-link {
          color: #b0b8c4 !important;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          padding: 8px 16px !important;
          margin: 0 4px;
          border-radius: 4px;
        }
        
        .scifi-nav-link:hover,
        .scifi-nav-link.active {
          color: #00ffff !important;
          text-shadow: 0 0 8px #00ffff;
          border-color: #00ffff;
          box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.2);
          background: rgba(0, 255, 255, 0.1);
        }
        
        .scifi-dropdown-menu {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          border: 1px solid #00ffff;
          box-shadow: 0 8px 32px rgba(0, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }
        
        .scifi-dropdown-item {
          color: #b0b8c4 !important;
          font-family: 'Rajdhani', sans-serif;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }
        
        .scifi-dropdown-item:hover {
          color: #00ffff !important;
          background: rgba(0, 255, 255, 0.1) !important;
          border-left-color: #00ffff;
          text-shadow: 0 0 5px #00ffff;
        }
        
        .scifi-search {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid #00ffff;
          color: #00ffff;
          box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.2);
          font-family: 'Rajdhani', sans-serif;
        }
        
        .scifi-search::placeholder {
          color: #6c757d;
        }
        
        .scifi-search:focus {
          background: rgba(0, 0, 0, 0.7);
          border-color: #ff00ff;
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.4);
          color: #ff00ff;
        }
        
        .scifi-btn-search {
          background: linear-gradient(45deg, #00ffff, #0080ff);
          border: none;
          color: #000;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: 'Rajdhani', sans-serif;
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
          transition: all 0.3s ease;
        }
        
        .scifi-btn-search:hover {
          background: linear-gradient(45deg, #ff00ff, #ff0080);
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.6);
          transform: translateY(-2px);
        }
        
        .scifi-btn-login {
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
        
        .scifi-btn-login::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        
        .scifi-btn-login:hover::before {
          left: 100%;
        }
        
        .scifi-btn-login:hover {
          background: linear-gradient(45deg, #00ffff, #0080ff);
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.8);
          transform: translateY(-2px);
        }
        
        .scifi-toggler {
          border: 1px solid #00ffff;
          background: rgba(0, 255, 255, 0.1);
        }
        
        .scifi-toggler:focus {
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%2300ffff' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
      `}</style>
      
      <nav className="navbar navbar-expand-lg fixed-top scifi-navbar">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand d-flex align-items-center gap-2 scifi-brand">
            <img
              src="/bootstrap-logo.svg"
              alt="Logo"
              width={30}
              height={24}
              className="d-inline-block align-text-top scifi-logo"
            />
            CYBERTECH
          </Link>
          <button
            className="navbar-toggler scifi-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active scifi-nav-link" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link scifi-nav-link" href="about">
                  about
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle scifi-nav-link"
                  href="/service"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  service
                </Link>
                <ul className="dropdown-menu scifi-dropdown-menu">
                  <li>
                    <Link className="dropdown-item scifi-dropdown-item" href="service">
                      contact us
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item scifi-dropdown-item" href="service">
                      contact other areas
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" style={{borderColor: '#00ffff'}} />
                  </li>
                  <li>
                    <Link className="dropdown-item scifi-dropdown-item" href="service">
                      Ask about problems
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link href="contact" className="nav-link scifi-nav-link" aria-disabled="true">
                  contact
                </Link>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2 scifi-search"
                type="search"
                placeholder="NEURAL SEARCH..."
                aria-label="Search"
              />
              <button className="btn scifi-btn-search" type="submit">
                SCAN
              </button>
            </form>

    
            
              {tokenState ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="btn btn-outline-danger"
              >
                <i className="bi bi-box-arrow-right"></i> SignOut
              </button>
            ) : (
              <Link href="/signin">
                <button className="btn ms-3 scifi-btn-login">MATRIX Signin</button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}