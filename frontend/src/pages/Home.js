import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container animate-fade-in" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Portal</h1>
        <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem' }}>
          Welcome to the future of student management. <br />
          Secure, fast, and built for you.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'stretch', maxWidth: '300px', margin: '0 auto' }}>
          <button
            onClick={() => navigate('/login/student')}
            className="btn btn-primary"
          >
            Enter as Student
          </button>

          <button
            onClick={() => navigate('/login/teacher')}
            className="btn btn-outline"
          >
            Enter as Teacher
          </button>

          <button
            onClick={() => navigate('/test-crud')}
            className="btn btn-outline"
            style={{ borderColor: 'var(--accent-secondary)', color: 'var(--accent-secondary)' }}
          >
            Test Supabase CRUD
          </button>
        </div>

        <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
          Don’t have an account?{' '}
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
