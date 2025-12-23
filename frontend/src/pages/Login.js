import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const { role } = useParams(); // student or teacher
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      if(role === 'student') navigate('/student/dashboard');
      else navigate('/teacher/dashboard');
    } catch(err) {
      console.error(err);
      alert('Login failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">{role === 'student' ? 'Student' : 'Teacher'} Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="mb-2 p-2 border rounded"/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="mb-4 p-2 border rounded"/>
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Sign In</button>
    </div>
  );
}
