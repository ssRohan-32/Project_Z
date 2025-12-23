import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const [sections, setSections] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder Data
    setSections([
      { id: 1, course_name: 'CS101', sec_no: 'A' },
      { id: 2, course_name: 'CS102', sec_no: 'B' }
    ]);
    setSelectedSection(1);

    /*
    // Legacy Backend Call
    axios.get('/api/teacher/sections/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setSections(res.data);
        if(res.data.length > 0) setSelectedSection(res.data[0].id);
      })
      .catch(console.error);
    */
  }, []);

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleGenerateInvite = async () => {
    alert("Invite generation logic needs migration to Supabase.");
    /*
    try {
      const res = await axios.post(`/api/teacher/sections/${selectedSection}/generate_invite/`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert(`Invite Code: ${res.data.invite_code}`);
    } catch(err) {
      console.error(err);
      alert('Failed to generate invite code');
    }
    */
  };

  const handleOpenCourse = () => {
    if (selectedSection) navigate(`/course/${selectedSection}`);
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '20px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '1.5rem' }}>Teacher Dashboard</h1>

        {/* Section Dropdown */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <select
            value={selectedSection || ''}
            onChange={handleSectionChange}
            className="input-field"
            style={{ marginBottom: 0, width: 'auto', minWidth: '200px', cursor: 'pointer', appearance: 'none', color: 'black' }}
          >
            {sections.map(s => (
              <option key={s.id} value={s.id}>{s.course_name} - {s.sec_no}</option>
            ))}
          </select>
          <button onClick={handleGenerateInvite} className="btn btn-outline">Generate Invite</button>
          <button onClick={handleOpenCourse} className="btn btn-primary">Open Section</button>
        </div>

        {/* Sections Table (Optional, for quick access) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {sections.map(s => (
            <div
              key={s.id}
              className="card"
              style={{ cursor: 'pointer', padding: '20px', textAlign: 'center', background: 'var(--bg-secondary)' }}
              onClick={() => navigate(`/course/${s.id}`)}
            >
              <h3 style={{ margin: 0 }}>{s.course_name}</h3>
              <p style={{ margin: '5px 0 0 0', color: 'var(--text-secondary)' }}>Section {s.sec_no}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
