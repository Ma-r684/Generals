import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from '../assets/Card6.jpg';

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "";

const NewsletterSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const { data } = await axios.post(
        `${API_BASE}/api/newsletter/subscribe`,
        { email }
      );

      if (data.success) {
        setIsSuccess(true);
        setMessage(data.message || "Subscription successful 🎉");
        setEmail("");
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Subscription failed.");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-[500px] flex flex-col md:flex-row">
      
      {/* LEFT CONTENT */}
      <div className="md:w-1/2 bg-blue-900 text-white flex flex-col justify-center px-8 md:px-16 py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Stay Connected
        </h2>

        <p className="text-lg text-gray-200 mb-8 max-w-md">
          Subscribe to our monthly newsletter and receive spiritual insights,
          church updates, and upcoming event information directly to your inbox.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubscribe} className="space-y-4 max-w-md">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 transition px-6 py-3 rounded-lg font-semibold w-full disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Subscribe Now"}
          </button>

          {message && (
            <p
              className={`text-sm mt-2 ${
                isSuccess ? "text-green-300" : "text-red-300"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        {/* Divider */}
        <div className="my-10 border-t border-blue-700"></div>

        {/* CTA */}
        <div>
          <p className="mb-4 text-gray-200">
            Don’t have an account yet?
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Create an Account
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="md:w-1/2">
        <img
          src={Logo}
          alt="Church community"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default NewsletterSignup;
