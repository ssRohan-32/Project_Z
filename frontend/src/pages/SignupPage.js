import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Ensure this points to correct path

export default function SignupPage() {
  const [role, setRole] = useState('STUDENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name,
            role: role
          }
        }
      });

      if (error) throw error;

      alert('Signup successful!');
      navigate(`/login/${role.toLowerCase()}`);

    } catch (err) {
      console.error(err);
      alert(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Sign Up</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Create your account to get started.</p>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column' }}>

          <label style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input-field"
            required
          />

          <label style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-field"
            required
          />

          <label style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-field"
            required
          />

          <label style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>I am a...</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="input-field"
            style={{ appearance: 'none', cursor: 'pointer' }} // Add custom select styling if needed
          >
            <option value="STUDENT" style={{ color: 'black' }}>Student</option>
            <option value="TEACHER" style={{ color: 'black' }}>Teacher</option>
          </select>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate(`/login/${role.toLowerCase()}`)}
            style={{ color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '600' }}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
