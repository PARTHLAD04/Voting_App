import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // Redirect logged-in users to dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-r from-purple-400 via-pink-400 to-red-400">
      <h1 className="text-5xl font-bold text-white mb-6 text-center">
        Welcome to Voting App
      </h1>
      <p className="text-white text-center mb-10">
        Vote easily and see results in real-time!
      </p>
      <div className="flex space-x-6">
        <Link
          to="/login"
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-50 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg shadow-lg hover:bg-pink-50 transition"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
