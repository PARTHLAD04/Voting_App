import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '', age: '', email: '', mobile: '', address: '', gender: '', aadharcard: '', password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/user/signup', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-400 via-pink-400 to-red-400">
      <form className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md" onSubmit={handleSignup}>
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-700">User Signup</h2>

        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Age', name: 'age', type: 'number' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Mobile', name: 'mobile', type: 'text' },
          { label: 'Address', name: 'address', type: 'text' },
          { label: 'Gender', name: 'gender', type: 'text' },
          { label: 'Aadhar Card', name: 'aadharcard', type: 'text' },
          { label: 'Password', name: 'password', type: 'password' }
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-gray-700 font-medium mb-2">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
            />
          </div>
        ))}

        <button type="submit" className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 transition">
          Signup
        </button>
      </form>
    </div>
  );
}
