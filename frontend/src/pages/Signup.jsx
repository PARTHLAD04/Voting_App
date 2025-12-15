import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import {
  UserPlus,
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  UserCircle2,
  Fingerprint,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Home,
  Smartphone
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    mobile: '',
    address: '',
    gender: '',
    aadharcard: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validateForm = () => {
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.aadharcard.length !== 12) {
      setError('Aadhar Card must be 12 digits');
      return false;
    }
    if (formData.mobile.length !== 10) {
      setError('Mobile number must be 10 digits');
      return false;
    }
    if (parseInt(formData.age) < 18) {
      setError('You must be at least 18 years old to register');
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await API.post('/user/signup', formData);
      localStorage.setItem('token', res.data.token);
      
      // Show success state before navigation
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Contact Details', icon: Smartphone },
    { number: 3, title: 'Security', icon: Shield },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    min="18"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Must be 18+</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <UserCircle2 className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

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
                  name="aadharcard"
                  placeholder="12-digit Aadhar number"
                  maxLength="12"
                  pattern="\d{12}"
                  value={formData.aadharcard}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 font-mono"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter 12-digit Aadhar Card Number</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  pattern="\d{10}"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <textarea
                  name="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
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
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${formData.password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-xs text-gray-600">6+ characters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-xs text-gray-600">Uppercase</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="mt-2">
                {confirmPassword && formData.password === confirmPassword && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Passwords match</span>
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 mt-0.5 text-purple-600 rounded focus:ring-purple-500"
                />
                <div>
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                      Privacy Policy
                    </a>
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    By registering, you agree to follow election guidelines and voting rules.
                  </p>
                </div>
              </label>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-linear-to-br from-purple-600 to-purple-800 rounded-3xl shadow-2xl p-8 text-white h-full">
              {/* Branding */}
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">SecureVote</h1>
                  <p className="text-purple-200 text-sm">Join the Digital Democracy</p>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Join Thousands of
                  <span className="block text-purple-200">Registered Voters</span>
                </h2>
                <p className="text-purple-100 opacity-90">
                  Create your account and exercise your democratic right securely.
                  Your vote matters in shaping the future.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-purple-100">Secure & anonymous voting</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-purple-100">Real-time election updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-purple-100">Government verified system</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-purple-100">24/7 voter support</span>
                </div>
              </div>

              {/* Already have account */}
              <div className="mt-auto">
                <p className="text-purple-200 mb-3">Already registered?</p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign in to your account
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-10 border border-purple-100">
              {/* Form Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-linear-to-r from-pink-600 to-pink-700 p-3 rounded-xl">
                    <UserPlus className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-600">Join our secure voting platform</p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    {steps.map((step) => {
                      const Icon = step.icon;
                      const isActive = step.number === currentStep;
                      const isCompleted = step.number < currentStep;
                      
                      return (
                        <div key={step.number} className="flex flex-col items-center relative">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : isActive
                              ? 'bg-linear-to-r from-pink-600 to-pink-700 text-white'
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <Icon className="w-6 h-6" />
                            )}
                          </div>
                          <span className={`text-sm font-medium mt-2 ${
                            isActive || isCompleted ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="relative mt-6">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 h-0.5 bg-linear-to-r from-pink-600 to-pink-700 -translate-y-1/2 transition-all duration-300"
                         style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}>
                    </div>
                  </div>
                </div>
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

              {/* Step Content */}
              <form onSubmit={handleSignup}>
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                    >
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group px-8 py-3 bg-linear-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold hover:from-pink-700 hover:to-pink-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>Complete Registration</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </button>
                  )}
                </div>
              </form>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-700">Your Data is Protected</p>
                    <p className="text-xs text-purple-600">
                      We use bank-level encryption to protect your personal information.
                      Your voting data is completely anonymous.
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