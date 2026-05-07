import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/Toast.jsx";
import { Lock, Phone, AlertCircle } from "lucide-react"; // Optional: npm install lucide-react

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [credentials, setCredentials] = useState({
    phoneNumber: "",
    accountPin: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(credentials);
    console.log(result);
    if (result.ok) {
      navigate("/home"); // Redirect to dashboard on success
    } else {
      showToast(result.message, "error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Securely login to your bank account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center text-red-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Phone Number Input */}
            <div className="relative">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Phone Number
              </label>
              <div className="flex items-center border-b-2 border-gray-200 focus-within:border-blue-500 transition-colors py-2">
                <Phone className="text-gray-400 w-5 h-5 mr-3" />
                <input
                  name="phoneNumber"
                  type="text"
                  required
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="017XXXXXXXX"
                  value={credentials.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* PIN Input */}
            <div className="relative">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Account PIN
              </label>
              <div className="flex items-center border-b-2 border-gray-200 focus-within:border-blue-500 transition-colors py-2">
                <Lock className="text-gray-400 w-5 h-5 mr-3" />
                <input
                  name="accountPin"
                  type="password"
                  required
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="••••"
                  value={credentials.accountPin}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all`}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <span className="text-gray-500">Don't have an account? </span>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};
