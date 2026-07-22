// src/pages/Records.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMentalHealth } from "../hooks/useMentalHealth";
import { 
  FaArrowLeft, FaCalendar, FaClock, FaSmile, 
  FaMoon, FaFire, FaBrain, FaChartLine,
  FaChevronLeft, FaChevronRight, FaTrash,
  FaExclamationTriangle, FaSearch, FaBook,
  FaEye, FaTimes, FaHeart, FaUserGraduate, 
  FaTv, FaCode, FaFlask, FaFilter, FaDumbbell,
  FaLightbulb, FaShieldAlt, FaTrophy, FaChartPie,
  FaComments, FaRunning, FaChalkboardTeacher, FaCalendarCheck
} from "react-icons/fa";

export default function Records() {
  const navigate = useNavigate();
  const { records, loading, pagination, loadRecords, deleteRecord } = useMentalHealth();
  
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterScore, setFilterScore] = useState("all");
  const [activeTab, setActiveTab] = useState("analytics"); // 'analytics' | 'history'
  const [selectedMetric, setSelectedMetric] = useState("wellnessScore");
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);

  useEffect(() => {
    loadRecords(1, 30);
  }, []);

  const handlePageChange = (newPage) => {
    loadRecords(newPage, pagination.limit);
  };

  const handleDelete = async () => {
    if (recordToDelete) {
      const result = await deleteRecord(recordToDelete);
      if (result.success) {
        setShowDeleteModal(false);
        setRecordToDelete(null);
      } else {
        alert(result.message || "Failed to delete record");
      }
    }
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const getScoreBadge = (score) => {
    if (score >= 75) return "text-emerald-700 bg-emerald-100 border-emerald-300";
    if (score >= 50) return "text-amber-700 bg-amber-100 border-amber-300";
    return "text-rose-700 bg-rose-100 border-rose-300";
  };

  // Filter records based on search term and score range
  const filteredRecords = useMemo(() => {
    return (records || []).filter(record => {
      const matchesSearch = 
        record.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.socialInteractionQuality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.physicalActivityType?.toLowerCase().includes(searchTerm.toLowerCase());

      const score = record.wellnessScore || 50;
      let matchesScore = true;
      if (filterScore === "high") matchesScore = score >= 75;
      if (filterScore === "medium") matchesScore = score >= 50 && score < 75;
      if (filterScore === "low") matchesScore = score < 50;

      return matchesSearch && matchesScore;
    });
  }, [records, searchTerm, filterScore]);

  // Comprehensive Entity Metrics
  const totalRecords = records?.length || 0;

  const avgWellness = totalRecords > 0 
    ? Math.round(records.reduce((sum, r) => sum + (r.wellnessScore || 50), 0) / totalRecords)
    : 0;

  const avgSleep = totalRecords > 0 
    ? (records.reduce((sum, r) => sum + (r.sleepHours || 0), 0) / totalRecords).toFixed(1)
    : 0;

  const avgAcademicFocus = totalRecords > 0 
    ? Math.round(records.reduce((sum, r) => sum + (r.academicFocusPercentage || 0), 0) / totalRecords)
    : 0;

  const avgSkillHours = totalRecords > 0
    ? (records.reduce((sum, r) => sum + (r.skillDevTimeHours || 0), 0) / totalRecords).toFixed(1)
    : 0;

  const avgLabMinutes = totalRecords > 0
    ? Math.round(records.reduce((sum, r) => sum + (r.labFocusedMinutes || 0), 0) / totalRecords)
    : 0;

  // Chart Chronological Order (Last 10 entries)
  const chartData = useMemo(() => {
    return [...(records || [])].reverse().slice(-10);
  }, [records]);

  // Entity Breakdown Distributions
  const screenTimeStats = useMemo(() => {
    const counts = { "Less than 1 hour": 0, "1 – 2 hours": 0, "2 – 4 hours": 0, "4+ hours": 0 };
    (records || []).forEach(r => {
      const timeKey = r.nonAcademicScreenTime || "1 – 2 hours";
      if (counts[timeKey] !== undefined) counts[timeKey]++;
      else counts["1 – 2 hours"]++;
    });
    return counts;
  }, [records]);

  const socialQualityStats = useMemo(() => {
    const counts = { "Positive & Engaging": 0, "Neutral": 0, "Isolated / Minimal": 0, "Stressful": 0 };
    (records || []).forEach(r => {
      const key = r.socialInteractionQuality || "Neutral";
      if (counts[key] !== undefined) counts[key]++;
      else counts["Neutral"]++;
    });
    return counts;
  }, [records]);

  const activityTypeStats = useMemo(() => {
    const counts = {};
    (records || []).forEach(r => {
      const act = r.physicalActivityType || "None";
      counts[act] = (counts[act] || 0) + 1;
    });
    return counts;
  }, [records]);

  if (loading && totalRecords === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading comprehensive entity analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/home')}
              className="p-3 hover:bg-gray-200 rounded-2xl transition bg-white shadow-sm border border-gray-100 cursor-pointer"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-black text-gray-800 flex items-center">
                📊 Detailed Entity & Health Visualizer
              </h1>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Multi-dimensional visual breakdown of every single logged activity</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/check-in')}
              className="px-5 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition flex items-center cursor-pointer text-sm"
            >
              <FaHeart className="mr-2" /> New Check-in
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex border-b border-gray-200 mb-8 bg-white/70 backdrop-blur-md p-1.5 rounded-2xl max-w-md shadow-sm">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-bold transition flex items-center justify-center cursor-pointer ${
              activeTab === "analytics"
                ? "bg-white text-blue-700 shadow-md"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaChartLine className="mr-2 text-blue-600" /> Entity Charts & Dashboard
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-bold transition flex items-center justify-center cursor-pointer ${
              activeTab === "history"
                ? "bg-white text-blue-700 shadow-md"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaCalendar className="mr-2 text-indigo-600" /> Archive Logs ({totalRecords})
          </button>
        </div>

        {/* Top 5 Primary KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 font-bold uppercase">Avg Wellness</span>
              <FaTrophy className="text-amber-500" />
            </div>
            <p className="text-2xl font-black text-gray-800">{avgWellness}<span className="text-xs text-gray-400">/100</span></p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${avgWellness}%` }}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 font-bold uppercase">Avg Sleep</span>
              <FaMoon className="text-purple-500" />
            </div>
            <p className="text-2xl font-black text-gray-800">{avgSleep} <span className="text-xs text-gray-400">hrs</span></p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (avgSleep/8)*100)}%` }}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 font-bold uppercase">Class Focus</span>
              <FaUserGraduate className="text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-gray-800">{avgAcademicFocus}%</p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${avgAcademicFocus}%` }}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 font-bold uppercase">Skill Dev</span>
              <FaCode className="text-cyan-500" />
            </div>
            <p className="text-2xl font-black text-gray-800">{avgSkillHours} <span className="text-xs text-gray-400">hrs</span></p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (avgSkillHours/3)*100)}%` }}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 font-bold uppercase">Lab Focus</span>
              <FaFlask className="text-rose-500" />
            </div>
            <p className="text-2xl font-black text-gray-800">{avgLabMinutes} <span className="text-xs text-gray-400">mins</span></p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (avgLabMinutes/120)*100)}%` }}></div>
            </div>
          </div>
        </div>

        {/* ANALYTICS & VISUALIZATIONS SECTION */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            
            {/* VISUAL 1: Interactive Longitudinal Trend Chart */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <FaChartLine className="mr-2 text-blue-600" /> Longitudinal Trend Curve
                  </h3>
                  <p className="text-xs text-gray-400">Historical performance trajectory across check-in sessions</p>
                </div>

                <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setSelectedMetric("wellnessScore")}
                    className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                      selectedMetric === "wellnessScore"
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Wellness Score
                  </button>
                  <button
                    onClick={() => setSelectedMetric("academicFocus")}
                    className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                      selectedMetric === "academicFocus"
                        ? "bg-emerald-600 text-white shadow"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Class Focus (%)
                  </button>
                </div>
              </div>

              {chartData.length > 1 ? (
                <div className="relative h-64 w-full">
                  <SvgLineChart
                    data={chartData}
                    metric={selectedMetric}
                    hoveredIndex={hoveredPointIndex}
                    setHoveredIndex={setHoveredPointIndex}
                  />
                </div>
              ) : (
                <p className="text-gray-400 text-sm text-center py-12">Submit at least 2 daily check-ins to generate visual trend curves.</p>
              )}
            </div>

            {/* VISUAL 2 GRID: Sleep & Bedtime Visualizer + Individual Class Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Sleep Duration & Schedule Range Visualizer */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center">
                    <FaMoon className="mr-2 text-purple-600" /> Sleep Duration & Routine Chart
                  </h3>
                  <p className="text-xs text-gray-400 mb-6">Visual tracking of sleep hours logged per day (Target: 7–8 hrs)</p>
                </div>

                <div className="space-y-3">
                  {chartData.map((item, idx) => {
                    const sleep = item.sleepHours || 0;
                    const dateStr = new Date(item.submittedAt || item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const isOptimal = sleep >= 7 && sleep <= 9;

                    return (
                      <div key={idx} className="flex items-center space-x-3 text-xs">
                        <span className="w-16 font-bold text-gray-500">{dateStr}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden relative">
                          <div
                            className={`h-full transition-all duration-500 rounded-full ${
                              isOptimal ? 'bg-purple-600' : 'bg-amber-500'
                            }`}
                            style={{ width: `${Math.min(100, (sleep / 10) * 100)}%` }}
                          />
                        </div>
                        <span className="w-24 text-right font-extrabold text-gray-700">
                          {sleep} hrs <span className="text-[10px] text-gray-400 font-normal">({item.bedtime} - {item.wakeTime})</span>
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between text-xs font-semibold text-gray-500">
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-purple-600 mr-1.5" /> Optimal (7–9 hrs)</span>
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5" /> Below / Exceeding Range</span>
                </div>
              </div>

              {/* Individual Class Focus Breakdown */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center">
                    <FaChalkboardTeacher className="mr-2 text-emerald-600" /> Class-by-Class Focus Breakdown
                  </h3>
                  <p className="text-xs text-gray-400 mb-6">Subject focus ratings extracted from recent class check-ins</p>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {chartData.flatMap(r => r.classDetails || []).length > 0 ? (
                    chartData.flatMap(r => r.classDetails || []).slice(-6).map((cls, idx) => (
                      <div key={idx} className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/60 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                            <FaBook size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-800">{cls.subjectName || `Class #${idx + 1}`}</p>
                            <p className="text-[10px] text-gray-400 font-medium">Focus Rating</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-emerald-200/50 rounded-full h-2">
                            <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${cls.focusPercentage || 0}%` }} />
                          </div>
                          <span className="text-xs font-black text-emerald-700 w-10 text-right">{cls.focusPercentage}%</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-400 text-xs">No class details logged in recent records.</div>
                  )}
                </div>

                <div className="mt-4 text-[11px] text-gray-400 text-center">
                  Calculated directly from individual lecture focus sliders
                </div>
              </div>

            </div>

            {/* VISUAL 3 GRID: Non-Academic Screen Time & Social Quality Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Screen Time Impact Breakdown */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center">
                  <FaTv className="mr-2 text-rose-500" /> Non-Academic Screen Time Habits
                </h3>
                <p className="text-xs text-gray-400 mb-6">Proportion of check-ins categorized by entertainment screen use</p>

                <div className="h-52 flex items-center justify-center">
                  <SvgDonutChart stats={screenTimeStats} total={totalRecords} />
                </div>
              </div>

              {/* Social Quality & Mental Health Matrix */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center">
                  <FaComments className="mr-2 text-indigo-500" /> Social Quality Distribution
                </h3>
                <p className="text-xs text-gray-400 mb-6">Quality of interpersonal interactions recorded in logs</p>

                <div className="space-y-3">
                  {Object.entries(socialQualityStats).map(([label, count], idx) => {
                    const pct = totalRecords > 0 ? Math.round((count / totalRecords) * 100) : 0;
                    const colors = [
                      { bar: "bg-emerald-500", text: "text-emerald-700" },
                      { bar: "bg-blue-500", text: "text-blue-700" },
                      { bar: "bg-amber-500", text: "text-amber-700" },
                      { bar: "bg-rose-500", text: "text-rose-700" },
                    ];

                    return (
                      <div key={label} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span className={colors[idx % colors.length].text}>{label}</span>
                          <span className="text-gray-500">{count} days ({pct}%)</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                          <div className={`h-full rounded-full ${colors[idx % colors.length].bar}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* VISUAL 4: Physical Activity Breakdown Badges */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                <FaDumbbell className="mr-2 text-cyan-600" /> Physical Exercise & Activity Habits
              </h3>
              <p className="text-xs text-gray-400 mb-6">Summary of workout types performed across all check-ins</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(activityTypeStats).length > 0 ? (
                  Object.entries(activityTypeStats).map(([type, count]) => (
                    <div key={type} className="bg-cyan-50/50 p-4 rounded-2xl border border-cyan-100 flex items-center space-x-3">
                      <div className="p-3 bg-cyan-500 text-white rounded-xl">
                        <FaRunning size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Type</p>
                        <p className="text-sm font-extrabold text-cyan-950">{type}</p>
                        <p className="text-[11px] font-semibold text-cyan-700 mt-0.5">{count} {count === 1 ? 'day' : 'days'}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 col-span-4 text-center py-4">No activity data logged yet.</p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* COMPREHENSIVE RECORD ARCHIVE LOGS */}
        {activeTab === "history" && (
          <div>
            {/* Search & Filter Controls */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search interactions, workout types, notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm"
                />
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={filterScore}
                  onChange={(e) => setFilterScore(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl text-xs md:text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="all">All Scores</option>
                  <option value="high">High Score (75+)</option>
                  <option value="medium">Moderate Score (50-74)</option>
                  <option value="low">Low Score (&lt;50)</option>
                </select>
              </div>
            </div>

            {/* List of Detailed Cards */}
            {filteredRecords.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <p className="text-gray-400 font-semibold text-sm mb-2">No matching history records found</p>
                <button 
                  onClick={() => { setSearchTerm(""); setFilterScore("all"); }}
                  className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Reset Search Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRecords.map((record) => {
                  const score = record.wellnessScore || 50;
                  const dateFormatted = new Date(record.submittedAt || record.createdAt).toLocaleDateString('en-US', {
                    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                  });
                  const timeFormatted = new Date(record.submittedAt || record.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit', minute: '2-digit'
                  });

                  return (
                    <div key={record._id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        
                        {/* Score & Timing */}
                        <div className="flex items-center space-x-4">
                          <div className={`px-4 py-2.5 rounded-2xl text-xl font-black border ${getScoreBadge(score)} flex-shrink-0 text-center`}>
                            {score}
                            <span className="block text-[9px] uppercase font-bold opacity-75">Pts</span>
                          </div>
                          <div>
                            <h4 className="font-extrabold text-gray-800 text-base">{dateFormatted}</h4>
                            <p className="text-xs text-gray-400 flex items-center space-x-2 mt-0.5">
                              <span>⏰ {timeFormatted}</span>
                              <span>•</span>
                              <span>{record.classCount || 0} Classes Logged</span>
                            </p>
                          </div>
                        </div>

                        {/* Quick Metrics Badges */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-100">
                            <span className="text-[10px] text-purple-600 font-bold block uppercase">Sleep</span>
                            <span className="font-extrabold text-purple-950">{record.sleepHours || 0} hrs</span>
                          </div>

                          <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                            <span className="text-[10px] text-emerald-600 font-bold block uppercase">Class Focus</span>
                            <span className="font-extrabold text-emerald-950">{record.academicFocusPercentage || 0}%</span>
                          </div>

                          <div className="bg-cyan-50 p-2.5 rounded-xl border border-cyan-100">
                            <span className="text-[10px] text-cyan-600 font-bold block uppercase">Skill Dev</span>
                            <span className="font-extrabold text-cyan-950">{record.skillDevTimeHours || 0} hrs</span>
                          </div>

                          <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                            <span className="text-[10px] text-rose-600 font-bold block uppercase">Screen Time</span>
                            <span className="font-extrabold text-rose-950 truncate block">{record.nonAcademicScreenTime || "1-2 hrs"}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2 justify-end pt-2 lg:pt-0">
                          <button
                            onClick={() => handleViewDetails(record)}
                            className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition font-bold text-xs flex items-center cursor-pointer"
                          >
                            <FaEye className="mr-1.5" /> Inspect Full Entry
                          </button>
                          <button
                            onClick={() => {
                              setRecordToDelete(record._id);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                            title="Delete Entry"
                          >
                            <FaTrash size={15} />
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-2.5 border rounded-xl bg-white hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer"
                >
                  <FaChevronLeft />
                </button>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-extrabold">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="p-2.5 border rounded-xl bg-white hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* FULL RECORD DETAIL MODAL */}
      {showDetailModal && selectedRecord && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-black text-gray-800">
                  Detailed Log Inspect – {new Date(selectedRecord.submittedAt || selectedRecord.createdAt).toLocaleDateString()}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">Full entity breakdown recorded for this check-in</p>
              </div>
              <button onClick={() => setShowDetailModal(false)} className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                <FaTimes size={18} />
              </button>
            </div>

            {/* Grid Breakdown of ALL User Inputs */}
            <div className="space-y-6">
              
              {/* Wellness & Sleep */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-100">
                  <span className="text-[10px] text-amber-700 font-bold uppercase block">Overall Wellness</span>
                  <span className="text-xl font-black text-amber-950">{selectedRecord.wellnessScore || 50} / 100</span>
                </div>

                <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-100">
                  <span className="text-[10px] text-purple-700 font-bold uppercase block">Bedtime → Wake</span>
                  <span className="text-sm font-extrabold text-purple-950 block mt-1">{selectedRecord.bedtime} → {selectedRecord.wakeTime}</span>
                  <span className="text-[11px] text-purple-700 font-semibold">({selectedRecord.sleepHours} hrs total)</span>
                </div>

                <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-100 col-span-2 md:col-span-1">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase block">Avg Class Focus</span>
                  <span className="text-xl font-black text-emerald-950">{selectedRecord.academicFocusPercentage || 0}%</span>
                </div>
              </div>

              {/* Class Details Breakdown */}
              {selectedRecord.classDetails && selectedRecord.classDetails.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <h4 className="text-xs font-extrabold text-gray-700 uppercase mb-3 flex items-center">
                    <FaBook className="mr-2 text-emerald-600" /> Classes Attended ({selectedRecord.classCount})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedRecord.classDetails.map((cls, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-800">{cls.subjectName || `Class #${idx + 1}`}</span>
                        <span className="font-extrabold text-emerald-700">{cls.focusPercentage}% Focus</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lab Session & Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
                  <span className="text-xs font-bold text-rose-700 uppercase block mb-1">Practical Lab Status</span>
                  <p className="text-sm font-extrabold text-rose-950">
                    {selectedRecord.attendedLab ? `Attended (${selectedRecord.labFocusedMinutes} mins focused)` : "No Lab Held Today"}
                  </p>
                </div>

                <div className="bg-cyan-50 p-4 rounded-2xl border border-cyan-100">
                  <span className="text-xs font-bold text-cyan-700 uppercase block mb-1">Skill Development</span>
                  <p className="text-sm font-extrabold text-cyan-950">{selectedRecord.skillDevTimeHours} Hours dedicated</p>
                </div>
              </div>

              {/* Lifestyle Habits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Screen Time</span>
                  <span className="text-xs font-extrabold text-slate-800">{selectedRecord.nonAcademicScreenTime}</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Physical Activity</span>
                  <span className="text-xs font-extrabold text-slate-800">{selectedRecord.physicalActivityType}</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Social Interaction</span>
                  <span className="text-xs font-extrabold text-slate-800">{selectedRecord.socialInteractionQuality}</span>
                </div>
              </div>

              {/* Tomorrow's Academic Commitments Plan */}
              {selectedRecord.tomorrowPlan?.academicCommitments && (
                <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
                  <h4 className="text-xs font-extrabold text-indigo-900 uppercase mb-1 flex items-center">
                    <FaCalendarCheck className="mr-2 text-indigo-600" /> Tomorrow's Schedule Plan
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedRecord.tomorrowPlan.academicCommitments.map((plan, i) => (
                      <span key={i} className="px-3 py-1 bg-white text-indigo-800 font-bold text-xs rounded-xl border border-indigo-200">
                        {plan}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <button
              onClick={() => setShowDetailModal(false)}
              className="w-full mt-6 py-3 bg-blue-600 text-white font-bold text-sm rounded-2xl hover:bg-blue-700 transition cursor-pointer"
            >
              Close Detailed View
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl">
            <FaExclamationTriangle className="text-rose-500 text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800">Delete Record?</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">Are you sure you want to permanently delete this daily check-in log?</p>
            <div className="flex space-x-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 border rounded-2xl text-xs font-bold text-gray-600 cursor-pointer">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-rose-600 text-white rounded-2xl text-xs font-bold hover:bg-rose-700 cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ----------------------------------------------------------------------
// SVG GRAPHICAL COMPONENTS FOR DETAILED ENTITY VISUALIZATION
// ----------------------------------------------------------------------

function SvgLineChart({ data, metric, hoveredIndex, setHoveredIndex }) {
  const width = 800;
  const height = 220;
  const padding = 30;

  const getVal = (item) => {
    if (metric === "wellnessScore") return item.wellnessScore || 50;
    return item.academicFocusPercentage || 0;
  };

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const val = getVal(item);
    const y = height - padding - (val / 100) * (height - 2 * padding);
    return { x, y, val, item };
  });

  const pathD = points.reduce((acc, point, idx) => {
    return idx === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
  const color = metric === "wellnessScore" ? "#2563eb" : "#10b981";

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {[0, 25, 50, 75, 100].map((level) => {
        const y = height - padding - (level / 100) * (height - 2 * padding);
        return (
          <line
            key={level}
            x1={padding}
            y1={y}
            x2={width - padding}
            y2={y}
            stroke="#f1f5f9"
            strokeDasharray="4 4"
          />
        );
      })}

      <path d={areaD} fill={`url(#gradient-${metric})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

      {points.map((pt, idx) => (
        <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)}>
          <circle
            cx={pt.x}
            cy={pt.y}
            r={hoveredIndex === idx ? "7" : "5"}
            fill="#ffffff"
            stroke={color}
            strokeWidth="3"
            className="transition-all duration-200"
          />
          {hoveredIndex === idx && (
            <g>
              <rect x={pt.x - 30} y={pt.y - 35} width="60" height="24" rx="6" fill="#1e293b" />
              <text x={pt.x} y={pt.y - 19} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                {pt.val}{metric === "academicFocus" ? "%" : " pts"}
              </text>
            </g>
          )}
          <text x={pt.x} y={height - 8} fill="#94a3b8" fontSize="10" textAnchor="middle">
            {new Date(pt.item.submittedAt || pt.item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </text>
        </g>
      ))}
    </svg>
  );
}

function SvgDonutChart({ stats, total }) {
  const colors = ["#10b981", "#3b82f6", "#f59e0b", "#f43f5e"];
  const keys = Object.keys(stats);

  if (total === 0) return <p className="text-xs text-gray-400">No screen time records found</p>;

  return (
    <div className="flex items-center space-x-6">
      <svg width="140" height="140" viewBox="0 0 42 42" className="transform -rotate-90">
        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="6" />
        {keys.map((key, idx) => {
          const val = stats[key];
          const pct = (val / total) * 100;
          
          let prevSum = 0;
          for (let i = 0; i < idx; i++) {
            prevSum += (stats[keys[i]] / total) * 100;
          }

          return (
            <circle
              key={key}
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke={colors[idx]}
              strokeWidth="6"
              strokeDasharray={`${pct} ${100 - pct}`}
              strokeDashoffset={-prevSum}
            />
          );
        })}
      </svg>

      <div className="space-y-1.5 text-xs font-semibold">
        {keys.map((key, idx) => (
          <div key={key} className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: colors[idx] }} />
            <span className="text-gray-600">{key}:</span>
            <span className="font-bold text-gray-800">{stats[key]} days</span>
          </div>
        ))}
      </div>
    </div>
  );
}