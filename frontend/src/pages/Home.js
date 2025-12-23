import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to Portal</h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate('/login/student')}
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Enter as Student
        </button>

        <button
          onClick={() => navigate('/login/teacher')}
          className="px-6 py-2 bg-green-500 text-white rounded"
        >
          Enter as Teacher
        </button>

        <button
          onClick={() => navigate('/test-crud')}
          className="px-6 py-2 bg-purple-500 text-white rounded"
        >
          Test Supabase CRUD
        </button>

        <p className="mt-4 text-gray-600 text-center">
          Don’t have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
