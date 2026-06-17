import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* CHECK AUTH */
  const checkAuth = async () => {
    try {
      const res = await api.get("/me"); // ✅ FIXED

      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  /* SIGNUP */
  const signup = async (formData) => {
    try {
      const res = await api.post("/signup", formData);

      return {
        success: true,
        data: res.data,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    }
  };

  /* LOGIN */
  const login = async (formData) => {
    try {
      const res = await api.post("/login", formData);

      // IMPORTANT: re-fetch user after login
      await checkAuth();

      return {
        success: true,
        data: res.data,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  /* LOGOUT */
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {}

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        checkAuth,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};