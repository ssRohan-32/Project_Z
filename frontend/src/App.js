// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import CoursePage from './pages/CoursePage';
import FormPage from './pages/FormPage';
import GradesheetPage from './pages/GradesheetPage';
import FolderPage from './pages/FolderPage';
import TestSupabase from './TestSupabase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/form/:sectionId" element={<FormPage />} />
        <Route path="/gradesheet/:sectionId" element={<GradesheetPage />} />
        <Route path="/folder/:sectionId/:folderType" element={<FolderPage />} />
        <Route path="/test-crud" element={<TestSupabase />} />
      </Routes>
    </Router>
  );
}

export default App;
