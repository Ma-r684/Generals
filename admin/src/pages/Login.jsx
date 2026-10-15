import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const data = response.data;

      if (!data.success) {
        throw new Error("Invalid login credentials");
      }
      localStorage.setItem("token", data.token);

      login(data.user);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/login");
      }

    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.message ||
        "Server not reachable";

      setErrorMessage(message);
      console.error("Login Error:", error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Access your admin dashboard
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-400 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
