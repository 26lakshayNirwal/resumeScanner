import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Provider component to wrap the app and provide auth state.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load.
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.get('/auth/me');
          if (data.success) {
            setUser(data.data);
          }
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  // Function to handle user login.
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.success) {
      localStorage.setItem('token', data.data.accessToken);
      
      // Fetch user details immediately after login.
      const meRes = await api.get('/auth/me');
      if (meRes.data.success) {
          setUser(meRes.data.data);
      }
      navigate('/');
    }
  };

  // Function to handle user signup.
  const signup = async (name, email, password) => {
    await api.post('/auth/signup', { name, email, password });
    navigate('/login');
  };

  // Function to handle user logout.
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext.
export const useAuth = () => useContext(AuthContext);
