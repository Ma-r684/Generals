import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const rules = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
    number: /\d/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  };

  const strengthScore = Object.values(rules).filter(Boolean).length;

  const strengthLabel =
    strengthScore <= 2
      ? "Very Weak"
      : strengthScore === 3
      ? "Weak"
      : strengthScore === 4
      ? "Good"
      : "Strong";

  const strengthPercent = (strengthScore / 5) * 100;

  const strengthColor =
    strengthScore <= 2
      ? "bg-red-500"
      : strengthScore === 3
      ? "bg-orange-400"
      : strengthScore === 4
      ? "bg-yellow-400"
      : "bg-green-500";

  const canSubmit = strengthScore >= 4 && !isLoading;
  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Valid email required";
    }

    if (strengthScore < 4) {
      newErrors.password = "Password must be at least Good strength";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await signup(form.email, form.password, form.fullName);
      navigate("/verify-email");
    } catch (err) {
      // Error is already handled by Zustand
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-black/60 backdrop-blur-xl p-6 sm:p-8 text-white shadow-2xl"
        autoComplete="off"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-amber-400 to-yellow-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        {/* Full Name */}
        <div className="mb-4 relative">
          <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
            className="w-full rounded-lg bg-black/40 border border-white/10 px-10 py-3 focus:ring-2 focus:ring-amber-400 outline-none"
          />
          {errors.fullName && (
            <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

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
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3 relative">
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

          {(errors.password || error) && (
            <p className="text-red-400 text-xs mt-2">
              {errors.password || error}
            </p>
          )}
        </div>

        {/* Password Strength */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-300 mb-1">
            <span>Password strength</span>
            <span>{strengthLabel}</span>
          </div>

          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full transition-all ${strengthColor}`}
              style={{ width: `${strengthPercent}%` }}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full rounded-lg py-3 font-semibold transition ${
            canSubmit
              ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black"
              : "bg-gray-500 text-gray-200 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto" size={22} />
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-400 font-medium">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
