'use client'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function Register() {
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
      const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
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
    <div style={{ paddingTop: '55px' }}>
      <div className="container mt-5" style={{
       maxWidth: "550px",
      border: "2px solid #000000",
      borderRadius: "30px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      padding: "100px",
      backgroundColor: "#FFFFFF"
    }}>
        <h1 className="text-center mb-4">สมัครสมาชิก</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ชื่อ</label>
            <input
              className="form-control"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ชื่อเต็ม</label>
            <input
              className="form-control"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">นามสกุล</label>
            <input
              className="form-control"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ชื่อผู้ใช้</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ที่อยู่</label>
            <textarea
              className="form-control"
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-block">เพศ</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="male"
                name="gender"
                value="ชาย"
                checked={gender === 'ชาย'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="form-check-label" htmlFor="male">
                ชาย
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="female"
                name="gender"
                value="หญิง"
                checked={gender === 'หญิง'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="form-check-label" htmlFor="female">
                หญิง
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">วันเกิด</label>
            <input
              type="date"
              className="form-control"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            สมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  )
}
