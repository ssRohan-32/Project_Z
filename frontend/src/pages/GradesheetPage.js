import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function GradesheetPage() {
  // eslint-disable-next-line no-unused-vars
  const { sectionId } = useParams();
  const [gradesheet, setGradesheet] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [role, setRole] = useState(localStorage.getItem('role') || 'STUDENT');
  // eslint-disable-next-line no-unused-vars
  const [fileUploads, setFileUploads] = useState({});

  useEffect(() => {
    // Placeholder Data
    setGradesheet([
      {
        id: 1,
        name: 'John Doe',
        attendance: '90%',
        quiz_score: '15/20',
        assignment_score: '8/10',
        quiz_files: [],
        assignment_files: []
      }
    ]);
  }, [sectionId]);

  const handleFileChange = (e, studentId, type) => {
    setFileUploads({
      ...fileUploads,
      [`${studentId}_${type}`]: e.target.files[0]
    });
  };

  const handleUpload = async (studentId, type) => {
    alert("File upload logic needs migration to Supabase Storage.");
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '20px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '1.5rem' }}>Gradesheet</h1>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                <th style={{ padding: '12px', border: '1px solid var(--glass-border)' }}>Student</th>
                <th style={{ padding: '12px', border: '1px solid var(--glass-border)' }}>Attendance</th>
                <th style={{ padding: '12px', border: '1px solid var(--glass-border)' }}>Quiz</th>
                <th style={{ padding: '12px', border: '1px solid var(--glass-border)' }}>Assignment</th>
              </tr>
            </thead>
            <tbody>
              {gradesheet.map(student => (
                <tr key={student.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '12px', border: '1px solid var(--glass-border)' }}>{student.name}</td>
                  <td style={{ padding: '12px', border: '1px solid var(--glass-border)' }}>{student.attendance}</td>

                  {/* Quiz Column */}
                  <td style={{ padding: '12px', border: '1px solid var(--glass-border)' }}>
                    {role === 'STUDENT'
                      ? (
                        <>
                          {student.quiz_score}
                          {student.quiz_files?.length > 0 && <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>Files available</div>}
                        </>
                      )
                      : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                          <span>{student.quiz_score}</span>
                          <input type="file" onChange={(e) => handleFileChange(e, student.id, 'quiz')} style={{ fontSize: '0.8rem', maxWidth: '180px' }} />
                          <button onClick={() => handleUpload(student.id, 'quiz')} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Upload</button>
                        </div>
                      )
                    }
                  </td>

                  {/* Assignment Column */}
                  <td style={{ padding: '12px', border: '1px solid var(--glass-border)' }}>
                    {role === 'STUDENT'
                      ? (
                        <>
                          {student.assignment_score}
                        </>
                      )
                      : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                          <span>{student.assignment_score}</span>
                          <input type="file" onChange={(e) => handleFileChange(e, student.id, 'assignment')} style={{ fontSize: '0.8rem', maxWidth: '180px' }} />
                          <button onClick={() => handleUpload(student.id, 'assignment')} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Upload</button>
                        </div>
                      )
                    }
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
