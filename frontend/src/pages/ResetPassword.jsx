import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { resetPassword, error, isLoading } = useAuthStore();
	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			await resetPassword(token, password);
			toast.success("Password reset successfully! Redirecting...");
			setTimeout(() => navigate("/login"), 2000);
		} catch (err) {
			toast.error(err?.message || "Error resetting password");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
			>
				<div className="p-8">
					<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
						Reset Password
					</h2>

					{error && (
						<p className="text-red-400 text-sm mb-4 text-center">
							{error}
						</p>
					)}

					<form onSubmit={handleSubmit} className="space-y-5">
						<Input
							icon={Lock}
							type="password"
							placeholder="New Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<Input
							icon={Lock}
							type="password"
							placeholder="Confirm New Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>

						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							type="submit"
							disabled={isLoading}
							className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-semibold rounded-lg shadow-lg hover:from-yellow-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition"
						>
							{isLoading ? "Resetting..." : "Set New Password"}
						</motion.button>
					</form>
				</div>
			</motion.div>
		</div>
	);
};

export default ResetPassword;
