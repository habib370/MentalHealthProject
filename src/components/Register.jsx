import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    fathersName: "",
    mothersName: "",
    dateOfBirth: "",
    gender: "Male",
    emailAddress: "",
    phoneNumber: "",
    maritalStatus: "",
    address: "",
    postCode: "",
    nid: "",
    religion: "",
    income: "", // string ✅
    education: "",
    occupation: "",
    accountType: "",
    mobileBanking: true,
    emailAlerts: true,
    chequeBook: false,
    eStatement: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Sending data:", formData); // 🔍 debug

    const response = await register(formData);
    console.log("Response:", response);
    if (response.data.ok) {
      alert("Registration Successful!");
      console.log("Account Number:", response.data.accountNumber);
      console.log("PIN:", response.data.pinNumber);
      navigate("/login");
    } else {
      console.error(response.data.message);
      alert(response.data.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 p-6 text-white text-center">
          <h2 className="text-3xl font-bold">Open Bank Account</h2>
          <p className="opacity-80">Fill all details correctly</p>
        </div>

        <form onSubmit={handleSubmit} className="pt-8 px-10 pb-2 space-y-8">
          {/* Personal Details */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-4">
              Personal Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="fullName"
                placeholder="Full Name"
                className="p-2 border rounded"
                onChange={handleChange}
                required
              />
              <input
                name="fathersName"
                placeholder="Father's Name"
                className="p-2 border rounded"
                onChange={handleChange}
              />
              <input
                name="mothersName"
                placeholder="Mother's Name"
                className="p-2 border rounded"
                onChange={handleChange}
              />
              <input
                type="date"
                name="dateOfBirth"
                className="p-2 border rounded"
                onChange={handleChange}
                required
              />

              <div>
                <label className="block text-sm font-medium mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

               <div>
                <label className="block text-sm font-medium mb-1">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>

              <input
                name="nid"
                placeholder="NID Number"
                className="p-2 border rounded"
                onChange={handleChange}
                required
              />
              <div>
                <label className="block text-sm font-medium mb-1">
                  Religion
                </label>
                <select
                  name="religion"
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                >
                  <option value="">Select Religion</option>
                  <option value="Islam">Islam</option>
                  <option value="Hinduism">Hinduism</option>
                  <option value="Christianity">Christianity</option>
                  <option value="Buddhism">Buddhism</option>
                  <option value="Judaism">Judaism</option>
                  <option value="Sikhism">Sikhism</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact & Career */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-4">
              Contact & Career
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                className="p-2 border rounded"
                onChange={handleChange}
                required
              />
              <input
                name="phoneNumber"
                placeholder="Phone Number"
                className="p-2 border rounded"
                onChange={handleChange}
                required
              />
              <input
                name="postCode"
                placeholder="Post Code"
                className="p-2 border rounded"
                onChange={handleChange}
              />

              <input
                name="occupation"
                placeholder="Occupation"
                className="p-2 border rounded md:col-span-2"
                onChange={handleChange}
              />
              <input
                name="education"
                placeholder="Education"
                className="p-2 border rounded"
                onChange={handleChange}
              />

              <input
                name="income"
                placeholder="Monthly Income"
                className="p-2 border rounded"
                onChange={handleChange}
              />
            </div>

            <textarea
              name="address"
              placeholder="Full Address"
              className="w-full mt-4 p-2 border rounded"
              rows="2"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Account Features */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-4">
              Account Features
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Type
                </label>
                <select
                  name="accountType"
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                >
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                  <option value="Salary">Salary</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="mobileBanking"
                    checked={formData.mobileBanking}
                    onChange={handleChange}
                  />
                  <span>Mobile Banking</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="chequeBook"
                    checked={formData.chequeBook}
                    onChange={handleChange}
                  />
                  <span>Cheque Book</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="emailAlerts"
                    checked={formData.emailAlerts}
                    onChange={handleChange}
                  />
                  <span>Email Alerts</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="eStatement"
                    checked={formData.eStatement}
                    onChange={handleChange}
                  />
                  <span>eStatement</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition"
          >
            {loading ? "Processing..." : "Create Account"}
          </button>
        </form>
        <div className="text-center text-sm pb-2">
          <span className="text-gray-500">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
