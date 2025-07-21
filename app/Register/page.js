"use client";

import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    prefix: "",
    firstName: "",
    lastName: "",
    address: "",
    gender: "",
    birthdate: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("กรุณายอมรับเงื่อนไขก่อนสมัครสมาชิก");
      return;
    }
    alert("สมัครสมาชิกเรียบร้อย!\n" + JSON.stringify(formData, null, 2));
    // ที่นี่ใส่ logic ส่งข้อมูลไป backend หรือ API ได้เลย
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h1 className="text-center mb-4">สมัครสมาชิก</h1>
      <form onSubmit={handleSubmit}>

        {/* ชื่อผู้ใช้ */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">ชื่อผู้ใช้</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="กรุณากรอกชื่อผู้ใช้"
          />
        </div>

        {/* รหัสผ่าน */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">รหัสผ่าน</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="กรุณากรอกรหัสผ่าน"
          />
        </div>

        {/* คำนำหน้าชื่อ */}
        <div className="mb-3">
          <label htmlFor="prefix" className="form-label">คำนำหน้าชื่อ</label>
          <select
            id="prefix"
            name="prefix"
            className="form-select"
            value={formData.prefix}
            onChange={handleChange}
            required
          >
            <option value="">เลือกคำนำหน้า</option>
            <option value="นาย">นาย</option>
            <option value="นางสาว">นางสาว</option>
            <option value="นาง">นาง</option>
          </select>
        </div>

        {/* ชื่อ */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">ชื่อ</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="กรุณากรอกชื่อ"
          />
        </div>

        {/* นามสกุล */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">นามสกุล</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="กรุณากรอกนามสกุล"
          />
        </div>

        {/* ที่อยู่ */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">ที่อยู่</label>
          <textarea
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            required
            placeholder="กรุณากรอกที่อยู่"
          />
        </div>

        {/* เพศ */}
        <div className="mb-3">
          <label className="form-label d-block">เพศ</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="genderMale"
              name="gender"
              value="ชาย"
              checked={formData.gender === "ชาย"}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="genderMale">ชาย</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="genderFemale"
              name="gender"
              value="หญิง"
              checked={formData.gender === "หญิง"}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="genderFemale">หญิง</label>
          </div>
        </div>

        {/* วันเกิด */}
        <div className="mb-3">
          <label htmlFor="birthdate" className="form-label">วันเกิด</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            className="form-control"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Checkbox ยอมรับเงื่อนไข */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            className="form-check-input"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="acceptTerms" className="form-check-label">
            ยอมรับเงื่อนไขการสมัครสมาชิก
          </label>
        </div>

        {/* ปุ่ม Register */}
        <button type="submit" className="btn btn-success w-100">สมัครสมาชิก</button>
      </form>
    </div>
  );
}
