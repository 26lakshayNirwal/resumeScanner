import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Navigation bar component displayed at the top of the app.
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Resume Scanner</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.name}</span>
              <Link to="/upload" className="mr-4 hover:underline">Upload Resume</Link>
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:underline">Login</Link>
              <Link to="/signup" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
