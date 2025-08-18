
// ========================================
// 1. หน้า User List (users/page.js) - เวอร์ชั่นสมบูรณ์
// ========================================

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UsersListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function สำหรับดึงข้อมูลผู้ใช้
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users');
      
      console.log('Fetch users response status:', res.status);
      console.log('Fetch users content-type:', res.headers.get('content-type'));
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      // ตรวจสอบ content-type ก่อน parse JSON
      const contentType = res.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      let data = [];
      if (isJson) {
        data = await res.json();
      } else {
        const textResponse = await res.text();
        console.error('Expected JSON but got:', textResponse);
        throw new Error('Server ไม่ได้ส่ง JSON response');
      }
      
      console.log('Fetched users data:', data);
      setItems(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('ไม่สามารถโหลดข้อมูลผู้ใช้ได้: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    
    // Auto refresh ทุก 30 วินาที
    const interval = setInterval(fetchUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('ต้องการลบผู้ใช้นี้จริงหรือไม่?')) return;

    try {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });
      
      console.log('Delete response status:', res.status);
      console.log('Delete content-type:', res.headers.get('content-type'));
      
      // ตรวจสอบ content-type
      const contentType = res.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      let result = null;
      let errorMessage = `เกิดข้อผิดพลาด (${res.status})`;
      
      if (isJson) {
        try {
          result = await res.json();
        } catch (jsonError) {
          console.error('Error parsing delete JSON:', jsonError);
        }
      } else {
        const textResponse = await res.text();
        console.log('Delete text response:', textResponse);
        result = { message: textResponse };
      }
      
      console.log('Delete response:', result);
      
      if (!res.ok) {
        alert('ลบไม่สำเร็จ: ' + (result?.message || errorMessage));
        return;
      }
      
      alert('ลบสำเร็จ');
      // อัพเดท state โดยไม่ต้องรอ refresh
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('เกิดข้อผิดพลาด: ' + error.message);
    }
  };

  // Handle manual refresh
  const handleRefresh = () => {
    fetchUsers();
  };

  if (loading && items.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4>เกิดข้อผิดพลาด</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleRefresh}>
            ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Users List</h5>
            <div>
              <button 
                className="btn btn-sm btn-outline-primary me-2" 
                onClick={handleRefresh}
                disabled={loading}
              >
                {loading ? 'กำลังโหลด...' : 'รีเฟรช'}
              </button>
              <Link href="/Register" className="btn btn-sm btn-success">
                เพิ่มผู้ใช้ใหม่
              </Link>
            </div>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {error}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setError(null)}
                ></button>
              </div>
            )}
            
            <div className="row">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Firstname</th>
                      <th>Fullname</th>
                      <th>Lastname</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Address</th>
                      <th>Sex</th>
                      <th>Birthday</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="text-center text-muted py-4">
                          ไม่พบข้อมูลผู้ใช้
                        </td>
                      </tr>
                    ) : (
                      items.map((item) => (
                        <tr key={item.id}>
                          <td className="text-center">{item.id}</td>
                          <td>{item.firstname || '-'}</td>
                          <td>{item.fullname || '-'}</td>
                          <td>{item.lastname || '-'}</td>
                          <td>{item.username || '-'}</td>
                          <td>
                            {item.password ? '••••••••' : '-'}
                          </td>
                          <td>{item.address || '-'}</td>
                          <td>{item.sex || '-'}</td>
                          <td>
                            {item.birthday ? new Date(item.birthday).toLocaleDateString('th-TH') : '-'}
                          </td>
                          <td className="text-center">
                            <div className="btn-group" role="group">
                              <Link
                                href={`/admin/users/edit/${item.id}`}
                                className="btn btn-sm btn-warning"
                                title="แก้ไข"
                              >
                                <i className="fa fa-edit"></i> Edit
                              </Link>
                              <button
                                className="btn btn-sm btn-danger"
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                title="ลบ"
                              >
                                <i className="fa fa-trash"></i> Del
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {items.length > 0 && (
              <div className="mt-3 text-muted small">
                แสดง {items.length} รายการ | อัพเดทล่าสุด: {new Date().toLocaleString('th-TH')}
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}