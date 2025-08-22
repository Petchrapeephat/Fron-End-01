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
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        text: 'กรุณากรอกข้อมูลในช่องที่มีเครื่องหมาย * ให้ครบถ้วน'
      })
      return
    }

    if (password.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'รหัสผ่านสั้นเกินไป',
        text: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
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
        if (res.status === 409 || res.status === 400) {
          throw new Error(result.message || 'ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว')
        } else if (res.status >= 500) {
          throw new Error('เซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่ภายหลัง')
        } else {
          throw new Error(result.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก')
        }
      }

      // ✅ สมัครสำเร็จแล้ว แสดงข้อความและไปหน้า login
      await Swal.fire({
        icon: 'success',
        title: 'สมัครสมาชิกสำเร็จ!',
        text: 'กรุณาเข้าสู่ระบบด้วยข้อมูลที่สมัครใหม่',
        timer: 2000,
        showConfirmButton: false
      })

      // ✅ ไปหน้า login พร้อม pre-fill username
      router.push(`/login?username=${encodeURIComponent(username)}`)

    } catch (err) {
      console.error('Registration error:', err)
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: err.message,
        confirmButtonText: 'ลองใหม่'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400 font-mono relative overflow-hidden">
      {/* พื้นหลัง Sci-Fi */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-cyan-900 via-black to-cyan-950 opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg p-8 rounded-2xl border border-cyan-500 shadow-[0_0_30px_rgba(0,255,255,0.4)] bg-black/80">
        <Link href="/login" className="text-sm text-cyan-300 underline hover:text-cyan-200">
          ← กลับไปหน้าเข้าสู่ระบบ
        </Link>

        <h1 className="text-3xl font-bold text-center mb-6 tracking-widest animate-pulse">
          REGISTER SYSTEM
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* คำนำหน้า */}
          <div>
            <label className="block mb-1 text-sm">คำนำหน้า *</label>
            <select
              className="w-full px-4 py-2 rounded-md bg-black border border-cyan-400 text-cyan-200 focus:ring-2 focus:ring-cyan-300 outline-none"
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

          {/* ชื่อเต็ม */}
          <div>
            <label className="block mb-1 text-sm">ชื่อเต็ม</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-black border border-cyan-400 text-cyan-200 focus:ring-2 focus:ring-cyan-300 outline-none"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              disabled={isLoading}
              placeholder="ชื่อเต็ม"
            />
          </div>

          {/* นามสกุล */}
          <div>
            <label className="block mb-1 text-sm">นามสกุล *</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-black border border-cyan-400 text-cyan-200 focus:ring-2 focus:ring-cyan-300 outline-none"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              disabled={isLoading}
              placeholder="นามสกุล"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 text-sm">ชื่อผู้ใช้ *</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-black border border-cyan-400 text-cyan-200 focus:ring-2 focus:ring-cyan-300 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              placeholder="ชื่อผู้ใช้"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">รหัสผ่าน *</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-black border border-cyan-400 text-cyan-200 focus:ring-2 focus:ring-cyan-300 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={isLoading}
              placeholder="รหัสผ่าน"
            />
            <small className="text-cyan-300 text-xs">รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร</small>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 text-sm">ที่อยู่</label>
            <textarea
              className="w-full px-4 py-2 rounded-md bg-black border border-cyan-400 text-cyan-200 focus:ring-2 focus:ring-cyan-300 outline-none"
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isLoading}
              placeholder="ที่อยู่"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 text-sm">เพศ *</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="ชาย"
                  checked={gender === 'ชาย'}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={isLoading}
                  required
                  className="accent-cyan-400"
                />
                ชาย
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="หญิง"
                  checked={gender === 'หญิง'}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={isLoading}
                  required
                  className="accent-cyan-400"
                />
                หญิง
              </label>
            </div>
          </div>

          {/* Birthdate */}
          <div>
            <label className="block mb-1 text-sm">วันเกิด *</label>
            <input
              type="date"
              className="w-full px-4 py-2 rounded-md bg-black border border-cyan-400 text-cyan-200 focus:ring-2 focus:ring-cyan-300 outline-none"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              max={new Date().toISOString().split('T')[0]}
              disabled={isLoading}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 disabled:opacity-50 transition"
            disabled={isLoading}
          >
            {isLoading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-cyan-300">
          มีบัญชีอยู่แล้ว?{" "}
          <Link href="/login" className="underline hover:text-cyan-200">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  )
}