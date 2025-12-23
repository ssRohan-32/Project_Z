import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch teacher's enrolled sections
    axios.get('/api/teacher/sections/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setSections(res.data);
        if(res.data.length > 0) setSelectedSection(res.data[0].id);
      })
      .catch(console.error);
  }, []);

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleGenerateInvite = async () => {
    try {
      const res = await axios.post(`/api/teacher/sections/${selectedSection}/generate_invite/`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert(`Invite Code: ${res.data.invite_code}`);
    } catch(err) {
      console.error(err);
      alert('Failed to generate invite code');
    }
  };

  const handleOpenCourse = () => {
    if(selectedSection) navigate(`/course/${selectedSection}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Teacher Dashboard</h1>
      
      {/* Section Dropdown */}
      <div className="flex items-center mb-4">
        <select value={selectedSection || ''} onChange={handleSectionChange} className="border p-2 mr-2">
          {sections.map(s => (
            <option key={s.id} value={s.id}>{s.course_name} - {s.sec_no}</option>
          ))}
        </select>
        <button onClick={handleGenerateInvite} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">Generate Invite</button>
        <button onClick={handleOpenCourse} className="px-4 py-2 bg-green-500 text-white rounded">Open Section</button>
      </div>

      {/* Sections Table (Optional, for quick access) */}
      <div className="grid grid-cols-3 gap-4">
        {sections.map(s => (
          <div key={s.id} className="border p-4 rounded cursor-pointer" onClick={() => navigate(`/course/${s.id}`)}>
            {s.course_name} - {s.sec_no}
          </div>
        ))}
      </div>
    </div>
  );
}
