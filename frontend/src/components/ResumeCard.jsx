import api from '../api/axios';
import { Link } from 'react-router-dom';

// Component to display a single resume card with actions.
const ResumeCard = ({ resume, onDelete }) => {
  
  // Handles the download of the resume file.
  const handleDownload = async () => {
    try {
        const response = await api.get(`/resumes/${resume._id}/download`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', resume.originalName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("Download failed", error);
        alert("Failed to download resume");
    }
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition bg-white">
      <h3 className="font-bold text-lg truncate" title={resume.originalName}>{resume.originalName}</h3>
      <p className="text-gray-600 text-sm">Uploaded: {new Date(resume.createdAt).toLocaleDateString()}</p>
      <div className="mt-4 flex space-x-2">
        <Link to={`/resumes/${resume._id}`} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
            View
        </Link>
        <button onClick={handleDownload} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Download</button>
        <button onClick={() => onDelete(resume._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
};

export default ResumeCard;
