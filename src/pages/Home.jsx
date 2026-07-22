// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { useMentalHealth } from "../hooks/useMentalHealth";
import { 
  FaHeart, FaMoon, FaHistory, FaCalendarCheck, 
  FaClipboardCheck, FaChartLine, FaBrain, FaFire, 
  FaBook, FaArrowRight, FaUserGraduate, FaTv, 
  FaExclamationTriangle, FaBell, FaFlask
} from "react-icons/fa";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { records, analytics, loading: apiLoading } = useMentalHealth();
  const [recentCheckins, setRecentCheckins] = useState([]);

  // Safely convert and format backend API records
  useEffect(() => {
    if (records && Array.isArray(records) && records.length > 0) {
      const formattedRecords = records.map((record) => {
        const dateObj = new Date(record.submittedAt || record.createdAt || Date.now());
        
        return {
          id: record._id || Math.random().toString(),
          wellnessScore: typeof record.wellnessScore === "number" ? record.wellnessScore : 50,
          sleepHours: record.sleepHours ?? 0,
          academicFocus: record.academicFocusPercentage ?? 0,
          labFocus: record.labFocusPercentage ?? 0,
          screenTime: record.nonAcademicScreenTime || "1 – 2 hours",
          socialQuality: record.socialInteractionQuality || "Neutral / Routine",
          tomorrowCommitments: record.tomorrowPlan?.academicCommitments || ["None"],
          date: dateObj.toLocaleDateString("en-US", { 
            month: "short", 
            day: "numeric", 
            year: "numeric" 
          }),
          time: dateObj.toLocaleTimeString("en-US", { 
            hour: "2-digit", 
            minute: "2-digit" 
          })
        };
      });
      setRecentCheckins(formattedRecords);
    } else {
      setRecentCheckins([]);
    }
  }, [records]);

  if (!user || apiLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">Loading your academic wellness dashboard...</p>
        </div>
      </div>
    );
  }

  const latestRecord = recentCheckins[0];

  // Derive display stats safely from backend analytics or fallback to current records
  const totalLogsCount = analytics?.totalRecords ?? recentCheckins.length ?? 0;
  const avgWellness = analytics?.averageWellness ?? (latestRecord ? latestRecord.wellnessScore : "N/A");
  const latestSleep = analytics?.trends?.sleepHours?.last ?? latestRecord?.sleepHours ?? "N/A";
  const latestFocus = latestRecord ? `${latestRecord.academicFocus}%` : "N/A";

  // Check if user has active commitments tomorrow (filtering out "None")
  const activeTomorrowCommitments = latestRecord?.tomorrowCommitments?.filter(c => c !== "None") || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        
        {/* Welcome Header */}
        <div className="mb-8 flex justify-between items-end flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back, <span className="text-blue-700">{user?.username || user?.name || "Student"}</span> 👋
            </h1>
            <p className="text-gray-500 mt-1">Track your focus, balance study habits, and stay ahead of burnout.</p>
          </div>
          <div className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-gray-500 font-medium shadow-sm">
            📅 {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>

        {/* Quick Check-in Card */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <p className="text-blue-200 text-sm mb-2 flex items-center font-medium">
                  <FaHeart className="mr-2 text-pink-300 animate-pulse" />
                  Daily Activity & Focus Check-in
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Have you logged today's progress?
                </h2>
                <p className="text-blue-200 mt-2 text-sm max-w-lg">
                  Submit your daily sleep times, class focus minutes, and tomorrow's upcoming schedule to calculate your wellness score.
                </p>
                <button
                  onClick={() => navigate("/check-in")}
                  className="mt-5 px-8 py-3 bg-white text-blue-900 hover:bg-blue-50 rounded-xl font-bold shadow-lg transition flex items-center group cursor-pointer"
                >
                  Start Today's Log
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
               <div className="relative">
    {/* Soft glow hover effect */}
    <div className="absolute inset-0 bg-white/30 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
    
    {/* Main Icon Container */}
    <div className="relative bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 p-2.5 rounded-2xl shadow-md border border-white/20 flex items-center justify-center">
      <FaUserGraduate className="h-6 w-6 md:h-7 md:w-7 text-white transform group-hover:scale-110 transition duration-300" />
      
     
    </div>
  </div>
            </div>
          </div>
        </div>

        {/* Tomorrow's Preparation Alert Banner */}
        {activeTomorrowCommitments.length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl shadow-sm mb-8 flex items-start space-x-3">
            <FaBell className="text-amber-600 mt-1 flex-shrink-0" size={18} />
            <div>
              <h4 className="text-sm font-bold text-amber-900">Upcoming Schedule Alert for Tomorrow</h4>
              <p className="text-xs text-amber-800 mt-0.5">
                You have scheduled commitments: <span className="font-semibold">{activeTomorrowCommitments.join(", ")}</span>. Make sure to prepare your study plan accordingly tonight!
              </p>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<FaFire className="text-orange-500" />}
            title="Total Logs"
            value={totalLogsCount}
            color="orange"
          />
          <StatCard
            icon={<FaClipboardCheck className="text-blue-500" />}
            title="Avg Wellness Score"
            value={typeof avgWellness === "number" ? `${avgWellness}/100` : avgWellness}
            color="blue"
          />
          <StatCard
            icon={<FaMoon className="text-purple-500" />}
            title="Recent Sleep"
            value={typeof latestSleep === "number" ? `${latestSleep}h` : latestSleep}
            color="purple"
          />
          <StatCard
            icon={<FaUserGraduate className="text-emerald-500" />}
            title="Academic Focus"
            value={latestFocus}
            color="green"
          />
        </div>

        {/* Quick Action Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <ActionButton
            icon={<FaHeart />}
            title="Daily Check-in"
            color="pink"
            onClick={() => navigate("/check-in")}
          />
          <ActionButton
            icon={<FaCalendarCheck />}
            title="History Logs"
            color="blue"
            onClick={() => navigate("/records")}
          />
          <ActionButton
            icon={<FaChartLine />}
            title="Analytics"
            color="green"
            onClick={() => navigate("/records")}
          />
          <ActionButton
            icon={<FaBook />}
            title="Resources"
            color="purple"
            onClick={() => navigate("/resources")}
          />
        </div>

        {/* Recent Check-ins List */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <FaHistory className="mr-2 text-blue-600" size={18} />
              Recent Activity Logs
            </h3>
            <button 
              onClick={() => navigate("/records")}
              className="text-blue-600 text-sm hover:text-blue-700 font-semibold flex items-center cursor-pointer"
            >
              View Full History →
            </button>
          </div>
          
          <div className="space-y-3">
            {recentCheckins.length > 0 ? (
              recentCheckins.slice(0, 5).map((checkin) => (
                <CheckinItem key={checkin.id} checkin={checkin} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm">No activity logs recorded yet</p>
                <button
                  onClick={() => navigate("/check-in")}
                  className="mt-3 text-blue-600 hover:text-blue-700 font-semibold text-sm cursor-pointer"
                >
                  Submit your first check-in →
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, title, value, color }) {
  const colors = {
    orange: "bg-orange-50 text-orange-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
    blue: "bg-blue-50 text-blue-700"
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs font-semibold uppercase">{title}</p>
          <p className="text-xl font-extrabold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Action Button Component
function ActionButton({ icon, title, color, onClick }) {
  const gradients = {
    pink: "from-pink-500 to-rose-500",
    blue: "from-blue-500 to-indigo-500",
    green: "from-emerald-500 to-teal-500",
    purple: "from-purple-500 to-violet-500"
  };
  
  const bgColors = {
    pink: "bg-pink-50/60 hover:bg-pink-50",
    blue: "bg-blue-50/60 hover:bg-blue-50",
    green: "bg-emerald-50/60 hover:bg-emerald-50",
    purple: "bg-purple-50/60 hover:bg-purple-50"
  };

  return (
    <button
      onClick={onClick}
      className={`${bgColors[color]} p-4 rounded-2xl flex flex-col items-center space-y-2 transition-all duration-200 border border-gray-100 hover:shadow-md group cursor-pointer w-full`}
    >
      <div className={`p-3 bg-gradient-to-r ${gradients[color]} rounded-xl shadow-md text-white group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="font-bold text-xs md:text-sm text-gray-700">{title}</span>
    </button>
  );
}

// Checkin Item Component
function CheckinItem({ checkin }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50/80 transition">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center font-extrabold text-blue-700 text-sm border border-blue-100 flex-shrink-0">
          {checkin.wellnessScore}
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">
            Wellness Score: {checkin.wellnessScore}/100
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {checkin.date} • Sleep: {checkin.sleepHours}h • Class Focus: {checkin.academicFocus}% • Screen: {checkin.screenTime}
          </p>
        </div>
      </div>
      
      <div className="hidden sm:block text-right">
        <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Logged
        </span>
      </div>
    </div>
  );
}