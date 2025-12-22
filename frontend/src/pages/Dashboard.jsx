import { useEffect, useState } from 'react';
import api from '../api/axios';
import ResumeCard from '../components/ResumeCard';
import { Link } from 'react-router-dom';

// Dashboard page component.
// Displays a list of uploaded resumes and allows deletion.
const Dashboard = () => {
  const [resumes, setResumes] = useState([]);

  // Fetch resumes on component mount.
  useEffect(() => {
    fetchResumes();
  }, []);

  // Function to fetch all resumes from the backend.
  const fetchResumes = async () => {
    try {
      const { data } = await api.get('/resumes');
      if (data.success) {
        setResumes(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch resumes", error);
    }
  };

  // Function to handle resume deletion.
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await api.delete(`/resumes/${id}`);
        setResumes(resumes.filter(r => r._id !== id));
      } catch (error) {
        alert("Failed to delete resume");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <Link to="/upload" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Upload New</Link>
      </div>
      
      {resumes.length === 0 ? (
        <p className="text-gray-500">No resumes found. Upload one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map(resume => (
            <ResumeCard key={resume._id} resume={resume} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
