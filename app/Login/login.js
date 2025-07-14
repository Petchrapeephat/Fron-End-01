'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ตรวจสอบข้อมูลแบบง่าย (ตัวอย่างเท่านั้น)
    if (username === 'admin' && password === '1234') {
      router.push('/home'); // ไปหน้าแรกของเว็บ
    } else {
      alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="rememberMe" />
        <label className="form-check-label" htmlFor="rememberMe">จำฉันไว้</label>
      </div>

      <center>
        <button type="submit" className="btn btn-primary">Login</button>
      </center>

      <div className="col mt-3 text-center">
        <Link href="/Register" className="text-muted me-3">สมัครสมาชิก</Link>
        <Link href="/forgot-password" className="text-muted">ลืมรหัสผ่าน?</Link>
      </div>
    </form>
  );
}

