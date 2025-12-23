import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function FolderPage() {
  const { sectionId, folderType } = useParams();
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    axios.get(`/api/materials/${sectionId}/${folderType}/`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
      .then(res => setLinks(res.data))
      .catch(console.error);
  }, [sectionId, folderType]);

  const handleAdd = async () => {
    try {
      await axios.post('/api/materials/', { section: sectionId, type: folderType, path: newLink }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      setLinks([...links, { path: newLink }]);
      setNewLink('');
    } catch(err) { console.error(err); alert('Failed'); }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{folderType} Links</h1>
      <ul className="mb-4">
        {links.map((l, i) => <li key={i} className="mb-1"><a href={l.path} target="_blank">{l.path}</a></li>)}
      </ul>
      <input type="text" value={newLink} onChange={e => setNewLink(e.target.value)} placeholder="Add new link" className="border p-2 mr-2"/>
      <button onClick={handleAdd} className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
    </div>
  );
}
