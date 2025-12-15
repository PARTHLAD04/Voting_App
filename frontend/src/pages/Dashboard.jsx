import { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import API from '../api/api';
import { 
  Home, 
  User, 
  BarChart3, 
  Shield, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Bell,
  Settings
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count

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

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
    { path: '/dashboard/results', label: 'Election Results', icon: BarChart3 },
    ...(user?.role === 'admin' ? [{ path: '/dashboard/admin', label: 'Admin Panel', icon: Shield }] : []),
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-purple-100 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || 'voter'}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-purple-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-linear-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-sm hover:shadow"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-purple-100 z-40">
        <div className="flex flex-col w-full p-6">
          {/* Logo */}
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-purple-800">
                  Election Hub
                </h1>
                <p className="text-xs text-gray-500">Secure Voting Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    active
                      ? 'bg-linear-to-r from-purple-50 to-purple-100 border border-purple-200 text-purple-700 font-semibold'
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-purple-600' : ''}`} />
                  <span>{item.label}</span>
                  {active && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-purple-50">
              <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || 'voter'}</p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-sm hover:shadow"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        >
          <div 
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl animate-in slide-in-from-left-10 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-purple-800">
                    Election Hub
                  </h1>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-purple-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        active
                          ? 'bg-linear-to-r from-purple-50 to-purple-100 border border-purple-200 text-purple-700 font-semibold'
                          : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-purple-600' : ''}`} />
                      <span>{item.label}</span>
                      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-purple-50">
                  <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role || 'voter'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`pt-20 lg:pt-0 lg:pl-64 min-h-screen transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-0' : ''
      }`}>
        <div className="p-4 lg:p-8">
          {/* Header for Desktop */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {navItems.find(item => isActive(item.path))?.label || 'Dashboard'}
              </h2>
              <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-purple-50 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="p-2 rounded-lg hover:bg-purple-50 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-px h-6 bg-gray-200"></div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden xl:block">
                  <p className="font-semibold text-gray-800 text-sm">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || 'voter'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-2xl shadow-lg border border-purple-100 min-h-[calc(100vh-12rem)]">
            <Outlet />
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Secure Election System • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}