import { useEffect, useState } from 'react';
import API from '../api/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/user/profile');
      setUser(res.data.user);
    } catch (err) {
      alert('Failed to load profile');
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await API.put('/user/profile/password', {
        oldPassword,
        newPassword
      });
      alert('Password updated successfully');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      alert(err.response?.data?.message || 'Password update failed');
    }
  };

  if (!user) 
    return (
      <p className="text-center text-purple-700 font-semibold mt-10">
        Loading profile...
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        User Profile
      </h2>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-lg font-semibold"><b>Name:</b> {user.name}</p>
        <p className="text-gray-700"><b>Age:</b> {user.age}</p>
        <p className="text-gray-700"><b>Email:</b> {user.email}</p>
        <p className="text-gray-700"><b>Mobile:</b> {user.mobile}</p>
        <p className="text-gray-700"><b>Address:</b> {user.address}</p>
        <p className="text-gray-700"><b>Gender:</b> {user.gender}</p>
        <p className="text-gray-700"><b>Aadhar:</b> {user.aadharcard}</p>
        <p className="text-gray-700"><b>Voted:</b> {user.isVoted ? 'Yes' : 'No'}</p>
      </div>

      <h3 className="text-2xl font-semibold text-purple-600 mb-4">Change Password</h3>
      <form onSubmit={changePassword} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
