// src/pages/Register.jsx
import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Brain, 
  Heart,
  Shield,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle
} from "lucide-react";

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Check password strength
    if (name === "password") {
      calculatePasswordStrength(value);
    }

    // Check password match
    if (name === "password" || name === "confirmPassword") {
      if (name === "password") {
        setPasswordMatch(value === formData.confirmPassword);
      } else {
        setPasswordMatch(value === formData.password);
      }
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    if (passwordStrength >= 4) return "bg-green-500";
    return "bg-gray-300";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3) return "Medium";
    if (passwordStrength >= 4) return "Strong";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (passwordStrength < 3) {
      setError("Please choose a stronger password");
      setLoading(false);
      return;
    }

    // Prepare data for backend (only send what backend expects)
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    console.log("Sending registration data:", userData);

    try {
      const response = await register(userData);
      console.log("Registration response:", response);
      
      if (response.ok) {
        // Show success message
        alert("Registration Successful! Please login to continue.");
        navigate("/login");
      } else {
        setError(response.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mentalHealthPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <g transform="translate(20, 20)">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                      fill="rgba(219, 234, 254, 0.3)" transform="scale(0.3)"/>
              </g>
              <g transform="translate(70, 70)">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="rgba(167, 139, 250, 0.2)" transform="scale(0.2)"/>
              </g>
              <g transform="translate(45, 10)">
                <circle cx="12" cy="12" r="8" fill="rgba(191, 219, 254, 0.15)" />
                <path d="M12 4C9.79 4 8 5.79 8 8c0 1.49.83 2.79 2.04 3.48-.35.58-.54 1.25-.54 1.96 0 2.21 1.79 4 4 4s4-1.79 4-4c0-.71-.19-1.38-.54-1.96C15.17 10.79 16 9.49 16 8c0-2.21-1.79-4-4-4z" 
                      fill="rgba(96, 165, 250, 0.15)" transform="scale(0.4)"/>
              </g>
            </pattern>
            <linearGradient id="gradientOverlay" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#eff6ff', stopOpacity: 0.95 }} />
              <stop offset="50%" style={{ stopColor: '#f5f3ff', stopOpacity: 0.95 }} />
              <stop offset="100%" style={{ stopColor: '#fdf2f8', stopOpacity: 0.95 }} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#mentalHealthPattern)" />
          <rect width="100%" height="100%" fill="url(#gradientOverlay)" />
        </svg>
      </div>

      {/* Registration Card */}
      <div className="max-w-md w-full space-y-8 p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 relative z-10">
        
        {/* Decorative Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-t-2xl"></div>

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-4 rounded-2xl shadow-xl">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Start your wellness journey today
          </p>
          
          <div className="mt-3 flex justify-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200/50">
              <Heart className="w-3 h-3 mr-1 text-pink-500 fill-pink-500" />
              Join our wellness community
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center text-red-700 rounded-lg animate-shake">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Username Input */}
            <div className="group">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                <User className="w-3 h-3 mr-1" />
                Username
              </label>
              <div className="flex items-center border-b-2 border-gray-200 focus-within:border-blue-500 transition-all duration-300 py-2 mt-1 group-hover:border-gray-300">
                <User className="text-gray-400 group-focus-within:text-blue-500 w-5 h-5 mr-3 transition-colors duration-300" />
                <input
                  name="username"
                  type="text"
                  required
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none placeholder-gray-400"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="group">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                <Mail className="w-3 h-3 mr-1" />
                Email Address
              </label>
              <div className="flex items-center border-b-2 border-gray-200 focus-within:border-blue-500 transition-all duration-300 py-2 mt-1 group-hover:border-gray-300">
                <Mail className="text-gray-400 group-focus-within:text-blue-500 w-5 h-5 mr-3 transition-colors duration-300" />
                <input
                  name="email"
                  type="email"
                  required
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none placeholder-gray-400"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                <Lock className="w-3 h-3 mr-1" />
                Password
              </label>
              <div className="flex items-center border-b-2 border-gray-200 focus-within:border-blue-500 transition-all duration-300 py-2 mt-1 group-hover:border-gray-300">
                <Lock className="text-gray-400 group-focus-within:text-blue-500 w-5 h-5 mr-3 transition-colors duration-300" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none placeholder-gray-400"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-medium ${getPasswordStrengthColor().replace('bg-', 'text-')}`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Use 8+ chars with uppercase, lowercase, numbers & special chars
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="group">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                Confirm Password
              </label>
              <div className="flex items-center border-b-2 border-gray-200 focus-within:border-blue-500 transition-all duration-300 py-2 mt-1 group-hover:border-gray-300">
                <CheckCircle className="text-gray-400 group-focus-within:text-blue-500 w-5 h-5 mr-3 transition-colors duration-300" />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none placeholder-gray-400"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-1 flex items-center">
                  {passwordMatch ? (
                    <span className="text-xs text-green-600 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Passwords match
                    </span>
                  ) : (
                    <span className="text-xs text-red-600 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Passwords do not match
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-xs text-gray-500">
              I agree to the{" "}
              <button type="button" className="text-blue-600 hover:underline font-medium">
                Terms of Service
              </button>{" "}
              and{" "}
              <button type="button" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </button>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white transition-all duration-300 ${
              loading
                ? "bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Start Wellness Journey
              </span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/80 backdrop-blur-sm text-gray-500">Already have an account?</span>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors hover:underline group flex items-center justify-center"
          >
            <span>Sign in to your account</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Trust Badges */}
          <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
            <span className="flex items-center">
              <Shield className="w-3 h-3 mr-1 text-blue-400" />
              Secure & Confidential
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center">
              <Heart className="w-3 h-3 mr-1 text-pink-400" />
              Free for Students
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};