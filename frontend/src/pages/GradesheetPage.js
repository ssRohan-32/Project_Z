import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function GradesheetPage() {
  const { sectionId } = useParams();
  const [gradesheet, setGradesheet] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('role') || 'STUDENT'); // save role at login
  const [fileUploads, setFileUploads] = useState({}); // teacher uploads for quiz/assignment

  useEffect(() => {
    axios.get(`/api/gradesheet/${sectionId}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setGradesheet(res.data))
      .catch(console.error);
  }, [sectionId]);

  const handleFileChange = (e, studentId, type) => {
    setFileUploads({
      ...fileUploads,
      [`${studentId}_${type}`]: e.target.files[0]
    });
  };

  const handleUpload = async (studentId, type) => {
    if(!fileUploads[`${studentId}_${type}`]) return alert('Select a file first');
    const formData = new FormData();
    formData.append('file', fileUploads[`${studentId}_${type}`]);
    try {
      await axios.post(`/api/gradesheet/upload/${studentId}/${type}/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('File uploaded successfully');
    } catch(err) { console.error(err); alert('Upload failed'); }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gradesheet</h1>
      <table className="border-collapse border w-full text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Student</th>
            <th className="border px-2 py-1">Attendance</th>
            <th className="border px-2 py-1">Quiz</th>
            <th className="border px-2 py-1">Assignment</th>
          </tr>
        </thead>
        <tbody>
          {gradesheet.map(student => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{student.name}</td>
              <td className="border px-2 py-1">{student.attendance}</td>
              
              {/* Quiz Column */}
              <td className="border px-2 py-1">
                {role === 'STUDENT' 
                  ? student.quiz_score + (student.quiz_files?.length > 0 ? <div className="mt-1">
                      {student.quiz_files.map((f,i) => (
                        <a key={i} href={f.path} target="_blank" className="text-blue-500 mr-2">Copy {i+1}</a>
                      ))}
                    </div> 
                    : null)
                  : <>
                      {student.quiz_score}
                      <input type="file" onChange={(e)=>handleFileChange(e, student.id, 'quiz')} className="mt-1"/>
                      <button onClick={()=>handleUpload(student.id,'quiz')} className="ml-2 px-2 py-1 bg-green-500 text-white rounded">Upload</button>
                    </>
                }
              </td>

              {/* Assignment Column */}
              <td className="border px-2 py-1">
                {role === 'STUDENT' 
                  ? student.assignment_score + (student.assignment_files?.length > 0 ? <div className="mt-1">
                      {student.assignment_files.map((f,i) => (
                        <a key={i} href={f.path} target="_blank" className="text-blue-500 mr-2">Copy {i+1}</a>
                      ))}
                    </div>
                    : null)
                  : <>
                      {student.assignment_score}
                      <input type="file" onChange={(e)=>handleFileChange(e, student.id, 'assignment')} className="mt-1"/>
                      <button onClick={()=>handleUpload(student.id,'assignment')} className="ml-2 px-2 py-1 bg-green-500 text-white rounded">Upload</button>
                    </>
                }
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
