import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

// Page component for uploading a new resume.
const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Handle file selection.
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission to upload the file.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
    try {
      await api.post('/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Resume uploaded successfully!");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Upload Resume</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Resume (PDF/DOC)</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className={`w-full text-white p-2 rounded ${uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadResume;
