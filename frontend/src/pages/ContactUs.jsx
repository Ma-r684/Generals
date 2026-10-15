import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { Mail, Phone, MapPin } from "lucide-react";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/contact"
    : "/api/contact";

const ContactUs = () => {
  const { user, isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.message.trim()) {
      toast.warning("Message cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        API_BASE,
        {
          ...formData,
          userId: isAuthenticated ? user?._id : null,
        },
        { withCredentials: true }
      );

      toast.success("Message sent successfully! We will reply soon.");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#07132b] to-[#050816] pt-24 px-6 md:px-16 lg:px-24 pb-20 text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Get in Touch
          </h1>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Whether you have a prayer request, you want to give testimony
            or want to connect with our ministry we are here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ================= CONTACT INFO ================= */}
          <div className="bg-[#0b1a33]/70 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8 space-y-8 shadow-xl">

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>
              <p className="text-gray-400">
                Feel free to reach out through any of these channels.
                We typically respond within 24 hours.
              </p>
            </div>

            {/* Office */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#101f3f] border border-gray-700">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-semibold">Our Office</p>
                <p className="text-gray-400">Nairobi, Kenya</p>
                <p className="text-gray-500 text-sm">
                  Mon-Fri: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#101f3f] border border-gray-700">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-semibold">Call / WhatsApp</p>
                <p className="text-gray-400">+254 720 296 989</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#101f3f] border border-gray-700">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-400">thegeneralsarena@gmail.com</p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-gray-700">
              <iframe
                src="https://www.google.com/maps?q=Nairobi,Kenya&output=embed"
                width="100%"
                height="200"
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>

          </div>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#0b1a33]/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 space-y-6 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="text-sm text-gray-400">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 bg-[#101f3f] border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="hello@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 bg-[#101f3f] border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

            </div>

            <div>
              <label className="text-sm text-gray-400">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject (Optional)"
                value={formData.subject}
                onChange={handleChange}
                className="w-full mt-2 bg-[#101f3f] border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Message</label>
              <textarea
                name="message"
                placeholder="Your Message or Prayer Request"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full mt-2 bg-[#101f3f] border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {isAuthenticated && (
              <p className="text-sm text-gray-500 text-center">
                You are signed in. You can track replies in your dashboard.
              </p>
            )}
          </form>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
