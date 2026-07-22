// src/context/Account.jsx
import { createContext, useContext, useState } from "react";
import { useApi } from "./Api";
import { useAuth } from "./Auth";

const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const api = useApi();
  const { updateUserState } = useAuth();
  const [updating, setUpdating] = useState(false);

  // Update student profile details (Username, Major, Academic Goals, etc.)
  const updateProfile = async (profileData) => {
    setUpdating(true);
    try {
      const response = await api.put("/api/auth/profile", profileData);
      if (response.status === 200 && response.data?.user) {
        updateUserState(response.data.user);
        return { success: true, message: "Profile updated successfully!" };
      }
      return { success: false, message: response.data?.message || "Update failed" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update profile",
      };
    } finally {
      setUpdating(false);
    }
  };

  // Change Password
  const changePassword = async (passwordData) => {
    setUpdating(true);
    try {
      const response = await api.put("/api/auth/change-password", passwordData);
      return {
        success: true,
        message: response.data?.message || "Password updated successfully!",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to change password",
      };
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AccountContext.Provider
      value={{
        updating,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};