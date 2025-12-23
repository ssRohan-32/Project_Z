import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function FolderPage() {
  const { folderType } = useParams();
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    // Placeholder Data
    setLinks([
      { path: 'https://example.com/resource-1' },
      { path: 'https://example.com/resource-2' }
    ]);
  }, [folderType]);

  const handleAdd = async () => {
    if (!newLink) return;
    setLinks([...links, { path: newLink }]);
    setNewLink('');
    alert("This link is saved locally for now. Backend storage coming soon.");
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '20px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '1.5rem', textTransform: 'capitalize' }}>{folderType} Links</h1>

        <div style={{ marginBottom: '2rem' }}>
          {links.length === 0 && <p>No links found.</p>}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {links.map((l, i) => (
              <li key={i} style={{ marginBottom: '10px', padding: '10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                <a href={l.path} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-secondary)', textDecoration: 'none' }}>
                  {l.path}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newLink}
            onChange={e => setNewLink(e.target.value)}
            placeholder="Add new link (e.g. https://...)"
            className="input-field"
            style={{ marginBottom: 0 }}
          />
          <button onClick={handleAdd} className="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
  );
}
