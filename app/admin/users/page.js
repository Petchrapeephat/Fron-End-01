'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteButton from './DeleteButton';
import Swal from 'sweetalert2';

// เพิ่ม error handling และ retry mechanism
async function getUsers() {
  try {
    const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // เพิ่ม authorization header ถ้าจำเป็น
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      cache: 'no-store',
    });
    
    if (!res.ok) {
      // แยกประเภท error ตาม status code
      if (res.status === 401) {
        throw new Error('UNAUTHORIZED');
      } else if (res.status === 403) {
        throw new Error('FORBIDDEN');
      } else if (res.status >= 500) {
        throw new Error('SERVER_ERROR');
      } else {
        throw new Error(`HTTP_ERROR_${res.status}`);
      }
    }
    
    const data = await res.json();
    
    // ตรวจสอบ structure ของ response
    if (!Array.isArray(data)) {
      console.warn('API response is not an array:', data);
      // ถ้า API return object ที่มี array nested
      return data.data || data.users || [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเข้าสู่ระบบก่อนใช้งาน',
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then(() => {
        router.push('/login');
      });
      return;
    }

    setCheckingAuth(false);

    const fetchData = async () => {
      try {
        setError(null);
        const data = await getUsers();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        
        // Handle different types of errors
        if (error.message === 'UNAUTHORIZED') {
          // Token หมดอายุหรือไม่ถูกต้อง
          localStorage.removeItem('token');
          Swal.fire({
            icon: 'warning',
            title: 'Session หมดอายุ',
            text: 'กรุณาเข้าสู่ระบบใหม่',
          }).then(() => {
            router.push('/login');
          });
        } else if (error.message === 'SERVER_ERROR') {
          setError('เซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่ภายหลัง');
        } else {
          setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่');
        }
      }
    };

    fetchData();

    // Auto refresh data every 30 seconds (เพิ่มจาก 5 วินาที เพื่อลด server load)
    const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, [router]);

  const handleDeleteUser = (deletedId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== deletedId));
  };

  // Error state
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">เกิดข้อผิดพลาด</h4>
          <p>{error}</p>
          <button 
            className="btn btn-outline-danger" 
            onClick={() => window.location.reload()}
          >
            รีเฟรชหน้า
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (checkingAuth || loading) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <div
          className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-16 w-16 mb-4"
          style={{ borderTopColor: '#3b82f6', animation: 'spin 1s linear infinite' }}
        ></div>
        <h2 style={{ fontWeight: 'bold', color: '#333' }}>
          {checkingAuth ? 'กำลังตรวจสอบสิทธิ์...' : 'กำลังโหลดข้อมูล...'}
        </h2>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .loader {
            border-top-color: #3b82f6;
            animation: spin 1s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <br /><br /><br /><br />
      <div className="container" style={{ maxWidth: '98vw', position: 'relative' }}>
        <div className="card">
          <div className="card-header" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Users List
            <button 
              className="btn btn-primary btn-sm float-end"
              onClick={() => window.location.reload()}
            >
              รีเฟรช
            </button>
          </div>

          <div
            className="card-body"
            style={{
              maxHeight: '70vh',
              overflowY: 'auto',
              overflowX: 'auto',
              border: '1px solid #ddd',
              borderRadius: '4px',
              position: 'relative',
              minWidth: '1300px',
            }}
          >
            {items.length === 0 && (
              <p className="text-center">No users found.</p>
            )}

            {items.length > 0 && (
              <table className="table table-striped table-hover">
                <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Firstname</th>
                    <th>Fullname</th>
                    <th>Lastname</th>
                    <th>Username</th>
                    <th>Address</th>
                    <th>Sex</th>
                    <th>Birthday</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.id}</td>
                      <td>{item.firstname || '-'}</td>
                      <td>{item.fullname || '-'}</td>
                      <td>{item.lastname || '-'}</td>
                      <td>{item.username || '-'}</td>
                      <td>{item.address || '-'}</td>
                      <td>{item.sex || '-'}</td>
                      <td>{item.birthday ? new Date(item.birthday).toLocaleDateString('th-TH') : '-'}</td>
                      <td>
                        <Link href={`/admin/users/edit/${item.id}`}>
                          <button className="btn btn-warning btn-sm">Edit</button>
                        </Link>
                      </td>
                      <td>
                        <DeleteButton id={item.id} onDeleted={handleDeleteUser} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <br /><br />
    </>
  );
}