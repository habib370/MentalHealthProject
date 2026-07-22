// src/pages/Progress.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMentalHealth } from "../hooks/useMentalHealth";
import { useAuth } from "../context/Auth";
import { 
  FaArrowLeft, FaChartLine, FaBrain, FaHeart,
  FaMoon, FaFire, FaSmile, FaCalendarCheck,
  FaArrowUp, FaArrowDown, FaMinus,
  FaCheckCircle, FaExclamationTriangle,
  FaUserGraduate, FaComments,
  FaUtensils, FaUsers, FaBook,
  FaClock, FaMedal, FaTrophy, FaStar
} from "react-icons/fa";

export default function Progress() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { records, loading, loadRecords, analytics } = useMentalHealth();
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [progressData, setProgressData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('wellness');
  const [showInsights, setShowInsights] = useState(true);

  useEffect(() => {
    loadRecords(1, 100);
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      calculateProgress();
    }
  }, [records, selectedPeriod]);

  const calculateProgress = () => {
    const sortedRecords = [...records].sort((a, b) => 
      new Date(a.submittedAt) - new Date(b.submittedAt)
    );

    let filtered = sortedRecords;
    if (selectedPeriod === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = sortedRecords.filter(r => new Date(r.submittedAt) >= weekAgo);
    } else if (selectedPeriod === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      filtered = sortedRecords.filter(r => new Date(r.submittedAt) >= monthAgo);
    } else if (selectedPeriod === 'quarter') {
      const quarterAgo = new Date();
      quarterAgo.setMonth(quarterAgo.getMonth() - 3);
      filtered = sortedRecords.filter(r => new Date(r.submittedAt) >= quarterAgo);
    }

    if (filtered.length === 0) {
      setProgressData(null);
      return;
    }

    // Calculate metrics
    const metrics = {
      wellness: {
        label: 'Wellness Score',
        icon: <FaBrain className="text-blue-600" />,
        values: filtered.map(r => r.wellnessScore || 50),
        current: filtered[filtered.length - 1]?.wellnessScore || 50,
        previous: filtered[filtered.length - 2]?.wellnessScore || 50,
        average: Math.round(filtered.reduce((sum, r) => sum + (r.wellnessScore || 50), 0) / filtered.length),
        color: 'blue',
        maxValue: 100
      },
      mood: {
        label: 'Mood Score',
        icon: <FaSmile className="text-green-600" />,
        values: filtered.map(r => {
          const moodMap = { happy: 5, neutral: 3, sad: 1, stressed: 2, anxious: 1 };
          return moodMap[r.mood] || 3;
        }),
        current: filtered[filtered.length - 1] ? 
          { happy: 5, neutral: 3, sad: 1, stressed: 2, anxious: 1 }[filtered[filtered.length - 1].mood] || 3 : 3,
        previous: filtered[filtered.length - 2] ? 
          { happy: 5, neutral: 3, sad: 1, stressed: 2, anxious: 1 }[filtered[filtered.length - 2].mood] || 3 : 3,
        average: Math.round(filtered.reduce((sum, r) => {
          const moodMap = { happy: 5, neutral: 3, sad: 1, stressed: 2, anxious: 1 };
          return sum + (moodMap[r.mood] || 3);
        }, 0) / filtered.length),
        color: 'green',
        maxValue: 5
      },
      sleep: {
        label: 'Sleep Hours',
        icon: <FaMoon className="text-purple-600" />,
        values: filtered.map(r => r.sleepHours || 0),
        current: filtered[filtered.length - 1]?.sleepHours || 0,
        previous: filtered[filtered.length - 2]?.sleepHours || 0,
        average: Number((filtered.reduce((sum, r) => sum + (r.sleepHours || 0), 0) / filtered.length).toFixed(1)),
        color: 'purple',
        maxValue: 12
      },
      stress: {
        label: 'Stress Level',
        icon: <FaFire className="text-orange-600" />,
        values: filtered.map(r => r.stressLevel || 0),
        current: filtered[filtered.length - 1]?.stressLevel || 0,
        previous: filtered[filtered.length - 2]?.stressLevel || 0,
        average: Number((filtered.reduce((sum, r) => sum + (r.stressLevel || 0), 0) / filtered.length).toFixed(1)),
        color: 'orange',
        isNegative: true,
        maxValue: 10
      },
      anxiety: {
        label: 'Anxiety Level',
        icon: <FaComments className="text-red-600" />,
        values: filtered.map(r => r.anxietyLevel || 0),
        current: filtered[filtered.length - 1]?.anxietyLevel || 0,
        previous: filtered[filtered.length - 2]?.anxietyLevel || 0,
        average: Number((filtered.reduce((sum, r) => sum + (r.anxietyLevel || 0), 0) / filtered.length).toFixed(1)),
        color: 'red',
        isNegative: true,
        maxValue: 10
      },
      participation: {
        label: 'Class Participation',
        icon: <FaUserGraduate className="text-indigo-600" />,
        values: filtered.map(r => r.classroomParticipation || 0),
        current: filtered[filtered.length - 1]?.classroomParticipation || 0,
        previous: filtered[filtered.length - 2]?.classroomParticipation || 0,
        average: Number((filtered.reduce((sum, r) => sum + (r.classroomParticipation || 0), 0) / filtered.length).toFixed(1)),
        color: 'indigo',
        maxValue: 10
      },
      study: {
        label: 'Study Hours',
        icon: <FaBook className="text-yellow-600" />,
        values: filtered.map(r => r.studyHours || 0),
        current: filtered[filtered.length - 1]?.studyHours || 0,
        previous: filtered[filtered.length - 2]?.studyHours || 0,
        average: Number((filtered.reduce((sum, r) => sum + (r.studyHours || 0), 0) / filtered.length).toFixed(1)),
        color: 'yellow',
        maxValue: 12
      },
      social: {
        label: 'Social Interaction',
        icon: <FaUsers className="text-pink-600" />,
        values: filtered.map(r => r.socialInteraction || 0),
        current: filtered[filtered.length - 1]?.socialInteraction || 0,
        previous: filtered[filtered.length - 2]?.socialInteraction || 0,
        average: Number((filtered.reduce((sum, r) => sum + (r.socialInteraction || 0), 0) / filtered.length).toFixed(1)),
        color: 'pink',
        maxValue: 10
      },
      diet: {
        label: 'Diet Quality',
        icon: <FaUtensils className="text-teal-600" />,
        values: filtered.map(r => r.dietQuality || 0),
        current: filtered[filtered.length - 1]?.dietQuality || 0,
        previous: filtered[filtered.length - 2]?.dietQuality || 0,
        average: Number((filtered.reduce((sum, r) => sum + (r.dietQuality || 0), 0) / filtered.length).toFixed(1)),
        color: 'teal',
        maxValue: 10
      }
    };

    // Calculate trends
    const getTrend = (values) => {
      if (values.length < 2) return 'neutral';
      const first = values[0];
      const last = values[values.length - 1];
      if (last > first) return 'up';
      if (last < first) return 'down';
      return 'neutral';
    };

    const trendData = {};
    Object.keys(metrics).forEach(key => {
      trendData[key] = {
        ...metrics[key],
        trend: getTrend(metrics[key].values),
        improvement: metrics[key].current - metrics[key].previous
      };
    });

    // Calculate overall trend
    const overallTrend = getTrend(metrics.wellness.values);
    const bestMetric = Object.entries(trendData).sort((a, b) => b[1].improvement - a[1].improvement)[0];
    const worstMetric = Object.entries(trendData).sort((a, b) => a[1].improvement - b[1].improvement)[0];

    setProgressData({
      metrics: trendData,
      totalRecords: filtered.length,
      timeRange: selectedPeriod,
      labels: filtered.map(r => new Date(r.submittedAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })),
      overallTrend,
      bestMetric: bestMetric ? { name: bestMetric[0], ...bestMetric[1] } : null,
      worstMetric: worstMetric ? { name: worstMetric[0], ...worstMetric[1] } : null
    });
  };

  const getMetricColor = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500',
      yellow: 'bg-yellow-500',
      pink: 'bg-pink-500',
      teal: 'bg-teal-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  const getMetricBgColor = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      orange: 'bg-orange-50 border-orange-200',
      red: 'bg-red-50 border-red-200',
      indigo: 'bg-indigo-50 border-indigo-200',
      yellow: 'bg-yellow-50 border-yellow-200',
      pink: 'bg-pink-50 border-pink-200',
      teal: 'bg-teal-50 border-teal-200'
    };
    return colors[color] || 'bg-gray-50 border-gray-200';
  };

  const getTrendIcon = (trend, isNegative = false) => {
    if (trend === 'up') {
      return isNegative ? 
        <FaArrowDown className="text-red-500" /> : 
        <FaArrowUp className="text-green-500" />;
    }
    if (trend === 'down') {
      return isNegative ? 
        <FaArrowUp className="text-green-500" /> : 
        <FaArrowDown className="text-red-500" />;
    }
    return <FaMinus className="text-gray-500" />;
  };

  if (loading && records.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your progress data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/home')}
              className="p-2 hover:bg-gray-200 rounded-lg transition bg-white shadow-sm hover:shadow"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📈 Your Progress</h1>
              <p className="text-gray-500 text-sm mt-1">Visual analytics of your mental health journey</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/check-in')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition flex items-center"
            >
              <FaHeart className="mr-2" />
              New Check-in
            </button>
            <button
              onClick={() => navigate('/records')}
              className="px-4 py-2 bg-white text-gray-700 rounded-xl font-medium hover:shadow-lg transition flex items-center border border-gray-200"
            >
              <FaClock className="mr-2" />
              View Records
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600 mr-2">Time Period:</span>
            {['all', 'week', 'month', 'quarter'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period === 'all' ? 'All Time' : 
                 period === 'week' ? 'Last 7 Days' :
                 period === 'month' ? 'Last 30 Days' : 'Last 90 Days'}
              </button>
            ))}
          </div>
        </div>

        {!progressData || progressData.totalRecords === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Progress Data Available</h3>
            <p className="text-gray-500 mb-4">
              Start your mental health journey with your first check-in to see your progress!
            </p>
            <button
              onClick={() => navigate('/check-in')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition"
            >
              Start Check-in
            </button>
          </div>
        ) : (
          <>
            {/* Overall Status Card */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-6 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-blue-100 text-sm">Overall Wellness Trend</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-4xl font-bold">
                      {progressData.overallTrend === 'up' && '📈'}
                      {progressData.overallTrend === 'down' && '📉'}
                      {progressData.overallTrend === 'neutral' && '➡️'}
                    </span>
                    <span className="text-2xl font-bold">
                      {progressData.overallTrend === 'up' ? 'Improving' : 
                       progressData.overallTrend === 'down' ? 'Needs Attention' : 'Stable'}
                    </span>
                  </div>
                  <p className="text-blue-100 text-sm mt-1">
                    Based on {progressData.totalRecords} check-ins
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {progressData.bestMetric && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                      <p className="text-xs text-blue-100">Best Improvement</p>
                      <p className="font-bold">{progressData.bestMetric.label}</p>
                      <p className="text-sm text-green-200">
                        +{progressData.bestMetric.improvement > 0 ? '+' : ''}
                        {progressData.bestMetric.improvement.toFixed(1)}
                      </p>
                    </div>
                  )}
                  {progressData.worstMetric && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                      <p className="text-xs text-blue-100">Needs Attention</p>
                      <p className="font-bold">{progressData.worstMetric.label}</p>
                      <p className="text-sm text-red-200">
                        {progressData.worstMetric.improvement > 0 ? '+' : ''}
                        {progressData.worstMetric.improvement.toFixed(1)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Cards - Only showing key stats, no records */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Total Check-ins</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{progressData.totalRecords}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <FaCalendarCheck className="text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Avg Wellness</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {progressData.metrics.wellness.average}/100
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl">
                    <FaBrain className="text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Avg Sleep</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">
                      {progressData.metrics.sleep.average}h
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <FaMoon className="text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Current Streak</p>
                    <p className="text-2xl font-bold text-green-600 mt-1 flex items-center">
                      <FaTrophy className="mr-1 text-yellow-500" />
                      {Math.min(progressData.totalRecords, 7)} days
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-xl">
                    <FaMedal className="text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Metric Cards - Analytics only */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {Object.entries(progressData.metrics).map(([key, metric]) => (
                <div 
                  key={key}
                  className={`border-2 rounded-xl p-4 hover:shadow-lg transition cursor-pointer ${getMetricBgColor(metric.color)}`}
                  onClick={() => setSelectedMetric(key)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-xl">{metric.icon}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{metric.label}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-bold">
                            {key === 'wellness' ? `${metric.current}/100` : 
                             key === 'sleep' || key === 'study' ? `${metric.current}h` :
                             typeof metric.current === 'number' ? metric.current.toFixed(1) : metric.current}
                          </span>
                          <span className="text-xs text-gray-500">
                            (avg: {key === 'wellness' ? `${metric.average}/100` : 
                             key === 'sleep' || key === 'study' ? `${metric.average}h` :
                             typeof metric.average === 'number' ? metric.average.toFixed(1) : metric.average})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(metric.trend, metric.isNegative)}
                      <span className="text-xs font-medium">
                        {metric.improvement !== 0 && 
                          `${metric.improvement > 0 ? '+' : ''}${metric.improvement.toFixed(1)}`
                        }
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`${getMetricColor(metric.color)} h-1.5 rounded-full transition-all duration-500`}
                        style={{ 
                          width: `${Math.min(100, (metric.average / (metric.maxValue || 10)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trend Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FaChartLine className="text-blue-600 text-xl" />
                  <h3 className="text-lg font-bold text-gray-800">
                    {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Trend
                  </h3>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                    Current
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-blue-300 rounded-full mr-1 opacity-70"></span>
                    Previous
                  </span>
                </div>
              </div>

              {/* Chart */}
              <div className="h-64 flex items-end space-x-1 overflow-x-auto pb-4">
                {progressData.metrics[selectedMetric]?.values.map((value, index) => {
                  const maxValue = progressData.metrics[selectedMetric]?.maxValue || 10;
                  const heightPercentage = Math.min(100, (value / maxValue) * 100);
                  const isLast = index === progressData.metrics[selectedMetric].values.length - 1;
                  const color = progressData.metrics[selectedMetric]?.color || 'blue';
                  
                  return (
                    <div key={index} className="flex flex-col items-center flex-1 min-w-[20px] group">
                      <div className="relative w-full flex flex-col items-center">
                        <div 
                          className={`w-full ${getMetricColor(color)} rounded-t transition-all duration-500 group-hover:opacity-80`}
                          style={{ 
                            height: `${heightPercentage}%`,
                            minHeight: '4px',
                            opacity: isLast ? 1 : 0.7
                          }}
                        />
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                          {value} ({progressData.labels[index] || ''})
                        </div>
                      </div>
                      {index % Math.max(1, Math.floor(progressData.labels.length / 10)) === 0 && (
                        <span className="text-[8px] text-gray-500 mt-1 transform rotate-45 origin-top-left">
                          {progressData.labels[index] || ''}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insights Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 flex items-center">
                  <FaCheckCircle className="mr-2" />
                  Areas of Improvement ✅
                </h4>
                <ul className="mt-2 space-y-1">
                  {Object.entries(progressData.metrics)
                    .filter(([key, metric]) => metric.trend === 'up' && !metric.isNegative)
                    .slice(0, 4)
                    .map(([key, metric]) => (
                      <li key={key} className="text-sm text-green-700 flex items-center justify-between">
                        <span>{metric.icon} {metric.label}</span>
                        <span className="font-medium">
                          +{metric.improvement.toFixed(1)} 
                          {key === 'wellness' ? 'pts' : 
                           key === 'sleep' || key === 'study' ? 'hrs' : ''}
                        </span>
                      </li>
                    ))}
                  {Object.entries(progressData.metrics)
                    .filter(([key, metric]) => metric.trend === 'up' && !metric.isNegative).length === 0 && (
                    <li className="text-sm text-gray-500">No improvements yet. Keep going! 💪</li>
                  )}
                </ul>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-800 flex items-center">
                  <FaExclamationTriangle className="mr-2" />
                  Areas Needing Attention ⚠️
                </h4>
                <ul className="mt-2 space-y-1">
                  {Object.entries(progressData.metrics)
                    .filter(([key, metric]) => metric.trend === 'down' && !metric.isNegative)
                    .slice(0, 4)
                    .map(([key, metric]) => (
                      <li key={key} className="text-sm text-red-700 flex items-center justify-between">
                        <span>{metric.icon} {metric.label}</span>
                        <span className="font-medium">
                          {metric.improvement.toFixed(1)}
                          {key === 'wellness' ? 'pts' : 
                           key === 'sleep' || key === 'study' ? 'hrs' : ''}
                        </span>
                      </li>
                    ))}
                  {Object.entries(progressData.metrics)
                    .filter(([key, metric]) => metric.trend === 'down' && !metric.isNegative).length === 0 && (
                    <li className="text-sm text-gray-500">Everything is looking good! 🌟</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Quick Stats Summary */}
            <div className="bg-white rounded-xl p-4 shadow-sm mt-6 border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Best Mood</p>
                  <p className="text-lg font-bold text-green-600">
                    {(() => {
                      const moods = records.map(r => r.mood);
                      const counts = {};
                      moods.forEach(m => counts[m] = (counts[m] || 0) + 1);
                      const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
                      return best ? `${best[0]} (${best[1]}x)` : 'N/A';
                    })()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Most Common Issue</p>
                  <p className="text-lg font-bold text-orange-600">
                    {progressData.metrics.stress.average > 7 ? 'High Stress' :
                     progressData.metrics.anxiety.average > 7 ? 'High Anxiety' :
                     progressData.metrics.sleep.average < 6 ? 'Low Sleep' : 'Good Overall'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Consistency Score</p>
                  <p className="text-lg font-bold text-purple-600">
                    {Math.round((progressData.totalRecords / 
                      (progressData.totalRecords + 5)) * 100)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Total Data Points</p>
                  <p className="text-lg font-bold text-blue-600">
                    {Object.values(progressData.metrics).reduce((sum, m) => sum + m.values.length, 0)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}