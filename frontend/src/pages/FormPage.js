import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

export default function FormPage() {
  const { sectionId } = useParams();
  const [reason, setReason] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('section', sectionId);
    formData.append('form_type', 'MISSING_QUIZ');
    formData.append('reason', reason);
    if(attachment) formData.append('attachment', attachment);

    try {
      await axios.post('/api/forms/', formData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' }});
      alert('Form submitted');
      setReason(''); setAttachment(null);
    } catch(err){ console.error(err); alert('Submit failed'); }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit Form</h2>
      <ReactQuill value={reason} onChange={setReason} className="mb-4"/>
      <input type="file" onChange={e => setAttachment(e.target.files[0])} className="mb-4"/>
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
    </div>
  );
}
