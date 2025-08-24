'use client'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useParams, useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const params = useParams();
  const id = params.id;
  const [firstname, setFirstname] = useState('')
  const [fullname, setFullname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch(`https://backend-nextjs-virid.vercel.app/api/users/${id}`);
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);

        // กำหนดค่า state เริ่มต้นจาก API
        if (data.length > 0) {
          const user = data[0];
          setFirstname(user.firstname || '');
          setFullname(user.fullname || '');
          setLastname(user.lastname || '');
          setUsername(user.username || '');
          setPassword(user.password || '');
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
 
    getUsers();
  }, []);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ id, firstname, fullname, lastname, username, password }),
      })
      const result = await res.json();
      console.log(result);
      
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: '<h3 style="color: #00ffff;">ระบบอัพเดทสำเร็จ</h3>',
          html: '<p style="color: #888;">ข้อมูลผู้ใช้ได้รับการปรับปรุงเรียบร้อยแล้ว</p>',
          background: 'linear-gradient(145deg, #0a0a0a, #1a1a1a)',
          showConfirmButton: false,
          timer: 2000
        }).then(function () {
          router.push('/admin/users')
        });
        
        setFirstname('')
        setFullname('')
        setLastname('')
        setUsername('')
        setPassword('')
      } else {
        Swal.fire({
          title: '<h3 style="color: #ff6b6b;">System Error</h3>',
          html: '<p style="color: #888;">เกิดข้อผิดพลาดในการประมวลผล</p>',
          icon: 'error',
          background: 'linear-gradient(145deg, #0a0a0a, #1a1a1a)',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#00ffff'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '<h3 style="color: #ff6b6b;">Connection Error</h3>',
        html: '<p style="color: #888;">ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้</p>',
        background: 'linear-gradient(145deg, #0a0a0a, #1a1a1a)',
        confirmButtonColor: '#00ffff'
      })
    } finally {
      setIsLoading(false);
    }
  }

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #000000 50%, #1a237e 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    position: 'relative',
    overflow: 'hidden'
  };

  const backgroundEffectStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)
    `,
    animation: 'pulse 4s ease-in-out infinite alternate'
  };

  const cardStyle = {
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 40px rgba(0, 255, 255, 0.1), 0 0 50px rgba(0, 255, 255, 0.05)',
    position: 'relative',
    zIndex: 10
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px'
  };

  const titleStyle = {
    background: 'linear-gradient(45deg, #00ffff, #0080ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '20px 0'
  };

  const idStyle = {
    color: '#888',
    fontSize: '14px',
    fontFamily: 'monospace'
  };

  const labelStyle = {
    display: 'block',
    color: '#ccc',
    fontSize: '14px',
    marginBottom: '8px',
    fontWeight: '500'
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    background: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '16px',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const buttonStyle = {
    width: '100%',
    padding: '18px',
    background: isLoading 
      ? 'linear-gradient(45deg, #333, #555)' 
      : 'linear-gradient(45deg, #00ffff, #0080ff)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    opacity: isLoading ? 0.7 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  };

  const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#666',
    fontSize: '12px'
  };

  const statusDotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#00ff00',
    animation: 'pulse 2s infinite'
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        input:focus, select:focus {
          border-color: #00ffff !important;
          box-shadow: 0 0 0 2px rgba(0, 255, 255, 0.2) !important;
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 255, 255, 0.3);
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        option {
          background: #000;
          color: white;
        }
      `}</style>
      
      <div style={containerStyle}>
        <div style={backgroundEffectStyle}></div>
        
        <div style={cardStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <div style={{
              display: 'inline-block',
              padding: '15px',
              borderRadius: '50%',
              background: 'rgba(0, 255, 255, 0.1)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              marginBottom: '20px'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00ffff" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h1 style={titleStyle}>USER PROFILE EDITOR</h1>
            <p style={idStyle}>ID: <span style={{color: '#00ffff'}}>{id}</span></p>
          </div>

          {items.map((item) => (
            <form key={item.id} onSubmit={handleUpdateSubmit}>
              
              {/* Title Selection */}
              <div>
                <label style={labelStyle}>คำนำหนา</label>
                <select 
                  name="firstname" 
                  onChange={(e) => setFirstname(e.target.value)} 
                  style={selectStyle}
                  required
                >
                  <option value={item.firstname}>{item.firstname}</option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label style={labelStyle}>ชื่อจริง</label>
                <input
                  type="text"
                  placeholder="ชื่อ"
                  defaultValue={item.fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label style={labelStyle}>นามสกุล</label>
                <input
                  type="text"
                  placeholder="นามสกุล"
                  defaultValue={item.lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label style={labelStyle}>ชื่อผู้ใช้งาน</label>
                <input
                  type="text"
                  placeholder="username"
                  defaultValue={item.username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{...inputStyle, fontFamily: 'monospace'}}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label style={labelStyle}>รหัสผ่าน</label>
                <input
                  type="text"
                  placeholder="password"
                  defaultValue={item.password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{...inputStyle, fontFamily: 'monospace'}}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={buttonStyle}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    กำลังประมวลผล...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    อัพเดทข้อมูล
                  </>
                )}
              </button>
            </form>
          ))}

          {/* Status Footer */}
          <div style={statusStyle}>
            <div style={statusDotStyle}></div>
            <span>System Online</span>
          </div>
        </div>
      </div>
    </>
  )
}