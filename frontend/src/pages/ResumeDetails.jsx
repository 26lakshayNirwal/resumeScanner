import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

// Page component to view and edit resume details.
const ResumeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch resume details when the component mounts or ID changes.
  useEffect(() => {
    fetchResume();
  }, [id]);

  // Function to fetch resume details from the backend.
  const fetchResume = async () => {
    try {
      const { data } = await api.get(`/resumes/${id}`);
      if (data.success) {
        setResume(data.data);
        setFormData(data.data.extractedData || {});
      }
    } catch (error) {
      console.error("Failed to fetch resume", error);
      alert("Failed to load resume details");
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle updating the resume data.
  const handleUpdate = async () => {
    try {
      const { data } = await api.put(`/resumes/${id}`, { extractedData: formData });
      if (data.success) {
        setResume(data.data);
        setIsEditing(false);
        alert("Resume updated successfully");
      }
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update resume");
    }
  };

  // Helper to handle form field changes.
  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!resume) return <div className="p-4">Resume not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{resume.originalName}</h1>
        <button 
          onClick={() => navigate('/')}
          className="text-gray-600 hover:underline"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Extracted Data</h2>
        
        {/* Example of editable fields - assuming extractedData is a flat object for simplicity */}
        {/* In a real app, you might need more complex form handling for nested data */}
        
        {Object.keys(formData).length === 0 && !isEditing && (
            <p className="text-gray-500 italic">No extracted data available yet.</p>
        )}

        {isEditing ? (
            <div className="space-y-4">
                {/* If formData is empty, let's allow adding a 'skills' field as an example */}
                {Object.keys(formData).length === 0 && (
                    <div className="text-sm text-gray-500 mb-2">
                        No data to edit. (In a real scenario, the scanner would populate this)
                    </div>
                )}
                
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
                        <input 
                            type="text" 
                            value={value} 
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                ))}
                
                <div className="flex space-x-2 mt-4">
                    <button 
                        onClick={handleUpdate}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Save Changes
                    </button>
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ) : (
            <div>
                <div className="space-y-2">
                    {Object.entries(resume.extractedData || {}).map(([key, value]) => (
                        <div key={key} className="border-b py-2">
                            <span className="font-medium capitalize">{key}: </span>
                            <span>{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                        </div>
                    ))}
                </div>
                <button 
                    onClick={() => setIsEditing(true)}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Edit Data
                </button>
            </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded border">
        <h3 className="font-medium mb-2">File Details</h3>
        <p className="text-sm text-gray-600">Filename: {resume.filename}</p>
        <p className="text-sm text-gray-600">Uploaded: {new Date(resume.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ResumeDetails;
