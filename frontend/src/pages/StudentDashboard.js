import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [sectionCode, setSectionCode] = useState('');
  const navigate = useNavigate();

  // Fetch enrolled courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/student/courses/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, []); // empty dependency array to run once

  const handleEnroll = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/student/enroll/', 
        { code: sectionCode }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Enrolled successfully');
      setSectionCode('');
      // Refresh courses after enrollment
      const res = await axios.get('http://127.0.0.1:8000/api/student/courses/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCourses(res.data);
    } catch(err) {
      console.error(err);
      alert('Enroll failed');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Courses</h1>
      <div className="flex mb-4">
        <input 
          type="text" 
          value={sectionCode} 
          onChange={e => setSectionCode(e.target.value)} 
          placeholder="Enter Section Code" 
          className="border p-2 mr-2"
        />
        <button 
          onClick={handleEnroll} 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Enroll
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {courses.map(c => (
          <div 
            key={c.id} 
            className="border p-4 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/course/${c.id}`)}
          >
            {c.c_name}
          </div>
        ))}
      </div>
    </div>
  );
}
