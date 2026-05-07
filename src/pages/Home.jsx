import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import { useToast } from "../context/Toast";
import { 
  FaWallet, FaArrowUp, FaArrowDown, FaPaperPlane, FaEye, FaEyeSlash,
  FaCreditCard, FaHistory, FaShieldAlt, FaClock, FaCheckCircle, 
  FaTimesCircle, FaChartLine, FaUniversity, FaGift, FaPercent
} from "react-icons/fa";

export default function Home() {
  const { user, checkBalance, deposit, withdraw, transferMoney } = useAuth();
  const { showToast } = useToast();

  const [showBalance, setShowBalance] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const [amount, setAmount] = useState("");
  const [targetAccount, setTargetAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: "deposit", amount: 5000, date: "Jan 15, 2024", status: "completed", account: "Self" },
    { id: 2, type: "withdraw", amount: 2000, date: "Jan 14, 2024", status: "completed", account: "Self" },
    { id: 3, type: "transfer", amount: 1500, date: "Jan 13, 2024", status: "pending", account: "****1234" },
  ]);

  const handleAction = async (e) => {
    e.preventDefault();
    setLoading(true);

    let res;
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      showToast("Please enter a valid amount", "error");
      setLoading(false);
      return;
    }

    try {
      if (activeAction === "deposit") {
        res = await deposit(numericAmount);
      } else if (activeAction === "withdraw") {
        if (numericAmount > user?.balance) {
          showToast("Insufficient balance for withdrawal", "error");
          setLoading(false);
          return;
        }
        res = await withdraw(numericAmount);
      } else if (activeAction === "transfer") {
        if (!targetAccount) {
          showToast("Please enter recipient account number", "error");
          setLoading(false);
          return;
        }
        if (numericAmount > user?.balance) {
          showToast("Insufficient balance for transfer", "error");
          setLoading(false);
          return;
        }
        res = await transferMoney(targetAccount, numericAmount);
      }

      if (res?.ok) {
        showToast("Transaction completed successfully", "success");
        const newTransaction = {
          id: Date.now(),
          type: activeAction,
          amount: numericAmount,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: "completed",
          account: activeAction === "transfer" ? `****${targetAccount.slice(-4)}` : "Self"
        };
        setRecentTransactions([newTransaction, ...recentTransactions.slice(0, 4)]);
        setAmount("");
        setTargetAccount("");
        setTimeout(() => {
          setActiveAction(null);
        }, 1500);
      } else {
        showToast(res?.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.log(err);
      showToast("Unexpected error occurred", "error");
    }

    setLoading(false);
  };

  const handleCheckBalance = async () => {
    try {
      showToast("Fetching your latest balance...");
      await checkBalance();
      setTimeout(() => {
        showToast("Balance updated successfully!", "success");
        setTimeout(() => showToast("", "success"), 3000);
      }, 1000);
    } catch {
      showToast("Failed to fetch balance", "error");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-blue-700">{user?.fullName?.split(' ')[0]}</span>
          </h1>
          <p className="text-gray-500 mt-1">Here's your financial overview</p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 opacity-5 rounded-full transform -translate-x-24 translate-y-24"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <p className="text-blue-200 text-sm mb-2">Total Balance</p>
                <div className="flex items-center space-x-3">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                    ৳ {showBalance ? user?.balance?.toLocaleString() : "••••••"}
                  </h2>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-sm"
                  >
                    {showBalance ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <FaCreditCard size={32} className="opacity-80" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
              <div>
                <p className="text-blue-200 text-xs">Account Number</p>
                <p className="font-mono text-sm font-semibold">{user?.accountNumber}</p>
              </div>
              <div>
                <p className="text-blue-200 text-xs">Account Type</p>
                <p className="text-sm font-semibold">{user?.accountType || "Premium Savings"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <ActionButton
            icon={<FaWallet />}
            title="Check Balance"
            color="green"
            onClick={handleCheckBalance}
          />
          <ActionButton
            icon={<FaArrowDown />}
            title="Deposit"
            color="blue"
            onClick={() => setActiveAction("deposit")}
          />
          <ActionButton
            icon={<FaArrowUp />}
            title="Withdraw"
            color="orange"
            onClick={() => setActiveAction("withdraw")}
          />
          <ActionButton
            icon={<FaPaperPlane />}
            title="Transfer"
            color="purple"
            onClick={() => setActiveAction("transfer")}
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <QuickStatCard
            icon={<FaChartLine />}
            title="Monthly Spending"
            amount="৳ 3,500"
            change="-5%"
            changeType="down"
            color="red"
          />
          <QuickStatCard
            icon={<FaUniversity />}
            title="Total Deposits"
            amount="৳ 5,000"
            change="+12%"
            changeType="up"
            color="green"
          />
          <QuickStatCard
            icon={<FaGift />}
            title="Rewards Points"
            amount="2,450"
            change="+50"
            changeType="up"
            color="yellow"
          />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <FaHistory className="mr-2 text-blue-600" size={20} />
              Recent Transactions
            </h3>
            <button className="text-blue-600 text-sm hover:text-blue-700 font-medium">
              View All →
            </button>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </div>
      </div>

  

      {/* Action Modal */}
      {activeAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800 capitalize">
                {activeAction} Money
              </h3>
              <button
                onClick={() => {
                  setActiveAction(null);
                  setAmount("");
                  setTargetAccount("");
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <FaTimesCircle size={24} />
              </button>
            </div>

            <form onSubmit={handleAction} className="space-y-4">
              {activeAction === "transfer" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter account number"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={targetAccount}
                    onChange={(e) => setTargetAccount(e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (৳)
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="1"
                  step="100"
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-sm text-blue-800 flex items-center">
                  <FaShieldAlt className="mr-2" />
                  Your transaction is secured with 256-bit encryption
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  `Confirm ${activeAction}`
                )}
              </button>
            </form>
          </div>
        </div>
      )}
  

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

// Action Button Component
function ActionButton({ icon, title, color, onClick }) {
  const colors = {
    green: "from-green-500 to-green-600",
    blue: "from-blue-500 to-blue-600",
    orange: "from-orange-500 to-orange-600",
    purple: "from-purple-500 to-purple-600"
  };
  
  const bgColors = {
    green: "bg-green-50",
    blue: "bg-blue-50",
    orange: "bg-orange-50",
    purple: "bg-purple-50"
  };
  
  const textColors = {
    green: "text-green-700",
    blue: "text-blue-700",
    orange: "text-orange-700",
    purple: "text-purple-700"
  };

  return (
    <button
      onClick={onClick}
      className={`${bgColors[color]} p-4 md:p-6 rounded-2xl flex flex-col items-center space-y-2 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-lg group`}
    >
      <div className={`p-3 bg-gradient-to-r ${colors[color]} rounded-xl shadow-md group-hover:shadow-lg transition text-white`}>
        {icon}
      </div>
      <span className={`font-semibold text-sm md:text-base ${textColors[color]}`}>{title}</span>
    </button>
  );
}

// Quick Stat Card Component
function QuickStatCard({ icon, title, amount, change, changeType, color }) {
  const colors = {
    red: "text-red-600 bg-red-50",
    green: "text-green-600 bg-green-50",
    yellow: "text-yellow-600 bg-yellow-50"
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          {icon}
        </div>
        <span className={`text-xs font-semibold ${
          changeType === "up" ? "text-green-600" : "text-red-600"
        }`}>
          {change}
        </span>
      </div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold text-gray-800 mt-1">{amount}</p>
    </div>
  );
}

// Transaction Item Component
function TransactionItem({ transaction }) {
  const getIcon = () => {
    switch(transaction.type) {
      case "deposit": return <FaArrowDown className="text-green-600" />;
      case "withdraw": return <FaArrowUp className="text-red-600" />;
      case "transfer": return <FaPaperPlane className="text-purple-600" />;
      default: return <FaWallet className="text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch(transaction.status) {
      case "completed": return "text-green-600 bg-green-50";
      case "pending": return "text-yellow-600 bg-yellow-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-100 rounded-full">
          {getIcon()}
        </div>
        <div>
          <p className="font-semibold text-gray-800 capitalize">{transaction.type}</p>
          <p className="text-xs text-gray-500">{transaction.date} • {transaction.account}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold ${
          transaction.type === "deposit" ? "text-green-600" : "text-red-600"
        }`}>
          {transaction.type === "deposit" ? "+" : "-"} ৳ {transaction.amount.toLocaleString()}
        </p>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
          {transaction.status}
        </span>
      </div>
    </div>
  );
}