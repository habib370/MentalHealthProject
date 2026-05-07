// context/Toast.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock, FaInfoCircle } from "react-icons/fa";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove toast after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <ToastMessage
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

// Individual Toast Component
const ToastMessage = ({ message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500" size={20} />;
      case "error":
        return <FaTimesCircle className="text-red-500" size={20} />;
      case "info":
        return <FaInfoCircle className="text-blue-500" size={20} />;
      case "warning":
        return <FaClock className="text-yellow-500" size={20} />;
      default:
        return <FaCheckCircle className="text-green-500" size={20} />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-green-50 border-green-200 text-green-800";
    }
  };

  return (
    <div
      className={`flex items-center space-x-3 p-4 rounded-xl shadow-lg border animate-slide-in ${getBgColor()}`}
      role="alert"
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition"
      >
        <FaTimesCircle size={16} />
      </button>
    </div>
  );
};