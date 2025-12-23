import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentFormsPage() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    axios.get('/api/forms/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      // Only student’s own forms will be returned
      setForms(res.data);
    })
    .catch(console.error);
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">My Submitted Forms</h1>
      {forms.length === 0 ? <p>No forms submitted yet.</p> : null}
      {forms.map(f => (
        <div key={f.id} className="border p-4 mb-4 rounded shadow">
          <h2 className="font-bold mb-2">{f.form_type}</h2>
          
          <div className="mb-2">
            <strong>Reason:</strong>
            <div className="border p-2 bg-gray-50" dangerouslySetInnerHTML={{__html: f.reason}}></div>
          </div>

          {f.attachment && (
            <div className="mb-2">
              <strong>Attachment:</strong>
              <a href={f.attachment} target="_blank" className="text-blue-500 ml-2">View</a>
            </div>
          )}

          {f.is_reviewed ? (
            <div className="mt-2 p-2 border-l-4 border-green-500 bg-green-50">
              <strong>Teacher Feedback:</strong>
              <div dangerouslySetInnerHTML={{__html: f.teacher_feedback}} />
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-500">Not yet reviewed</p>
          )}
        </div>
      ))}
    </div>
  );
}
