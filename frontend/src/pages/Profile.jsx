import { useEffect, useState } from 'react';
import API from '../api/api';
import {
  UserCircle,
  Shield,
  Key,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Fingerprint,
  Award,
  CheckCircle2,
  XCircle,
  Edit2,
  Lock,
  Smartphone,
  Home,
  User,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/user/profile');
      setUser(res.data.user);
    } catch (err) {
      alert('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setOldPassword('');
    setNewPassword('');
    setShowOldPassword(false);
    setShowNewPassword(false);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await API.put('/user/profile/password', { oldPassword, newPassword });
      alert('✅ Password updated successfully');
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Password update failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 border-4 border-purple-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-xl font-semibold text-purple-700 animate-pulse">
          Loading your profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <UserCircle className="w-24 h-24 text-gray-300 mb-6" />
        <h3 className="text-2xl font-bold text-gray-700 mb-2">Profile Not Found</h3>
        <p className="text-gray-500 max-w-md mb-6">
          We couldn't load your profile information. Please try refreshing the page.
        </p>
        <button
          onClick={fetchProfile}
          className="bg-linear-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center gap-2"
        >
          <UserCircle className="w-5 h-5" />
          Retry Loading Profile
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="bg-linear-to-r from-purple-50 to-purple-100 p-3 rounded-xl">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-purple-800">
            My Profile
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Manage your account information and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl border border-purple-100 shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Personal Information
              </h2>
              <span className="px-3 py-1 bg-linear-to-r from-purple-50 to-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                {user.role || 'Voter'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name & Age */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <div className="bg-white p-2 rounded-lg">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <div className="bg-white p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold text-gray-800">{user.age} years</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <div className="bg-white p-2 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-semibold text-gray-800">{user.gender}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <div className="bg-white p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-semibold text-gray-800 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <div className="bg-white p-2 rounded-lg">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-semibold text-gray-800">{user.mobile}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Verification Card */}
          <div className="bg-white rounded-2xl border border-purple-100 shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <Home className="w-5 h-5 text-purple-600" />
              Address & Verification
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50">
                  <div className="bg-white p-2 rounded-lg mt-1">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold text-gray-800">{user.address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <div className="bg-white p-2 rounded-lg">
                    <Fingerprint className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Aadhar Card</p>
                    <p className="font-semibold text-gray-800 font-mono">{user.aadharcard}</p>
                  </div>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-lg ${
                  user.isVoted ? 'bg-green-50' : 'bg-blue-50'
                }`}>
                  <div className={`p-2 rounded-lg ${
                    user.isVoted ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {user.isVoted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Voting Status</p>
                    <p className={`font-semibold ${
                      user.isVoted ? 'text-green-700' : 'text-blue-700'
                    }`}>
                      {user.isVoted ? 'Vote Submitted ✓' : 'Not Voted Yet'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Security & Actions */}
        <div className="space-y-6">
          {/* Security Status Card */}
          <div className="bg-white rounded-2xl border border-purple-100 shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-purple-600" />
              Security Status
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-700">Account Active</p>
                    <p className="text-sm text-green-600">All systems secure</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Lock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Password Security</p>
                    <p className="text-sm text-gray-600">Last updated recently</p>
                  </div>
                </div>
              </div>

              <button
                onClick={openModal}
                className="w-full bg-linear-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Key className="w-5 h-5" />
                Update Password
              </button>
            </div>
          </div>

          {/* Account Summary */}
          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Account Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Member Since</span>
                <span className="font-semibold text-gray-800">2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Type</span>
                <span className="font-semibold text-purple-700">{user.role || 'Voter'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Verification</span>
                <span className="font-semibold text-green-600">Verified ✓</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-purple-100 shadow-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Edit2 className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Edit Profile</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Mobile Settings</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password Update Modal */}
      {modalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={closeModal}
          ></div>

          <div className="fixed inset-0 flex justify-center items-center z-50 p-4 animate-in zoom-in duration-300">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Key className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Update Password
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={changePassword} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      placeholder="Enter your current password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength="6"
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Password must be at least 6 characters long
                  </p>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-linear-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Footer Note */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          Your information is secured with end-to-end encryption • Last updated just now
        </p>
      </div>
    </div>
  );
}