import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [sectionCode, setSectionCode] = useState('');
  const navigate = useNavigate();

  // TODO: Migrate to Supabase
  // Fetch enrolled courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      // Placeholder data
      setCourses([
        { id: 1, c_name: 'Introduction to React' },
        { id: 2, c_name: 'Advanced Supabase' }
      ]);

      /* 
      // Legacy Backend Call - REMOVED
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/student/courses/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch courses');
      }
      */
    };
    fetchCourses();
  }, []);

  const handleEnroll = async () => {
    alert("Enrollment logic needs migration to Supabase.");
    /*
    try {
      await axios.post('http://127.0.0.1:8000/api/student/enroll/', 
        { code: sectionCode }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Enrolled successfully');
      setSectionCode('');
      // Refresh courses...
    } catch(err) {
      console.error(err);
      alert('Enroll failed');
    }
    */
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '20px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '1.5rem' }}>My Courses</h1>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
          <input
            type="text"
            value={sectionCode}
            onChange={e => setSectionCode(e.target.value)}
            placeholder="Enter Section Code"
            className="input-field"
            style={{ marginBottom: 0 }}
          />
          <button
            onClick={handleEnroll}
            className="btn btn-primary"
          >
            Enroll
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {courses.map(c => (
            <div
              key={c.id}
              className="card"
              style={{ cursor: 'pointer', padding: '20px', textAlign: 'center', background: 'var(--bg-secondary)' }}
              onClick={() => navigate(`/course/${c.id}`)}
            >
              <h3 style={{ margin: 0 }}>{c.c_name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
