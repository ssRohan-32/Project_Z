import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TeacherFormsPage() {
  // eslint-disable-next-line no-unused-vars
  const { sectionId } = useParams();
  const [forms, setForms] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    // Placeholder Data
    setForms([
      {
        id: 1,
        student_name: 'John Doe',
        form_type: 'MISSING_QUIZ',
        reason: '<p>I was sick.</p>',
        attachment: null,
        teacher_feedback: '',
        is_reviewed: false
      }
    ]);
  }, [sectionId]);

  const handleFeedbackChange = (formId, value) => {
    setFeedbacks({ ...feedbacks, [formId]: value });
  };

  const handleSubmitFeedback = async (formId) => {
    alert("Feedback submission logic needs migration to Supabase.");
    setForms(forms.map(f => f.id === formId ? { ...f, teacher_feedback: feedbacks[formId], is_reviewed: true } : f));
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '20px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '1.5rem' }}>Student Forms</h1>
        {forms.length === 0 ? <p>No forms submitted yet.</p> : null}

        {forms.map(f => (
          <div key={f.id} style={{ marginBottom: '20px', padding: '20px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{f.student_name}</h2>
            <p style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}><strong>Type:</strong> {f.form_type}</p>

            <div style={{ marginBottom: '15px' }}>
              <strong>Reason:</strong>
              <div
                style={{ marginTop: '5px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}
                dangerouslySetInnerHTML={{ __html: f.reason }}
              ></div>
            </div>

            {f.attachment && (
              <div style={{ marginBottom: '15px' }}>
                <strong>Attachment:</strong>
                <a href={f.attachment} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-secondary)', marginLeft: '10px' }}>View</a>
              </div>
            )}

            <div style={{ marginBottom: '15px' }}>
              <strong>Feedback:</strong>
              <div style={{ background: 'white', color: 'black', borderRadius: '4px', marginTop: '5px' }}>
                <ReactQuill theme="snow" value={feedbacks[f.id] || f.teacher_feedback || ''} onChange={(val) => handleFeedbackChange(f.id, val)} />
              </div>
            </div>

            <button onClick={() => handleSubmitFeedback(f.id)} className="btn btn-primary">
              Submit Feedback
            </button>

            {f.is_reviewed && <p style={{ marginTop: '10px', color: '#4ade80' }}>Already Reviewed</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
