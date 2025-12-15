import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  Vote,
  Users,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Globe,
  Lock,
  Sparkles,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  // Redirect logged-in users to dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, []);

  const features = [
    { icon: <Shield />, title: 'Secure Voting', desc: 'End-to-end encrypted ballots' },
    { icon: <Users />, title: 'Live Results', desc: 'Real-time election updates' },
    { icon: <BarChart3 />, title: 'Analytics', desc: 'Detailed voting insights' },
    { icon: <Lock />, title: 'Privacy First', desc: 'Anonymous voting system' },
    { icon: <Clock />, title: '24/7 Access', desc: 'Vote anytime, anywhere' },
    { icon: <CheckCircle2 />, title: 'Verified', desc: 'Government approved system' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent" 
             style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-24">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-100 to-pink-100 border border-purple-200 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">Trusted Voting Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-600 to-red-600">
              Democracy
            </span>
            <br />
            <span className="text-gray-800">Made Digital</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Experience secure, transparent, and accessible voting in the digital age.
            Join thousands who trust our platform for fair elections.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/login"
              className="group relative bg-linear-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <Vote className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <Link
              to="/signup"
              className="group bg-white text-purple-700 border-2 border-purple-200 px-8 py-4 rounded-xl font-semibold text-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              Create Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100">
              <p className="text-3xl font-bold text-purple-700">100K+</p>
              <p className="text-sm text-gray-600">Active Voters</p>
            </div>
            <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100">
              <p className="text-3xl font-bold text-purple-700">50+</p>
              <p className="text-sm text-gray-600">Elections</p>
            </div>
            <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100">
              <p className="text-3xl font-bold text-purple-700">99.9%</p>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
            <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100">
              <p className="text-3xl font-bold text-purple-700">24/7</p>
              <p className="text-sm text-gray-600">Support</p>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technology to ensure the integrity of every vote
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                    <div className="text-purple-600 group-hover:text-purple-700 transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 text-center max-w-4xl mx-auto"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30"></div>
            <div className="relative bg-linear-to-r from-purple-600 to-pink-600 text-white p-8 sm:p-12 rounded-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to make your vote count?
              </h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Join our community of voters who trust our platform for secure and transparent elections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Start Voting Now
                </Link>
                <Link
                  to="/signup"
                  className="bg-transparent border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 pt-8 border-t border-purple-100 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-purple-600" />
            <p className="text-sm text-gray-600">
              Secure Voting Platform • End-to-end Encryption • GDPR Compliant
            </p>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Voting App. All rights reserved.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}