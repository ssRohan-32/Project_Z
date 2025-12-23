import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TeacherFormsPage() {
  const { sectionId } = useParams();
  const [forms, setForms] = useState([]);
  const [feedbacks, setFeedbacks] = useState({}); // store feedback text per form

  useEffect(() => {
    axios.get(`/api/forms/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      params: { section: sectionId } // optional filter if API supports
    })
      .then(res => setForms(res.data))
      .catch(console.error);
  }, [sectionId]);

  const handleFeedbackChange = (formId, value) => {
    setFeedbacks({...feedbacks, [formId]: value});
  };

  const handleSubmitFeedback = async (formId) => {
    try {
      await axios.post(`/api/forms/review/${formId}/`, { teacher_feedback: feedbacks[formId] }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Feedback submitted');
      setForms(forms.map(f => f.id === formId ? {...f, teacher_feedback: feedbacks[formId], is_reviewed: true} : f));
    } catch(err) { console.error(err); alert('Failed to submit feedback'); }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Student Forms</h1>
      {forms.length === 0 ? <p>No forms submitted yet.</p> : null}
      {forms.map(f => (
        <div key={f.id} className="border p-4 mb-4 rounded shadow">
          <h2 className="font-bold mb-2">{f.student_name}</h2>
          <p className="mb-2 text-gray-700"><strong>Type:</strong> {f.form_type}</p>
          
          <div className="mb-2">
            <strong>Reason:</strong>
            <div className="border p-2 bg-gray-50" dangerouslySetInnerHTML={{__html: f.reason}}></div>
          </div>

          {f.attachment ? (
            <div className="mb-2">
              <strong>Attachment:</strong>
              <a href={f.attachment} target="_blank" className="text-blue-500 ml-2">View</a>
            </div>
          ) : null}

          <div className="mb-2">
            <strong>Feedback:</strong>
            <ReactQuill value={feedbacks[f.id] || f.teacher_feedback || ''} onChange={(val)=>handleFeedbackChange(f.id, val)} />
          </div>
          <button onClick={()=>handleSubmitFeedback(f.id)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
            Submit Feedback
          </button>

          {f.is_reviewed && <p className="mt-2 text-sm text-gray-500">Already Reviewed</p>}
        </div>
      ))}
    </div>
  );
}
