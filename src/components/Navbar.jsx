// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import {
  FaBrain,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaHome,
  FaClipboardCheck,
  FaHistory,
  FaHeart,
  FaUserGraduate,
  FaCalendarCheck,
  FaChartLine,
  FaShieldAlt,
  FaRegSmile,
} from "react-icons/fa";

export const Navbar = () => {
  const { user, logout } = useAuth();
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
    <nav className="bg-gradient-to-r from-[#1877F2] via-[#1a7ae8] to-[#1877F2] shadow-xl sticky top-0 z-50 border-b border-blue-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo & Brand */}
         <Link to="/home" className="flex items-center space-x-3 group">
  {/* Modern Student Routine Logo Badge */}
  <div className="relative">
    {/* Soft glow hover effect */}
    <div className="absolute inset-0 bg-white/30 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
    
    {/* Main Icon Container */}
    <div className="relative bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 p-2.5 rounded-2xl shadow-md border border-white/20 flex items-center justify-center">
      <FaUserGraduate className="h-6 w-6 md:h-7 md:w-7 text-white transform group-hover:scale-110 transition duration-300" />
      
     
    </div>
  </div>

  {/* Brand Name & Subtitle */}
  <div className="flex flex-col">
    <span className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center">
      MindHaven
    </span>
    <span className="text-[10px] md:text-xs text-blue-100 -mt-1 font-medium tracking-wide">
      Daily Activity & Routine Analytics
    </span>
  </div>
</Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                {/* Navigation Links */}
                <NavLink to="/home" icon={<FaHome />} label="Home" />
                <NavLink
                  to="/check-in"
                  icon={<FaClipboardCheck />}
                  label="Check-in"
                />
                <NavLink to="/records" icon={<FaHistory />} label="Records" />

                {/* Wellness Stats Card */}
                <div className="ml-4 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <FaHeart className="h-4 w-4 text-pink-300 animate-pulse" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-blue-100">
                        Today's Check-in
                      </span>
                      <span className="text-sm font-bold text-white">
                        Ready ✓
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Menu */}
                <div className="relative ml-4">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 pl-4 border-l border-white/20 hover:border-white/40 transition"
                  >
                    <div className="text-right">
                      <p className="text-xs text-blue-100 leading-none">
                        Welcome back,
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {user?.username?.split(" ")[0] || "Student"}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full shadow-lg ring-2 ring-white/30">
                      <FaUser className="h-4 w-4 text-white" />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <p className="font-semibold text-gray-800">
                          {user?.username || "Student"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {user?.email || "No email"}
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                            Active
                          </span>
                        </div>
                      </div>
                      <div className="p-2">
                        <DropdownItem
                          icon={<FaUser />}
                          label="My Profile"
                          onClick={() => navigate("/profile")}
                        />
                        <DropdownItem
                          icon={<FaChartLine />}
                          label="Progress"
                          onClick={() => navigate("/records")}
                        />
                        <DropdownItem
                          icon={<FaCalendarCheck />}
                          label="Daily Check-in"
                          onClick={() => navigate("/submit-check")}
                        />
                        <DropdownItem
                          icon={<FaShieldAlt />}
                          label="Privacy"
                          onClick={() => navigate("/privacy")}
                        />
                        <DropdownItem
                          icon={<FaRegSmile />}
                          label="Resources"
                          onClick={() => navigate("/resources")}
                        />
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
                <Link
                  to="/login"
                  className="text-blue-100 hover:text-white px-4 py-2 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-[#1877F2] px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg hover:shadow-xl"
                >
                  Get Started
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
        <div className="md:hidden bg-gradient-to-b from-[#1877F2] to-[#1565c0] border-t border-white/10 animate-slide-down">
          <div className="p-4 space-y-3">
            {user ? (
              <>
                {/* Mobile User Info */}
                <div className="bg-white/10 rounded-xl p-4 mb-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-2.5 rounded-full">
                      <FaUser className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {user?.username || "Student"}
                      </p>
                      <p className="text-xs text-blue-200">
                        {user?.email || "No email"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200 text-sm">Status</span>
                      <span className="text-white font-medium text-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <MobileNavLink
                  to="/dashboard"
                  icon={<FaHome />}
                  label="Home"
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavLink
                  to="/submit-check"
                  icon={<FaClipboardCheck />}
                  label="Daily Check-in"
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavLink
                  to="/records"
                  icon={<FaHistory />}
                  label="My Records"
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavLink
                  to="/profile"
                  icon={<FaUser />}
                  label="Profile"
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavLink
                  to="/resources"
                  icon={<FaRegSmile />}
                  label="Resources"
                  onClick={() => setIsOpen(false)}
                />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-300 bg-red-400/10 rounded-xl hover:bg-red-400/20 transition"
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
                  className="block text-center bg-white text-[#1877F2] py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
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
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
      className="flex items-center space-x-2 px-4 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition group"
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
      className="flex items-center space-x-3 px-4 py-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition"
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
