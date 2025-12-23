import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [role, setRole] = useState('STUDENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/signup/', {
        name, email, password, role
      });
      alert('Signup successful! Please login.');
      navigate(`/login/${role.toLowerCase()}`);
    } catch(err) {
      console.error(err);
      alert(err.response?.data || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="mb-2 p-2 border rounded" required/>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="mb-2 p-2 border rounded" required/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="mb-2 p-2 border rounded" required/>
        <select value={role} onChange={e=>setRole(e.target.value)} className="mb-4 p-2 border rounded w-full">
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
      </form>
    </div>
  );
}
