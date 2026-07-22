// src/pages/Profile.jsx
import React from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { useMentalHealth } from "../hooks/useMentalHealth";
import { 
  FaArrowLeft, FaUser, FaEnvelope, FaCalendar, 
  FaUserShield, FaHeart, FaBrain, FaChartLine, FaFire
} from "react-icons/fa";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { records, analytics, loading } = useMentalHealth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-gray-500 font-medium">Loading profile...</div>
      </div>
    );
  }

  // Derive stats dynamically from backend analytics and records
  const totalCheckins = analytics?.totalRecords ?? records?.length ?? 0;
  const avgWellness = analytics?.averageWellness 
    ? `${Math.round(analytics.averageWellness)}/100` 
    : (records && records.length > 0 && records[0].wellnessScore 
        ? `${records[0].wellnessScore}/100` 
        : "N/A");
        
  // Derive join date safely
  const joinDate = user?.createdAt || user?.joinedAt
    ? new Date(user.createdAt || user.joinedAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      })
    : new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const usernameDisplay = user.username || user.name || "Student";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation Back */}
        <button
          onClick={() => navigate('/home')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition cursor-pointer font-medium text-sm"
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/30 backdrop-blur-md flex items-center justify-center text-3xl font-bold uppercase shadow-inner">
                {usernameDisplay.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold capitalize">{usernameDisplay}</h1>
                <p className="text-blue-100 text-sm mt-0.5">Student • Mental Health & Focus Tracker</p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <FaUser className="text-blue-600 text-lg flex-shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 font-medium">Username</p>
                  <p className="font-semibold text-gray-800 truncate">{usernameDisplay}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <FaEnvelope className="text-blue-600 text-lg flex-shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 font-medium">Email Address</p>
                  <p className="font-semibold text-gray-800 truncate">{user.email || "N/A"}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <FaCalendar className="text-blue-600 text-lg flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Member Since</p>
                  <p className="font-semibold text-gray-800">{joinDate}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <FaUserShield className="text-blue-600 text-lg flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Account Status</p>
                  <p className="font-semibold text-emerald-600 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span> Active
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic Wellness Statistics */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-bold text-gray-800 mb-4 text-md flex items-center">
                <FaChartLine className="mr-2 text-indigo-600" /> Wellness Lifetime Overview
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                  <FaHeart className="text-pink-500 mx-auto mb-2 text-xl" />
                  <p className="text-2xl font-extrabold text-gray-800">
                    {loading ? "..." : totalCheckins}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">Total Check-ins</p>
                </div>

                <div className="text-center p-4 bg-purple-50/70 rounded-xl border border-purple-100">
                  <FaBrain className="text-purple-500 mx-auto mb-2 text-xl" />
                  <p className="text-2xl font-extrabold text-gray-800">
                    {loading ? "..." : avgWellness}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">Avg Wellness</p>
                </div>

                <div className="text-center p-4 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <FaFire className="text-orange-500 mx-auto mb-2 text-xl" />
                  <p className="text-2xl font-extrabold text-gray-800">
                    {loading ? "..." : totalCheckins}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">Active Days</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}