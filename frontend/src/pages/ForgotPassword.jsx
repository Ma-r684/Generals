import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
			>
				{/* HEADER */}
				<div className="p-8">
					<h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
						Forgot Password
					</h2>

					{/* FORM */}
					{!isSubmitted ? (
						<form onSubmit={handleSubmit} className="space-y-5">
							<p className="text-gray-300 text-sm text-center">
								Enter your email address and we’ll send you a password reset link.
							</p>

							<Input
								icon={Mail}
								type="email"
								placeholder="Email Address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>

							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type="submit"
								className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-semibold rounded-lg shadow-lg hover:from-yellow-500 hover:to-amber-600 transition"
							>
								{isLoading ? (
									<Loader className="animate-spin mx-auto" />
								) : (
									"Send Reset Link"
								)}
							</motion.button>
						</form>
					) : (
						/* SUCCESS STATE */
						<div className="text-center space-y-4">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
								className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto"
							>
								<Mail className="w-8 h-8 text-white" />
							</motion.div>

							<p className="text-gray-300 text-sm">
								If an account exists for
								<span className="text-yellow-400 font-medium"> {email}</span>,
								you’ll receive a reset link shortly.
							</p>
						</div>
					)}
				</div>

				{/* FOOTER */}
				<div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
					<Link
						to="/login"
						className="text-sm text-yellow-400 hover:underline flex items-center"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Login
					</Link>
				</div>
			</motion.div>
		</div>
	);
};

export default ForgotPassword;
