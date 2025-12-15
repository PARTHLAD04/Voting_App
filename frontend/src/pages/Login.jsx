import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import {
  Shield,
  Lock,
  Fingerprint,
  Eye,
  EyeOff,
  LogIn,
  ArrowRight,
  User,
  AlertCircle,
  Smartphone
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [aadharcard, setAadharcard] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await API.post('/user/login', { aadharcard, password });
      localStorage.setItem('token', res.data.token);
      
      // Show success animation before navigation
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Info & Welcome */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="bg-linear-to-br from-purple-600 to-purple-800 rounded-3xl shadow-2xl p-8 lg:p-12 text-white">
              {/* Logo/Brand */}
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">SecureVote</h1>
                  <p className="text-purple-200 text-sm">Election Platform</p>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Welcome Back
                  <span className="block text-purple-200">Voter!</span>
                </h2>
                <p className="text-purple-100 opacity-90">
                  Secure your democratic right with our encrypted voting platform.
                  Cast your vote with confidence and transparency.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-purple-100">End-to-end encrypted voting</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span className="text-purple-100">Real-time election updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-purple-100">100% anonymous voting</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-xs text-purple-200">Active Voters</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-xs text-purple-200">Uptime</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-10 border border-purple-100">
              {/* Mobile Logo */}
              <div className="lg:hidden flex justify-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-linear-to-r from-purple-600 to-purple-700 p-3 rounded-xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">SecureVote</h1>
                    <p className="text-gray-500 text-sm">Secure Election Platform</p>
                  </div>
                </div>
              </div>

              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to access your voting dashboard</p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-600 font-medium">{error}</p>
                  </div>
                </motion.div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Aadhar Card Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Aadhar Card Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Fingerprint className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter 12-digit Aadhar number"
                      value={aadharcard}
                      onChange={(e) => setAadharcard(e.target.value)}
                      required
                      maxLength="12"
                      pattern="\d{12}"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Enter your 12-digit Aadhar Card Number
                  </p>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="6"
                      className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Password must be at least 6 characters long
                  </p>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full bg-linear-to-r from-purple-600 to-purple-700 text-white py-3.5 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <LogIn className="w-5 h-5" />
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </button>

              

                
                
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                  >
                    Create account
                  </Link>
                </p>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-700">Secure Login</p>
                    <p className="text-xs text-purple-600">
                      Your credentials are encrypted and never shared. Learn more about our security measures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}