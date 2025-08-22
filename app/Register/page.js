'use client'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
  const [isLoading, setIsLoading] = useState(false)

  // ถ้า login อยู่แล้ว → เด้งไปหน้า admin
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      router.push('/admin/users')
    }
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ตรวจสอบข้อมูลจำเป็น
    if (!firstname || !lastname || !username || !password || !gender || !birthdate) {
      await Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณากรอกข้อมูลในช่องที่มีเครื่องหมาย * ให้ครบถ้วน',
        confirmButtonText: 'ตกลง',
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#00ffff',
        confirmButtonColor: '#00ffff'
      })
      return
    }

    if (password.length < 6) {
      await Swal.fire({
        icon: 'warning',
        title: 'รหัสผ่านสั้นเกินไป',
        text: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
        confirmButtonText: 'ตกลง',
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#00ffff',
        confirmButtonColor: '#00ffff'
      })
      return
    }

    if (isLoading) return
    setIsLoading(true)

    try {
      // ✅ Register API - ใช้ข้อมูลที่ตรงกับ database schema
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          fullname: fullname.trim() || '',
          lastname,
          username: username.trim(),
          password,
          address: address.trim() || '',
          sex: gender, // ใช้ sex แทน gender เพื่อให้ตรงกับ database
          birthday: birthdate,
        }),
      })

      const result = await res.json()
      
      if (!res.ok) {
        let errorMessage = "เกิดข้อผิดพลาดในการสมัครสมาชิก";
        
        if (res.status === 409 || res.status === 400) {
          errorMessage = result.message || 'ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว';
        } else if (res.status >= 500) {
          errorMessage = 'เซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่ภายหลัง';
        } else if (result.message) {
          errorMessage = result.message;
        }
        
        throw new Error(errorMessage);
      }

      // ✅ สมัครสำเร็จแล้ว แสดงข้อความและไปหน้า login
      await Swal.fire({
        icon: 'success',
        title: 'สมัครสมาชิกสำเร็จ!',
        text: 'กรุณาเข้าสู่ระบบด้วยข้อมูลที่สมัครใหม่',
        timer: 2000,
        showConfirmButton: false,
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#00ffff'
      })

      // ✅ ไปหน้า login พร้อม pre-fill username
      router.push(`/signin?username=${encodeURIComponent(username)}`)

    } catch (err) {
      console.error('Registration error:', err)
      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: err.message,
        confirmButtonText: 'ลองใหม่',
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#ff00ff',
        confirmButtonColor: '#ff00ff'
      })
    } finally {
      setIsLoading(false)
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
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .scifi-register-container::before {
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
        
        .scifi-register-box {
          max-width: 600px;
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
        
        .scifi-register-box::before {
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
        
        .scifi-register-box::after {
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
          margin-bottom: 1rem;
          text-shadow: 0 0 20px #00ffff;
          text-transform: uppercase;
          letter-spacing: 3px;
          position: relative;
        }
        
        .scifi-title::after {
          content: 'NEW USER TERMINAL';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.4em;
          color: #ff00ff;
          font-weight: 400;
          letter-spacing: 2px;
          text-shadow: 0 0 10px #ff00ff;
          margin-bottom: 1rem;
        }
        
        .back-link {
          color: #b0b8c4;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          padding: 5px 10px;
          display: inline-block;
          margin-bottom: 1rem;
        }
        
        .back-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #00ffff;
          transition: width 0.3s ease;
        }
        
        .back-link:hover {
          color: #00ffff;
          text-shadow: 0 0 8px #00ffff;
          text-decoration: none;
        }
        
        .back-link:hover::before {
          width: 100%;
        }
        
        .form-group {
          margin-bottom: 1.25rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .scifi-label {
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 1rem;
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
          font-size: 1rem;
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
        
        .scifi-textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #00ffff;
          border-radius: 8px;
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          padding: 12px 16px;
          box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.2);
          transition: all 0.3s ease;
          resize: vertical;
          min-height: 60px;
        }
        
        .scifi-textarea::placeholder {
          color: rgba(176, 184, 196, 0.6);
          font-style: italic;
        }
        
        .scifi-textarea:focus {
          outline: none;
          background: rgba(0, 0, 0, 0.9);
          border-color: #ff00ff;
          box-shadow: 
            0 0 20px rgba(255, 0, 255, 0.5),
            inset 0 0 20px rgba(255, 0, 255, 0.1);
          color: #ff00ff;
          text-shadow: 0 0 5px #ff00ff;
        }
        
        .scifi-select {
          width: 100%;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #00ffff;
          border-radius: 8px;
          color: #00ffff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          padding: 12px 16px;
          box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .scifi-select:focus {
          outline: none;
          background: rgba(0, 0, 0, 0.9);
          border-color: #ff00ff;
          box-shadow: 
            0 0 20px rgba(255, 0, 255, 0.5),
            inset 0 0 20px rgba(255, 0, 255, 0.1);
          color: #ff00ff;
          text-shadow: 0 0 5px #ff00ff;
        }
        
        .scifi-select option {
          background: rgba(0, 0, 0, 0.95);
          color: #00ffff;
        }
        
        .radio-group {
          display: flex;
          gap: 2rem;
        }
        
        .radio-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }
        
        .scifi-radio {
          width: 20px;
          height: 20px;
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #00ffff;
          border-radius: 50%;
          position: relative;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
        }
        
        .scifi-radio:checked {
          background: #00ffff;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
        }
        
        .scifi-radio:checked::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background: #000;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .radio-label {
          color: #b0b8c4;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        
        .scifi-radio:checked + .radio-label {
          color: #00ffff;
          text-shadow: 0 0 5px #00ffff;
        }
        
        .small-text {
          font-size: 0.8rem;
          color: #b0b8c4;
          font-family: 'Rajdhani', sans-serif;
          margin-top: 0.25rem;
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
        
        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .scifi-title {
            font-size: 2rem;
          }
          
          .radio-group {
            gap: 1rem;
          }
        }
      `}</style>
      
      <div className="scifi-register-container">
        <div className="matrix-rain"></div>
        
        <div className="scifi-register-box">
          <Link href="/signin" className="back-link">
            ← กลับไปหน้าเข้าสู่ระบบ
          </Link>
          
          <h1 className="scifi-title">Register System</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname" className="scifi-label">คำนำหน้า *</label>
                <select
                  id="firstname"
                  className="scifi-select"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  disabled={isLoading}
                >
                  <option value="">เลือกคำนำหน้า</option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="username" className="scifi-label">ชื่อผู้ใช้ *</label>
                <input
                  type="text"
                  id="username"
                  className="scifi-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="ขื่อผู้ใช้"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="fullname" className="scifi-label">ชื่อเต็ม</label>
              <input
                type="text"
                id="fullname"
                className="scifi-input"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                disabled={isLoading}
                placeholder="ชื่อเต็ม"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lastname" className="scifi-label">นามสกุล *</label>
                <input
                  type="text"
                  id="lastname"
                  className="scifi-input"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="นามสกุล"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="scifi-label">รหัสผ่าน *</label>
                <input
                  type="password"
                  id="password"
                  className="scifi-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={isLoading}
                  placeholder="รหัสผ่าน"
                />
                <small className="small-text">รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร</small>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address" className="scifi-label">ที่อยู่</label>
              <textarea
                id="address"
                className="scifi-textarea"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isLoading}
                placeholder="ที่อยู่"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="scifi-label">เพศ *</label>
                <div className="radio-group">
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="gender"
                      value="ชาย"
                      checked={gender === 'ชาย'}
                      onChange={(e) => setGender(e.target.value)}
                      disabled={isLoading}
                      required
                      className="scifi-radio"
                    />
                    <span className="radio-label">ชาย</span>
                  </label>
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="gender"
                      value="หญิง"
                      checked={gender === 'หญิง'}
                      onChange={(e) => setGender(e.target.value)}
                      disabled={isLoading}
                      required
                      className="scifi-radio"
                    />
                    <span className="radio-label">หญิง</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="birthdate" className="scifi-label">วันเกิด *</label>
                <input
                  type="date"
                  id="birthdate"
                  className="scifi-input"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  disabled={isLoading}
                />
              </div>
            </div>

            <button type="submit" className="scifi-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  กำลังสมัครสมาชิก...
                </>
              ) : (
                'สมัครสมาชิก'
              )}
            </button>
          </form>

          <div className="scifi-links">
            <Link href="/signin" className="scifi-link">
              มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}