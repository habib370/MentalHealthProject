import { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "./Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const api = useApi();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 const [isAuthenticated, setIsAuthenticated] = useState(false); 
  // ✅ Safe JSON parser
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    const parsedUser = safeParse(savedUser);

    if (parsedUser && token) {
      setUser(parsedUser);
      setIsAuthenticated(true); 
    } else {
      // Clean corrupted data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  // ✅ Login
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      
      // We check 'ok' because your backend sends it!
      const { token, user, ok, message } = response.data; 

      if (ok) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
         setIsAuthenticated(true);
        return { ok: true };
      } else {
        return { ok: false, message: message || "Invalid Credentials" };
      }
    } catch (error) {
      return {
        ok: false,
        message: error.response?.data?.message || "Server Error",
      };
    }
  };
  //  Register
  const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      console.log("API Response:",response);
      // Check if backend returned a success flag or 200/201 status
      if (response.status === 200 || response.status === 201) {
        return { ok: true,data:response.data };
      }
      return { ok: false, message: "Registration failed" };
    } catch (error) {
      // If backend sends a string like "Email already taken", this catches it
      const errorMsg = typeof error.response?.data === 'string' 
                       ? error.response.data 
                       : error.response?.data?.message || "Registration failed";
                       
      return { ok: false, message: errorMsg };
    }
  };

  //  Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  //account releted api

const checkBalance = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("no",user.accountNumber);
  try {
    

     const response = await api.post("/account/balance",  {
      accountNumber: user.accountNumber,
   
    }
  );
  console.log(response)
    if(response.data.ok){
       return { ok: true, message: response.data.message,balance:response.data.balance };
    }else{
      return {ok:false,message:response.data.message}
    }
    console.log(response);
  } catch (err) {
   console.log(err);
     return { ok: false, message: "An error occurred while checking balance." };
  }
};
//  Deposit Money
const deposit = async (amount) => {
  const currentUser = user || JSON.parse(localStorage.getItem("user"));
  
  if (!amount || amount <= 0) {
    return { success: false, message: "Please enter a valid amount" };
  }

  try {
    const response = await api.post("/account/deposit", {
      accountNumber: currentUser.accountNumber,
      amount: parseFloat(amount),
    
    });
      console.log(response);
    if (response.data.ok) {
      console.log("Deposit success",response.data);
      const updatedUser = { 
        ...currentUser, 
        balance: response.data.balance 
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return { ok: true, message: response.data.message };
    } else {
      return { ok: false, message: response.data.message };
    }
  } catch (err) {
    console.log(err);
     return { ok: false, message: "An error occurred while processing the deposit." };
  }
};
//  Withdraw Money
const withdraw = async (amount) => {
  const currentUser = user || JSON.parse(localStorage.getItem("user"));
  
  console.log("witdraw clicked");

  try {
    const response = await api.post("/account/withdraw", {
      accountNumber: currentUser.accountNumber,
      amount: parseFloat(amount),
    });
     console.log("Withdraw success",response);

    if (response.data.ok) {
       
      const updatedUser = { 
        ...currentUser, 
        balance: response.data.balance 
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return { ok: true, message: response.data.message };
    } else {
      return { ok: false, message: response.data.message };
    }
  } catch (err) {
    console.log(err);
    return { ok: false, message: "An error occurred while processing the withdrawal." };
  }
};
// ✅ Transfer Money
const transferMoney = async (targetAccountNumber, amount) => {
  const currentUser = user || JSON.parse(localStorage.getItem("user"));
 
  // 1. Basic Validations
  if (!targetAccountNumber || targetAccountNumber.trim() === "") {
    console.log("Invalid target account number:",targetAccountNumber)
    return { ok: false, message: "Please enter receiver's account number" };
  }
  if (targetAccountNumber === currentUser.accountNumber) {
    console.log("Attempted self-transfer to acount:",targetAccountNumber)
    return { ok: false, message: "You cannot transfer money to yourself!" };
  }
  if (!amount || amount <= 0) {
    console.log("Invalid amount:",amount)
    return { ok: false, message: "Please enter a valid amount" };
  }
  if (amount > currentUser.balance) {
    console.log("Insufficient balance for transfer.Curr balance:",currentUser.balance);
    return { ok: false, message: "Insufficient balance for this transfer" };
  }

  try {
    const response = await api.post("/account/transfer", {
      fromAccount: currentUser.accountNumber,
      toAccount: targetAccountNumber,
      amount: parseFloat(amount),
      
    });
    console.log(response);
    if (response.data.ok) {
      console.log("Transfer success", response.data);
      const updatedUser = { 
        ...currentUser, 
        balance: response.data.balance 
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return { ok: true, message: response.data.message };
    } else {
      return { ok: false, message: response.data.message };
    }
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: err.response?.data?.message || "Transfer failed. Check account number and try again.",
    };
  }
};
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loading,
        checkBalance,
        deposit,
        withdraw,
        transferMoney,
        isAuthenticated,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);