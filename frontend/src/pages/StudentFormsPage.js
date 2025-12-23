import React, { useEffect, useState } from 'react';

export default function StudentFormsPage() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // Placeholder Data
    setForms([
      {
        id: 1,
        form_type: 'MISSING_QUIZ',
        reason: '<p>I had a fever.</p>',
        attachment: null,
        is_reviewed: true,
        teacher_feedback: '<p>Approved. Retest on Monday.</p>'
      }
    ]);
  }, []);

  return (
    <div className="container animate-fade-in" style={{ marginTop: '20px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '1.5rem' }}>My Submitted Forms</h1>
        {forms.length === 0 ? <p>No forms submitted yet.</p> : null}

        {forms.map(f => (
          <div key={f.id} style={{ marginBottom: '20px', padding: '20px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{f.form_type}</h2>

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

            {f.is_reviewed ? (
              <div style={{ marginTop: '15px', padding: '10px', borderLeft: '4px solid #4ade80', background: 'rgba(74, 222, 128, 0.1)' }}>
                <strong>Teacher Feedback:</strong>
                <div dangerouslySetInnerHTML={{ __html: f.teacher_feedback }} />
              </div>
            ) : (
              <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>Not yet reviewed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
