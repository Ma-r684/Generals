import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.email.includes("@")) return "Valid email is required";
    if (!form.password) return "Password is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ Save user data if returned
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // ✅ Redirect to Profile/Dashboard
      navigate("/profile");

    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-black/60 backdrop-blur-xl p-8 text-white shadow-2xl"
        autoComplete="off"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-amber-400 to-yellow-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="mb-4 relative">
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full rounded-lg bg-black/40 border border-white/10 px-10 py-3 focus:ring-2 focus:ring-amber-400 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-2 relative">
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full rounded-lg bg-black/40 border border-white/10 px-10 py-3 focus:ring-2 focus:ring-amber-400 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-sm text-amber-400 hover:text-amber-300"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 py-3 font-semibold text-black hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center"
        >
          {loading ? <Loader className="animate-spin" /> : "Log In"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-amber-400 hover:text-amber-300 font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
