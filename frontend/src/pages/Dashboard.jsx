import { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import API from '../api/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    else fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get('/user/profile');
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-purple-50 via-pink-50 to-red-50">
      <nav className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-purple-700 font-semibold hover:text-purple-900 transition">Home</Link>
          <Link to="/dashboard/profile" className="text-purple-700 font-semibold hover:text-purple-900 transition">Profile</Link>
          <Link to="/dashboard/results" className="text-purple-700 font-semibold hover:text-purple-900 transition">Results</Link>
          {user?.role === 'admin' && (
            <Link to="/dashboard/admin" className="text-purple-700 font-semibold hover:text-purple-900 transition">Admin</Link>
          )}
        </div>
        <button onClick={logout} className="bg-purple-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-purple-700 transition">
          Logout
        </button>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
