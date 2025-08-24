'use client';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function User() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }

    async function getUsers() {
      try {
        const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id, username) => {
    Swal.fire({
      title: '<h3 style="color: #ff6b6b;">ยืนยันการลบ</h3>',
      html: `<p style="color: #ccc;">คุณต้องการลบผู้ใช้ <span style="color: #00ffff;">${username}</span> หรือไม่?</p>`,
      icon: 'warning',
      background: 'linear-gradient(145deg, #0a0a0a, #1a1a1a)',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#ff6b6b',
      cancelButtonColor: '#666',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://backend-nextjs-virid.vercel.app/api/users/${id}`, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
            },
          });
          const result = await res.json();
          console.log(result);
          
          if (res.ok) {
            Swal.fire({
              icon: 'success',
              title: '<h3 style="color: #00ffff;">ลบสำเร็จ</h3>',
              html: '<p style="color: #888;">ผู้ใช้ถูกลบออกจากระบบแล้ว</p>',
              background: 'linear-gradient(145deg, #0a0a0a, #1a1a1a)',
              showConfirmButton: false,
              timer: 2000
            });
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire({
            icon: 'error',
            title: '<h3 style="color: #ff6b6b;">เกิดข้อผิดพลาด</h3>',
            html: '<p style="color: #888;">ไม่สามารถลบผู้ใช้ได้</p>',
            background: 'linear-gradient(145deg, #0a0a0a, #1a1a1a)',
            confirmButtonColor: '#00ffff'
          });
        }
      }
    });
  };

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #000000 50%, #1a237e 100%)',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    position: 'relative',
    overflow: 'hidden'
  };

  const backgroundEffectStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)
    `,
    animation: 'pulse 4s ease-in-out infinite alternate',
    zIndex: -1
  };

  const cardStyle = {
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '20px',
    padding: '30px',
    margin: '20px auto',
    maxWidth: '1400px',
    boxShadow: '0 20px 40px rgba(0, 255, 255, 0.1), 0 0 50px rgba(0, 255, 255, 0.05)',
    position: 'relative',
    zIndex: 10
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(0, 255, 255, 0.2)'
  };

  const titleStyle = {
    background: 'linear-gradient(45deg, #00ffff, #0080ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '20px 0',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  };

  const tableContainerStyle = {
    overflowX: 'auto',
    borderRadius: '15px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    color: '#fff',
    fontSize: '14px'
  };

  const thStyle = {
    background: 'linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(0, 128, 255, 0.2))',
    padding: '15px 10px',
    textAlign: 'left',
    borderBottom: '2px solid rgba(0, 255, 255, 0.3)',
    color: '#00ffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '12px'
  };

  const tdStyle = {
    padding: '12px 10px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ccc',
    verticalAlign: 'middle'
  };

  const buttonEditStyle = {
    background: 'linear-gradient(45deg, #ffa726, #ff9800)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    transition: 'all 0.3s ease'
  };

  const buttonDeleteStyle = {
    background: 'linear-gradient(45deg, #f44336, #d32f2f)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    transition: 'all 0.3s ease'
  };

  const loadingStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #000000 50%, #1a237e 100%)',
    color: '#00ffff',
    fontSize: '24px',
    fontWeight: 'bold'
  };

  const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#666',
    fontSize: '12px'
  };

  const statusDotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#00ff00',
    animation: 'pulse 2s infinite'
  };

  if (loading) {
    return (
      <>
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(0, 255, 255, 0.3);
            border-top: 4px solid #00ffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 15px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={loadingStyle}>
          <div className="loading-spinner"></div>
          กำลังโหลดข้อมูล...
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        button:hover, a:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
        }
        
        tr:hover {
          background: rgba(0, 255, 255, 0.05);
        }
        
        .table-container::-webkit-scrollbar {
          height: 8px;
        }
        
        .table-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        .table-container::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #00ffff, #0080ff);
          border-radius: 4px;
        }
        
        .user-id {
          font-family: monospace;
          color: #00ffff;
          font-weight: bold;
        }
        
        .status-online {
          color: #4caf50;
        }
        
        .status-offline {
          color: #f44336;
        }
      `}</style>

      <div style={containerStyle}>
        <div style={backgroundEffectStyle}></div>
        
        <div style={cardStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <div style={{
              display: 'inline-block',
              padding: '20px',
              borderRadius: '50%',
              background: 'rgba(0, 255, 255, 0.1)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              marginBottom: '20px'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00ffff" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h1 style={titleStyle}>User Management System</h1>
            <p style={{color: '#888', fontSize: '14px'}}>
              จำนวนผู้ใช้ทั้งหมด: <span style={{color: '#00ffff', fontWeight: 'bold'}}>{items.length}</span> คน
            </p>
          </div>

          {/* Table */}
          <div style={tableContainerStyle} className="table-container">
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={{...thStyle, textAlign: 'center', width: '80px'}}>ID</th>
                  <th style={thStyle}>คำนำหน้า</th>
                  <th style={thStyle}>ชื่อจริง</th>
                  <th style={thStyle}>นามสกุล</th>
                  <th style={thStyle}>ชื่อผู้ใช้</th>
                  <th style={thStyle}>ที่อยู่</th>
                  <th style={thStyle}>เพศ</th>
                  <th style={thStyle}>วันเกิด</th>
                  <th style={{...thStyle, textAlign: 'center'}}>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{...tdStyle, textAlign: 'center'}}>
                      <span className="user-id">#{item.id}</span>
                    </td>
                    <td style={tdStyle}>{item.firstname || '-'}</td>
                    <td style={tdStyle}>{item.fullname || '-'}</td>
                    <td style={tdStyle}>{item.lastname || '-'}</td>
                    <td style={{...tdStyle, fontFamily: 'monospace', color: '#00ffff'}}>
                      {item.username || '-'}
                    </td>
                    <td style={tdStyle}>{item.address || '-'}</td>
                    <td style={tdStyle}>
                      {item.sex ? (
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          background: item.sex === 'ชาย' ? 'rgba(33, 150, 243, 0.2)' : 'rgba(233, 30, 99, 0.2)',
                          color: item.sex === 'ชาย' ? '#2196f3' : '#e91e63',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {item.sex}
                        </span>
                      ) : '-'}
                    </td>
                    <td style={tdStyle}>{item.birthday || '-'}</td>
                    <td style={{...tdStyle, textAlign: 'center'}}>
                      <div style={{display: 'flex', gap: '8px', justifyContent: 'center'}}>
                        <Link href={`/admin/users/edit/${item.id}`} style={buttonEditStyle}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Edit
                        </Link>
                        <button 
                          style={buttonDeleteStyle}
                          onClick={() => handleDelete(item.id, item.username)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                          </svg>
                          Del
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Status Footer */}
          <div style={statusStyle}>
            <div style={statusDotStyle}></div>
            <span>System Online • {items.length} Active Users</span>
          </div>
        </div>
      </div>
    </>
  );
}