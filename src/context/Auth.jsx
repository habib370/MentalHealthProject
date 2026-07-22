// src/context/Auth.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useApi } from "./Api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const api = useApi();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Safe JSON parser helper
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  // Safe user & token initialization on app startup
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token && savedUser) {
      const parsedUser = safeParse(savedUser);
      if (parsedUser) {
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = async (credentials) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      const { token, user: userData, ok, message } = response.data;

      if ((ok || response.status === 200) && token && userData) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return { ok: true, user: userData };
      } else {
        return { ok: false, message: message || "Invalid email or password" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Server error during login",
      };
    }
  };

  // Sign up / Register handler
  const register = async (userData) => {
    try {
      const response = await api.post("/api/auth/signup", userData);
      if (response.status === 200 || response.status === 201) {
        return { ok: true, data: response.data };
      }
      return { ok: false, message: response.data?.message || "Registration failed" };
    } catch (error) {
      const errorMsg =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || "Registration failed";
      return { ok: false, message: errorMsg };
    }
  };

  // Logout handler
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Fetch / Sync current user data from server
  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return { success: false, message: "No active session" };
      }

      const response = await api.get("/api/auth/me");
      if (response.data?.success || response.status === 200) {
        const userData = response.data.user || response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, user: userData };
      } else {
        return { success: false, message: "Failed to fetch user data" };
      }
    } catch (error) {
      console.error("Fetch current user error:", error);
      if (error.response?.status === 401) {
        logout();
      }
      return {
        success: false,
        message: error.response?.data?.message || "Server Error",
      };
    }
  };

  // Update user in local state & localStorage
  const updateUserState = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loading,
        isAuthenticated,
        getCurrentUser,
        updateUserState,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};