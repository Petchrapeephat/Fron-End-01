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
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // แปลงวันที่จาก ISO เป็นรูปแบบที่ input date รองรับ
  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    return date.toISOString().split('T')[0]
  }

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

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch(`https://backend-nextjs-virid.vercel.app/api/users/${id}`);
        if (!res.ok) {
          console.error('Failed to fetch data');
          Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถโหลดข้อมูลได้',
            text: 'กรุณาลองใหม่อีกครั้ง'
          });
          return;
        }
        const data = await res.json();
        
        // เนื่องจาก GET by ID จะส่งกลับข้อมูลผู้ใช้คนเดียว ไม่ใช่ array
        if (data) {
          setFirstname(data.firstname || '');
          setFullname(data.fullname || '');
          setLastname(data.lastname || '');
          setUsername(data.username || '');
          setPassword(data.password || '');
          setAddress(data.address || '');
          setGender(data.sex || '');
          setBirthdate(formatDateForInput(data.birthday) || '');
          setItems([data]); // ใส่ใน array เพื่อให้ compatible กับการแสดงผล
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'
        });
      }
    }
 
    getUsers();
  }, [id]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!firstname || !lastname || !username || !password || !gender || !birthdate) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      })
      return
    }
    
    // ป้องกันการส่งข้อมูลซ้ำ
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: parseInt(id), 
          firstname, 
          fullname, 
          lastname, 
          username, 
          password,
          address,
          sex: gender,
          birthday: convertThaiDateToISO(birthdate)
        }),
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        // แสดง success message
        await Swal.fire({
          icon: 'success',
          title: '<h3>ปรับปรุงข้อมูลเรียบร้อยแล้ว</h3>',
          showConfirmButton: false,
          timer: 2000
        });
        
        // รอให้ SweetAlert ปิดก่อน แล้วค่อย navigate
        setTimeout(() => {
          router.push('/admin/users');
        }, 100);
        
      } else {
        Swal.fire({
          title: 'Error!',
          text: result.message || 'เกิดข้อผิดพลาดในการปรับปรุงข้อมูล!',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาดเครือข่าย',
        text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Loading state
  if (items.length === 0) {
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
          <div className="text-center">กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    );
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
        <h1 className="text-center mb-4">แก้ไขข้อมูลสมัครสมาชิก {id}</h1>
        {items.map((item) => (
          <form key={item.id} onSubmit={handleUpdateSubmit}>
            <div className="mb-3">
              <label className="form-label">คำนำหน้า</label>
              <select 
                name="firstname" 
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)} 
                className="form-control" 
                required
              >
                <option value="">เลือกคำนำหน้า</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">ชื่อเต็ม</label>
              <input
                type="text"
                className="form-control"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">นามสกุล</label>
              <input
                type="text"
                className="form-control"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">ชื่อผู้ใช้</label>
              <input
                type="text"
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

            <button
              type="submit"
              disabled={isLoading}
              className={`btn w-100 ${
                isLoading 
                  ? 'btn-secondary' 
                  : 'btn-success'
              }`}
            >
              {isLoading ? 'กำลังปรับปรุงข้อมูล...' : 'ปรับปรุงข้อมูล'}
            </button>
          </form>
        ))}
      </div>
    </div>
  )
}//gg