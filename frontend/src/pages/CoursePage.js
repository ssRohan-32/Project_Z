import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Course Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="border p-4 rounded cursor-pointer" onClick={() => navigate(`/folder/${courseId}/C_MATS`)}>C_MATS</div>
        <div className="border p-4 rounded cursor-pointer" onClick={() => navigate(`/folder/${courseId}/EXTRA`)}>EXTRA</div>
        <div className="border p-4 rounded cursor-pointer" onClick={() => navigate(`/folder/${courseId}/SC`)}>SC / TC</div>
        <div className="border p-4 rounded cursor-pointer" onClick={() => navigate(`/gradesheet/${courseId}`)}>Gradesheet</div>
        <div className="border p-4 rounded cursor-pointer" onClick={() => navigate(`/form/${courseId}`)}>Form</div>
      </div>
    </div>
  );
}
