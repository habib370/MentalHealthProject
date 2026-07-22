import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between bg-blue-600 px-8 py-4 text-white">
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-white p-8 shadow">
        <h2 className="mb-4 text-3xl font-bold">
          Welcome!
        </h2>

        <p className="mb-2 text-lg">
          You have successfully logged in.
        </p>

        <hr className="my-6" />

        <div className="space-y-2">
          <p>
            <strong>Status:</strong> Authenticated
          </p>

          <p>
            <strong>User:</strong>{" "}
            {user?.username || "Logged-in User"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email || "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
}