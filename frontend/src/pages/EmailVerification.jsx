import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const [shake, setShake] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  /* ---------------- INPUT CHANGE ---------------- */

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const updated = [...code];
    updated[index] = value;
    setCode(updated);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* ---------------- BACKSPACE ---------------- */

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* ---------------- COPY / PASTE ---------------- */

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const updated = Array(6).fill("");
    pastedData.split("").forEach((digit, index) => {
      updated[index] = digit;
    });

    setCode(updated);
    inputRefs.current[pastedData.length - 1]?.focus();
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    const verificationCode = code.join("");

    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch {
      setShake(true);
      setCode(Array(6).fill(""));
      inputRefs.current[0]?.focus();
      setTimeout(() => setShake(false), 400);
    }
  };

  /* ---------------- AUTO SUBMIT ---------------- */

  useEffect(() => {
    if (code.every((d) => d !== "") && !isLoading) {
      handleSubmit();
    }
  }, [code]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <motion.form
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={(e) => e.preventDefault()}
        className={`bg-gray-900 text-white w-full max-w-md rounded-xl shadow-xl p-8
        ${shake ? "animate-shake" : ""}`}
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          Verify Your Email
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {error && (
          <p className="text-center text-red-400 mb-4">{error}</p>
        )}

        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              disabled={isLoading}
              className="w-12 h-12 rounded-md text-center text-lg font-semibold
              bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500"
            />
          ))}
        </div>

        <button
          disabled={isLoading || code.some((d) => !d)}
          className="w-full bg-gradient-to-r from-green-400 to-emerald-500 py-3
          font-semibold text-black rounded-md disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>
      </motion.form>

      {/* Shake animation */}
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-6px); }
            75% { transform: translateX(6px); }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default EmailVerification;
