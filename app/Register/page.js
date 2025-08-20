'use client'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
export default function Register() {
  const router = useRouter()
  const [firstname, setFirstname] = useState('')
  const [fullname, setFullname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')

  // แปลงปี พ.ศ. เป็น ค.ศ. (ถ้ามี)
  const convertThaiDateToISO = (thaiDate) => {
    if (!thaiDate) return ''
    const [year, month, day] = thaiDate.split('-')
    let westernYear = parseInt(year, 10)
    if (westernYear > 2400) {
      westernYear -= 543
    }
    return `${westernYear.toString().padStart(4, '0')}-${month}-${day}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstname || !lastname || !username || !password || !gender || !birthdate) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      })
      return
    }

    try {
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          firstname,
          fullname,
          lastname,
          username,
          password,
          address,
          sex: gender,
          birthday: convertThaiDateToISO(birthdate), // ส่งแบบแปลงแล้ว
        }),
      })

      const result = await res.json()
      console.log('API response after register:', result)
      

      if (!res.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก')
      }

      Swal.fire({
        icon: 'success',
        title: 'สมัครสมาชิกสำเร็จ!',
        text: result.message || 'ระบบได้บันทึกข้อมูลของคุณเรียบร้อยแล้ว',
      })

      // Reset form
      setFirstname('')
      setFullname('')
      setLastname('')
      setUsername('')
      setPassword('')
      setAddress('')
      setGender('')
      setBirthdate('')
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: err.message,
      })
    }
  }


  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        .scifi-register-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          position: relative;
          overflow: hidden;
          padding-top: 55px;
        }
        
        .scifi-register-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, #00ffff 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, #ff00ff 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, #0080ff 0%, transparent 60%);
          opacity: 0.08;
          animation: pulse-bg 6s ease-in-out infinite alternate;
        }
        
        .neural-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: neural-flow 25s linear infinite;
        }
        
        @keyframes pulse-bg {
          0% { opacity: 0.08; }
          100% { opacity: 0.15; }
        }
        
        @keyframes neural-flow {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(60px) translateX(30px); }
        }
        
        @keyframes hologram-border {
          0%, 100% { 
            border-color: #00ffff;
            box-shadow: 
              0 0 25px rgba(0, 255, 255, 0.6),
              inset 0 0 25px rgba(0, 255, 255, 0.1);
          }
          33% { 
            border-color: #ff00ff;
            box-shadow: 
              0 0 35px rgba(255, 0, 255, 0.7),
              inset 0 0 35px rgba(255, 0, 255, 0.1);
          }
          66% { 
            border-color: #00ff80;
            box-shadow: 
              0 0 30px rgba(0, 255, 128, 0.6),
              inset 0 0 30px rgba(0, 255, 128, 0.1);
          }
        }
        
        @keyframes float-register {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-8px) rotateX(1deg); }
        }
        
        .scifi-register-box {
          max-width: 600px;
          background: rgba(0, 0, 0, 0.95);
          border: 3px solid #00ffff;
          border-radius: 25px;
          padding: 4rem;
          backdrop-filter: blur(20px);
          position: relative;
          animation: hologram-border 4s ease-in-out infinite, float-register 8s ease-in-out infinite;
          overflow: hidden;
        }
        
        .scifi-register-box::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(45deg, #00ffff, #ff00ff, #00ff80, #00ffff);
          border-radius: 25px;
          z-index: -2;
          animation: rotate-hologram 6s linear infinite;
        }
        
        .scifi-register-box::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          border-radius: 22px;
          z-index: -1;
        }
        
        @keyframes rotate-hologram {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .scifi-title {
          color: #00ffff;
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: 2.8rem;
          text-align: center;
          margin-bottom: 3rem;
          text-shadow: 0 0 25px #00ffff;
          text-transform: uppercase;
          letter-spacing: 4px;
          position: relative;
        }
        
        .scifi-title::before {
          content: '>>> ';
          color: #ff00ff;
          text-shadow: 0 0 15px #ff00ff;
        }
        
        .scifi-title::after {
          content: ' <<<';
          color: #ff00ff;
          text-shadow: 0 0 15px #ff00ff;
        }
        
        .scifi-subtitle {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.35em;
          color: #00ff80;
          font-weight: 400;
          letter-spacing: 2px;
          text-shadow: 0 0 10px #00ff80;
          content: 'NEURAL PROFILE INITIALIZATION';
        }
        
        .scifi-label {
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 5px #00ffff;
          display: block;
        }
        
        .scifi-input {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #00ffff;
          border-radius: 10px;
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.1rem;
          padding: 14px 18px;
          box-shadow: inset 0 0 15px rgba(0, 255, 255, 0.2);
          transition: all 0.3s ease;
          width: 100%;
        }
        
        .scifi-input::placeholder {
          color: rgba(176, 184, 196, 0.5);
          font-style: italic;
        }
        
        .scifi-input:focus {
          outline: none;
          background: rgba(0, 0, 0, 0.9);
          border-color: #ff00ff;
          box-shadow: 
            0 0 25px rgba(255, 0, 255, 0.6),
            inset 0 0 25px rgba(255, 0, 255, 0.1);
          color: #ff00ff;
          text-shadow: 0 0 8px #ff00ff;
          transform: scale(1.02);
        }
        
        .scifi-textarea {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #00ffff;
          border-radius: 10px;
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.1rem;
          padding: 14px 18px;
          box-shadow: inset 0 0 15px rgba(0, 255, 255, 0.2);
          transition: all 0.3s ease;
          width: 100%;
          resize: vertical;
          min-height: 80px;
        }
        
        .scifi-textarea:focus {
          outline: none;
          background: rgba(0, 0, 0, 0.9);
          border-color: #ff00ff;
          box-shadow: 
            0 0 25px rgba(255, 0, 255, 0.6),
            inset 0 0 25px rgba(255, 0, 255, 0.1);
          color: #ff00ff;
          text-shadow: 0 0 8px #ff00ff;
        }
        
        .scifi-radio-group {
          display: flex;
          gap: 2rem;
          margin-top: 0.5rem;
        }
        
        .scifi-radio-container {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 8px 16px;
          border: 1px solid transparent;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .scifi-radio-container:hover {
          border-color: #00ffff;
          background: rgba(0, 255, 255, 0.1);
        }
        
        .scifi-radio {
          width: 20px;
          height: 20px;
          border: 2px solid #00ffff;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.8);
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .scifi-radio:checked {
          border-color: #ff00ff;
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.8);
        }
        
        .scifi-radio:checked::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: #ff00ff;
          border-radius: 50%;
          box-shadow: 0 0 10px #ff00ff;
        }
        
        .scifi-radio-label {
          color: #b0b8c4;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 500;
          font-size: 1.1rem;
          margin-left: 12px;
          cursor: pointer;
          transition: color 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .scifi-radio:checked + .scifi-radio-label {
          color: #ff00ff;
          text-shadow: 0 0 8px #ff00ff;
        }
        
        .scifi-date-input {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #00ffff;
          border-radius: 10px;
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.1rem;
          padding: 14px 18px;
          box-shadow: inset 0 0 15px rgba(0, 255, 255, 0.2);
          transition: all 0.3s ease;
          width: 100%;
        }
        
        .scifi-date-input::-webkit-calendar-picker-indicator {
          filter: invert(1) sepia(1) saturate(5) hue-rotate(180deg);
          cursor: pointer;
        }
        
        .scifi-date-input:focus {
          outline: none;
          background: rgba(0, 0, 0, 0.9);
          border-color: #ff00ff;
          box-shadow: 
            0 0 25px rgba(255, 0, 255, 0.6),
            inset 0 0 25px rgba(255, 0, 255, 0.1);
          color: #ff00ff;
          text-shadow: 0 0 8px #ff00ff;
        }
        
        .scifi-btn {
          background: linear-gradient(45deg, #00ff80, #00ffff);
          border: none;
          border-radius: 12px;
          color: #000;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 1.3rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          padding: 16px 32px;
          width: 100%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 0 25px rgba(0, 255, 128, 0.6);
          margin-top: 1rem;
        }
        
        .scifi-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s;
        }
        
        .scifi-btn:hover::before {
          left: 100%;
        }
        
        .scifi-btn:hover {
          background: linear-gradient(45deg, #ff00ff, #ff0080);
          box-shadow: 0 0 35px rgba(255, 0, 255, 0.8);
          transform: translateY(-3px) scale(1.02);
        }
        
        .scifi-btn:active {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.6);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .form-group::before {
          content: '';
          position: absolute;
          top: 0;
          left: -10px;
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, transparent, #00ffff, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .form-group:focus-within::before {
          opacity: 1;
        }
        
        .input-scanner {
          position: relative;
          overflow: hidden;
        }
        
        .input-scanner::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffff, transparent);
          animation: scanner-line 2s ease-in-out infinite;
        }
        
        @keyframes scanner-line {
          0% { left: -100%; opacity: 0; }
          50% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
      
      <div className="scifi-register-container">
        <div className="neural-grid"></div>
        <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 55px)' }}>
          <div className="scifi-register-box">
            <h1 className="scifi-title">
              Neural Registry
              <div className="scifi-subtitle">PROFILE INITIALIZATION PROTOCOL</div>
            </h1>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="scifi-label">Firstname</label>
                <div className="input-scanner">
                  <input
                    className="scifi-input"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    placeholder="primary.neural.designation"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="scifi-label">Full Name</label>
                <div className="input-scanner">
                  <input
                    className="scifi-input"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="complete.identity.string"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="scifi-label">Lastname</label>
                <div className="input-scanner">
                  <input
                    className="scifi-input"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    placeholder="secondary.neural.designation"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="scifi-label">Username</label>
                <div className="input-scanner">
                  <input
                    className="scifi-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="cyber.username.protocol"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="scifi-label">Password</label>
                <div className="input-scanner">
                  <input
                    type="password"
                    className="scifi-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••••••"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="scifi-label">Address</label>
                <div className="input-scanner">
                  <textarea
                    className="scifi-textarea"
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="terrestrial.location.coordinates"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="scifi-label d-block">Biological Classification</label>
                <div className="scifi-radio-group">
                  <div className="scifi-radio-container">
                    <input
                      className="scifi-radio"
                      type="radio"
                      id="male"
                      name="gender"
                      value="ชาย"
                      checked={gender === 'ชาย'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label className="scifi-radio-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="scifi-radio-container">
                    <input
                      className="scifi-radio"
                      type="radio"
                      id="female"
                      name="gender"
                      value="หญิง"
                      checked={gender === 'หญิง'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label className="scifi-radio-label" htmlFor="female">
                      Famale
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="scifi-label">Birth Timestamp</label>
                <div className="input-scanner">
                  <input
                    type="date"
                    className="scifi-date-input"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="scifi-btn">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}