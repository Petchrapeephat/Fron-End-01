"use client"; // ใช้ Client Component เพราะมี state และ event

import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // สมมติส่งอีเมลสำเร็จเลย (จริงๆอาจจะเชื่อม API)
    if (email) {
      setSuccess(true);
      // เคลียร์ฟอร์มหรือไม่ก็ได้
      setEmail("");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h1 className="text-center mb-4">ลืมรหัสผ่าน</h1>

      {success && (
        <div
          className="alert alert-success"
          role="alert"
        >
          ส่งลิงก์รีเซ็ตรหัสผ่านเรียบร้อย! โปรดตรวจสอบอีเมลของคุณ
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">อีเมล</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="กรอกอีเมลของคุณ"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">ส่งลิงก์รีเซ็ตรหัสผ่าน</button>
      </form>
    </div>
  );
}