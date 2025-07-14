import React from 'react';

function Register() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="shadow p-5 rounded-4 bg-white" style={{ width: '1200px' }}>
        <h3 className="text-center mb-4">ลงทะเบียน</h3>

        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">ชื่อผู้ใช้</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="กรอกชื่อผู้ใช้" />
        </div>

        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">รหัสผ่าน</label>
          <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="กรอกรหัสผ่าน" />
        </div>

        <select className="form-select mb-3" defaultValue="">
          <option value="">-- คำนำหน้าชื่อ --</option>
          <option value="1">นาย</option>
          <option value="2">นาง</option>
          <option value="3">นางสาว</option>
        </select>

        <div className="row mb-3">
          <div className="col">
            <input type="text" className="form-control" placeholder="ชื่อ" />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="นามสกุล" />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">ที่อยู่</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder="กรอกที่อยู่..." />
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
            <label className="form-check-label" htmlFor="radioDefault1">ชาย</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault2" />
            <label className="form-check-label" htmlFor="radioDefault2">หญิง</label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">วันเกิด</label>
          <input type="date" className="form-control" id="birthDate" />
        </div>

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="checkDefault" />
          <label className="form-check-label" htmlFor="checkDefault">ยอมรับเงื่อนไข</label>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">ลงทะเบียน</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
