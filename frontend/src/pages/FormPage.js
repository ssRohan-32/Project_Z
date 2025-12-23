import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function FormPage() {
  // eslint-disable-next-line no-unused-vars
  const { sectionId } = useParams();
  const [reason, setReason] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = async () => {
    alert("Form submission logic needs migration to Supabase.");
    setReason('');
    setAttachment(null);
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '20px' }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Submit Form</h2>

        <div style={{ marginBottom: '1.5rem', background: 'white', color: 'black', borderRadius: '4px' }}>
          <ReactQuill theme="snow" value={reason} onChange={setReason} />
        </div>

        <input
          type="file"
          onChange={e => setAttachment(e.target.files[0])}
          className="input-field"
          style={{ cursor: 'pointer' }}
        />

        <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </div>
    </div>
  );
}
