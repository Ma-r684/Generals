import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * API Base URL
 */
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "/api/auth";

const AdminUsers = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_BASE}/check-auth`, {
          withCredentials: true,
        });

        if (res.data?.success && res.data?.user) {
          setUser(res.data.user);
        } else {
          setError("Not authorized");
        }
      } catch (err) {
        console.error("Auth Error:", err);
        setError("Access denied. Please login as admin.");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 🔄 Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-lg font-semibold animate-pulse text-gray-600">
          Checking admin access...
        </h2>
      </div>
    );
  }

  // ❌ Not Admin
  if (error || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-3">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You must be logged in as an admin to view this page.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-900">
        Admin Dashboard
      </h1>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Welcome Back, {user.name}
        </h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user.role}
          </p>
          <p>
            <span className="font-semibold">Last Login:</span>{" "}
            {user.lastLogin
              ? new Date(user.lastLogin).toLocaleString()
              : "First login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
