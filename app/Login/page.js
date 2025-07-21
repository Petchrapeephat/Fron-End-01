"use client";  // บอก Next.js ว่าคอมโพเนนต์นี้เป็น Client Component

import { useState } from "react";
import Link from "next/link";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${username}\nPassword: ${password}\nRemember me: ${remember}`);
  };

  return (<div style={{ paddingTop: '70px' }}>
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h1 className="text-center mb-4">Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="remember"
            className="form-check-input"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember" className="form-check-label">จำฉันไว้</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      <div className="mt-3 text-center">
        <Link href="/register" className="me-3">สมัครสมาชิก</Link> | <Link href="/forgot-password">ลืมรหัสผ่าน</Link>
      </div>
    </div>
    </div>
  );
}