import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Login() {
  const { role } = useParams(); // student or teacher
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Ideally, you'd check the user's metadata role here to ensure they match 'role',
      // but for now, we'll trust the login and redirect based on the URL param.
      // const userRole = data.user.user_metadata.role;

      if (role === 'student') navigate('/student/dashboard');
      else navigate('/teacher/dashboard');

    } catch (err) {
      console.error(err);
      alert('Login failed: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          {role === 'student' ? 'Student' : 'Teacher'} Login
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome back. Please sign in.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email</label>
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

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            style={{ color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '600' }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
