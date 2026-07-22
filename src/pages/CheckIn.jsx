// src/pages/CheckIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMentalHealthService } from "../services/mentalHealthService";
import { 
  FaArrowRight, FaArrowLeft, FaCheckCircle, 
  FaExclamationTriangle, FaChartLine, FaMoon, 
  FaUserGraduate, FaDumbbell, FaTv, FaCode, FaCalendarAlt,
  FaLightbulb, FaFlask
} from "react-icons/fa";

export default function CheckIn() {
  const navigate = useNavigate();
  const { submitCheckin } = useMentalHealthService();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Initial Form State exactly matching Mongoose Schema requirements
  const [formData, setFormData] = useState({
    bedtime: "23:30",
    wakeTime: "07:30",
    classCount: 3,
    classDetails: [
      { classNumber: 1, focusedMinutes: 30 },
      { classNumber: 2, focusedMinutes: 30 },
      { classNumber: 3, focusedMinutes: 30 }
    ],
    attendedLab: false,
    labFocusedMinutes: 0,
    coCurricularActivities: ["None"],
    socialInteractionQuality: "Positive & Collaborative",
    physicalActivityType: "Walking",
    physicalActivityDuration: "30-60 mins",
    nonAcademicScreenTime: "1 – 2 hours",
    engagedInSkillDev: false,
    skillDevTimeHours: 0,
    tomorrowPlan: {
      academicCommitments: ["None"],
      coCurricularActivities: ["None"]
    }
  });

  const totalSteps = 9;

  // Handler for class count changes
  const handleClassCountChange = (count) => {
    const newCount = parseInt(count, 10);
    const updatedDetails = Array.from({ length: newCount }, (_, i) => ({
      classNumber: i + 1,
      focusedMinutes: formData.classDetails[i]?.focusedMinutes ?? 30
    }));

    setFormData((prev) => ({
      ...prev,
      classCount: newCount,
      classDetails: updatedDetails
    }));
  };

  // Handler for class focus minutes (max 45 per class)
  const handleClassFocusChange = (index, minutes) => {
    const parsedMins = parseInt(minutes, 10);
    const validMins = isNaN(parsedMins) ? 0 : Math.min(45, Math.max(0, parsedMins));
    
    setFormData((prev) => {
      const updatedDetails = [...prev.classDetails];
      updatedDetails[index] = { ...updatedDetails[index], focusedMinutes: validMins };
      return { ...prev, classDetails: updatedDetails };
    });
  };

  // Immutable multi-select toggle helper for arrays
  const handleMultiSelectToggle = (category, field, option) => {
    setFormData((prev) => {
      const currentList = field 
        ? [...prev[category][field]] 
        : [...prev[category]];

      let updatedList;
      if (option === 'None') {
        updatedList = ['None'];
      } else {
        const filtered = currentList.filter((item) => item !== 'None');
        if (filtered.includes(option)) {
          updatedList = filtered.filter((item) => item !== option);
          if (updatedList.length === 0) updatedList = ['None'];
        } else {
          updatedList = [...filtered, option];
        }
      }

      if (field) {
        return {
          ...prev,
          [category]: { ...prev[category], [field]: updatedList }
        };
      } else {
        return { ...prev, [category]: updatedList };
      }
    });
  };

  // Handle Physical Activity Selection
  const handlePhysicalActivityChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      physicalActivityType: type,
      physicalActivityDuration: type === "None" ? "None" : (prev.physicalActivityDuration === "None" ? "30-60 mins" : prev.physicalActivityDuration)
    }));
  };

  const nextStep = () => {
    setErrorMsg("");
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmitCheckin();
    }
  };

  const prevStep = () => {
    setErrorMsg("");
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit Handler
  const handleSubmitCheckin = async () => {
    // Validate required fields explicitly before sending
    const requiredFields = ['bedtime', 'wakeTime', 'classCount', 'socialInteractionQuality', 'physicalActivityType', 'nonAcademicScreenTime'];
    for (const field of requiredFields) {
      if (formData[field] === undefined || formData[field] === null || formData[field] === "") {
        setErrorMsg(`Missing required field: ${field}`);
        return;
      }
    }

    setLoading(true);
    setErrorMsg("");

    const result = await submitCheckin(formData);
    
    if (result.success && result.data) {
      setSubmissionResult(result.data);
      setShowResults(true);
    } else {
      setErrorMsg(result.message || "Failed to submit check-in");
    }
    setLoading(false);
  };

  // Render Form Steps
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-700 flex items-center">
              <FaMoon className="mr-2 text-indigo-500" /> Step 1: Sleep & Recovery
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Bedtime last night</label>
                <input
                  type="time"
                  value={formData.bedtime}
                  onChange={(e) => setFormData({ ...formData, bedtime: e.target.value })}
                  className="w-full p-3 border rounded-xl text-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Wake-up time today</label>
                <input
                  type="time"
                  value={formData.wakeTime}
                  onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
                  className="w-full p-3 border rounded-xl text-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">💡 Sleep duration and midnight crossovers are calculated automatically by the backend analytics engine.</p>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-700 flex items-center">
              <FaUserGraduate className="mr-2 text-blue-500" /> Step 2: Academic Classes
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">How many classes did you attend today?</label>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleClassCountChange(count)}
                    className={`flex-1 py-3 rounded-xl font-semibold border transition ${
                      formData.classCount === count
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {formData.classCount > 0 && (
              <div className="space-y-4 pt-2">
                <p className="text-sm font-medium text-gray-600">Focused minutes per class (45 mins max each):</p>
                {formData.classDetails.map((cls, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                    <span className="text-sm font-semibold text-gray-700">Class {cls.classNumber} (45 mins)</span>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max="45"
                        value={cls.focusedMinutes}
                        onChange={(e) => handleClassFocusChange(idx, e.target.value)}
                        className="w-20 p-2 border rounded-lg text-center font-bold text-blue-600 outline-none"
                      />
                      <span className="text-xs text-gray-500">mins focused</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-700 flex items-center">
              <FaFlask className="mr-2 text-purple-500" /> Step 3: Lab Activities
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Did you have a lab session today (2.5 hours / 150 mins max)?</label>
              <div className="flex gap-4">
                {[true, false].map((status) => (
                  <button
                    key={String(status)}
                    type="button"
                    onClick={() => setFormData({ ...formData, attendedLab: status, labFocusedMinutes: status ? formData.labFocusedMinutes : 0 })}
                    className={`flex-1 py-3 rounded-xl font-semibold border transition ${
                      formData.attendedLab === status
                        ? "bg-purple-600 text-white border-purple-600 shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {status ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>

            {formData.attendedLab && (
              <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">How many minutes were you actively focused during lab?</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="0"
                    max="150"
                    value={formData.labFocusedMinutes}
                    onChange={(e) => setFormData({ ...formData, labFocusedMinutes: Math.min(150, Math.max(0, parseInt(e.target.value, 10) || 0)) })}
                    className="w-28 p-3 border rounded-xl text-lg text-center font-bold text-purple-600 outline-none"
                  />
                  <span className="text-sm text-gray-500">/ 150 total minutes</span>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-700">Step 4: Co-Curricular Activities</h4>
            <p className="text-sm text-gray-500">Select all extra-curricular activities you participated in today:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {['None', 'Club Meeting / Event', 'Volunteering', 'Cultural Performance', 'Workshop / Seminar'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleMultiSelectToggle('coCurricularActivities', null, option)}
                  className={`p-3 text-left rounded-xl border text-sm font-medium transition ${
                    formData.coCurricularActivities.includes(option)
                      ? "bg-indigo-100 border-indigo-500 text-indigo-700 font-bold"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {formData.coCurricularActivities.includes(option) ? "✓ " : ""}{option}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-700">Step 5: Social Interactions</h4>
            <p className="text-sm text-gray-500">How would you describe your overall interactions with peers and instructors today?</p>
            <div className="space-y-3">
              {[
                { label: 'Positive & Collaborative', desc: 'Engaged well, supportive conversations' },
                { label: 'Neutral / Routine', desc: 'Standard interactions, nothing stand-out' },
                { label: 'Draining / Conflict', desc: 'Felt strained or emotionally tiring' },
                { label: 'Minimal / No Interaction', desc: 'Kept mostly to myself today' }
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setFormData({ ...formData, socialInteractionQuality: item.label })}
                  className={`w-full p-4 rounded-xl border text-left transition ${
                    formData.socialInteractionQuality === item.label
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="font-semibold text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-700 flex items-center">
              <FaDumbbell className="mr-2 text-emerald-500" /> Step 6: Physical Activity
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">What physical activity did you engage in?</label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {['None', 'Gym Workout', 'Walking', 'Sports / Fitness'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handlePhysicalActivityChange(type)}
                    className={`p-3 rounded-xl border font-medium text-sm transition ${
                      formData.physicalActivityType === type
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {formData.physicalActivityType !== 'None' && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Duration:</label>
                  <select
                    value={formData.physicalActivityDuration}
                    onChange={(e) => setFormData({ ...formData, physicalActivityDuration: e.target.value })}
                    className="w-full p-3 border rounded-xl bg-gray-50 text-gray-700 font-medium outline-none"
                  >
                    <option value="Less than 30 mins">Less than 30 mins</option>
                    <option value="30-60 mins">30-60 mins</option>
                    <option value="60+ mins">60+ mins</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-700 flex items-center">
              <FaTv className="mr-2 text-rose-500" /> Step 7: Non-Academic Screen Time
            </h4>
            <p className="text-sm text-gray-500">Non-academic screen time spent on phone/laptop (entertainment, social media, or gaming):</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {['Less than 1 hour', '1 – 2 hours', '2 – 4 hours', '4+ hours'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData({ ...formData, nonAcademicScreenTime: option })}
                  className={`p-4 rounded-xl border font-semibold transition ${
                    formData.nonAcademicScreenTime === option
                      ? "bg-rose-500 text-white border-rose-500 shadow-md"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-700 flex items-center">
              <FaCode className="mr-2 text-cyan-500" /> Step 8: Skill Development
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Did you work on personal skills today (coding, reading, projects)?</label>
              <div className="flex gap-4 mb-4">
                {[true, false].map((status) => (
                  <button
                    key={String(status)}
                    type="button"
                    onClick={() => setFormData({ ...formData, engagedInSkillDev: status, skillDevTimeHours: status ? formData.skillDevTimeHours : 0 })}
                    className={`flex-1 py-3 rounded-xl font-semibold border transition ${
                      formData.engagedInSkillDev === status
                        ? "bg-cyan-600 text-white border-cyan-600 shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {status ? "Yes" : "No"}
                  </button>
                ))}
              </div>

              {formData.engagedInSkillDev && (
                <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hours spent on skills today:</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={formData.skillDevTimeHours}
                    onChange={(e) => setFormData({ ...formData, skillDevTimeHours: parseFloat(e.target.value) || 0 })}
                    className="w-full p-3 border rounded-xl text-lg font-bold text-cyan-700 outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-700 flex items-center">
              <FaCalendarAlt className="mr-2 text-amber-500" /> Step 9: Tomorrow's Lookahead
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic commitments scheduled for tomorrow:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {['None', 'Class Test / Quiz', 'Lab Report / Viva', 'Major Exam', 'Assignment Deadline'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelectToggle('tomorrowPlan', 'academicCommitments', option)}
                    className={`p-3 text-left rounded-xl border text-sm font-medium transition ${
                      formData.tomorrowPlan.academicCommitments.includes(option)
                        ? "bg-amber-100 border-amber-500 text-amber-800 font-bold"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {formData.tomorrowPlan.academicCommitments.includes(option) ? "✓ " : ""}{option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Co-curricular commitments tomorrow:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {['None', 'Club Meeting / Event', 'Workshop / Seminar', 'Volunteering'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelectToggle('tomorrowPlan', 'coCurricularActivities', option)}
                    className={`p-3 text-left rounded-xl border text-sm font-medium transition ${
                      formData.tomorrowPlan.coCurricularActivities.includes(option)
                        ? "bg-amber-100 border-amber-500 text-amber-800 font-bold"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {formData.tomorrowPlan.coCurricularActivities.includes(option) ? "✓ " : ""}{option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Results Screen after Backend Processing
  if (showResults && submissionResult) {
    const { record, analytics, recommendations, wellnessScore } = submissionResult;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full mb-3 text-3xl">
              <FaCheckCircle />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Daily Activity Logged!</h2>
            <p className="text-sm text-gray-500 mt-1">Here is your computed health analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
              <span className="text-xs text-blue-600 font-bold uppercase">Wellness Score</span>
              <p className="text-3xl font-extrabold text-blue-700 mt-1">{wellnessScore}/100</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl text-center border border-indigo-100">
              <span className="text-xs text-indigo-600 font-bold uppercase">Sleep Duration</span>
              <p className="text-3xl font-extrabold text-indigo-700 mt-1">{record.sleepHours || 0} hrs</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl text-center border border-emerald-100">
              <span className="text-xs text-emerald-600 font-bold uppercase">Academic Focus</span>
              <p className="text-3xl font-extrabold text-emerald-700 mt-1">{record.academicFocusPercentage || 0}%</p>
            </div>
          </div>

          {/* Previous Record Comparison Metrics */}
          {analytics && !analytics.isFirst && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Comparison to previous check-in:</span>
              <span className={`font-bold ${analytics.improvement >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {analytics.improvement >= 0 ? `+${analytics.improvement}` : analytics.improvement} Wellness Points ({analytics.improvementPercentage}%)
              </span>
            </div>
          )}

          {/* Recommendations from Backend Analytics Engine */}
          {recommendations && recommendations.length > 0 && (
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100 mb-6">
              <h4 className="text-md font-bold text-purple-900 flex items-center mb-3">
                <FaLightbulb className="mr-2 text-yellow-500" /> Targeted Recommendations
              </h4>
              <div className="space-y-3">
                {recommendations.map((rec, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg shadow-sm border border-purple-100">
                    <p className="font-semibold text-gray-800 text-sm">{rec.icon} {rec.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                    {rec.action && (
                      <p className="text-xs text-purple-700 font-medium mt-2 bg-purple-50 p-2 rounded">
                        👉 <strong>Action:</strong> {rec.action}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/home')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/records')}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
            >
              View All History
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center">
            <FaExclamationTriangle className="mr-2 text-rose-500 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form Step Content */}
        <div className="min-h-[280px]">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t mt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0 || loading}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              currentStep === 0 || loading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <FaArrowLeft className="inline mr-1" /> Previous
          </button>

          <button
            type="button"
            onClick={nextStep}
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md transition disabled:opacity-50"
          >
            {loading ? "Saving..." : currentStep === totalSteps - 1 ? "Submit Log" : "Next"} <FaArrowRight className="inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}