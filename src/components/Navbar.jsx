import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { 
  FaUniversity, FaSignOutAlt, FaUser, FaBars, FaTimes, 
  FaWallet, FaChartLine, FaHistory, FaCog, FaBell, 
  FaShieldAlt, FaCreditCard, FaHome, FaHandHoldingUsd
} from "react-icons/fa";

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-xl sticky top-0 z-50 border-b border-blue-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50 group-hover:opacity-75 transition"></div>
              <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 rounded-xl shadow-lg">
                <FaUniversity className="h-6 w-6 md:h-7 md:w-7 text-slate-900" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Elite<span className="text-yellow-400">Bank</span>
              </span>
              <span className="text-[10px] md:text-xs text-blue-300 -mt-1">Premium Banking</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                {/* Navigation Links */}
                <NavLink to="/dashboard" icon={<FaHome />} label="Dashboard" />
                <NavLink to="/transactions" icon={<FaHistory />} label="Transactions" />
                <NavLink to="/cards" icon={<FaCreditCard />} label="Cards" />
                
                {/* Balance Card */}
                <div className="ml-4 px-5 py-2 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-full border border-yellow-400/30 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <FaWallet className="h-4 w-4 text-yellow-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-blue-300">Total Balance</span>
                      <span className="text-sm font-bold text-white">
                        ৳ {user?.balance?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Menu */}
                <div className="relative ml-4">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 pl-4 border-l border-blue-700/50 hover:border-blue-500 transition"
                  >
                    <div className="text-right">
                      <p className="text-xs text-blue-300 leading-none">Welcome back,</p>
                      <p className="text-sm font-semibold text-white">{user?.fullName?.split(' ')[0] || 'User'}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-full shadow-lg ring-2 ring-yellow-400/50">
                      <FaUser className="h-4 w-4 text-white" />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <p className="font-semibold text-gray-800">{user?.fullName}</p>
                        <p className="text-xs text-gray-500 font-mono mt-1">{user?.accountNumber}</p>
                      </div>
                      <div className="p-2">
                        <DropdownItem icon={<FaUser />} label="My Profile" onClick={() => navigate("/profile")} />
                        <DropdownItem icon={<FaCog />} label="Settings" onClick={() => navigate("/settings")} />
                        <DropdownItem icon={<FaShieldAlt />} label="Security" onClick={() => navigate("/security")} />
                        <DropdownItem icon={<FaBell />} label="Notifications" onClick={() => navigate("/notifications")} />
                        <div className="border-t my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition"
                        >
                          <FaSignOutAlt size={16} />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-blue-200 hover:text-white px-4 py-2 transition">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-6 py-2 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-600 transition shadow-lg hover:shadow-xl"
                >
                  Open Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-slate-800 to-slate-900 border-t border-blue-800/50 animate-slide-down">
          <div className="p-4 space-y-3">
            {isAuthenticated ? (
              <>
                {/* Mobile User Info */}
                <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl p-4 mb-4 border border-blue-700/30">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 rounded-full">
                      <FaUser className="text-slate-900" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{user?.fullName}</p>
                      <p className="text-xs text-blue-300 font-mono">{user?.accountNumber}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-700/30">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300 text-sm">Balance</span>
                      <span className="text-white font-bold text-lg">৳ {user?.balance?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <MobileNavLink to="/dashboard" icon={<FaHome />} label="Dashboard" onClick={() => setIsOpen(false)} />
                <MobileNavLink to="/transactions" icon={<FaHistory />} label="Transactions" onClick={() => setIsOpen(false)} />
                <MobileNavLink to="/cards" icon={<FaCreditCard />} label="Cards" onClick={() => setIsOpen(false)} />
                <MobileNavLink to="/profile" icon={<FaUser />} label="Profile" onClick={() => setIsOpen(false)} />
                <MobileNavLink to="/settings" icon={<FaCog />} label="Settings" onClick={() => setIsOpen(false)} />
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 bg-red-400/10 rounded-xl hover:bg-red-400/20 transition"
                >
                  <FaSignOutAlt size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-center text-white bg-white/10 py-3 rounded-xl hover:bg-white/20 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Open Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

// Navigation Link Component
function NavLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 px-4 py-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition group"
    >
      <span className="group-hover:scale-110 transition">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

// Dropdown Item Component
function DropdownItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-xl transition"
    >
      <span className="text-gray-500">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

// Mobile Nav Link Component
function MobileNavLink({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center space-x-3 px-4 py-3 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition"
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}