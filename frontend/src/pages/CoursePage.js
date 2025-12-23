import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Course Materials', path: `/folder/${courseId}/C_MATS` },
    { label: 'Extra Resources', path: `/folder/${courseId}/EXTRA` },
    { label: 'Schedule / Time Card', path: `/folder/${courseId}/SC` },
    { label: 'Gradesheet', path: `/gradesheet/${courseId}` },
    { label: 'Submit Form', path: `/form/${courseId}` },
  ];

  return (
    <div className="container animate-fade-in" style={{ marginTop: '20px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '2rem' }}>Course Dashboard</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                cursor: 'pointer',
                padding: '30px',
                textAlign: 'center',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--glass-border)',
                transition: 'transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '120px'
              }}
              onClick={() => navigate(item.path)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{item.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
