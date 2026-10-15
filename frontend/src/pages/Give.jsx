import React, { useState } from "react";
import { HeartHandshake, Phone, CreditCard } from "lucide-react";

const GivingPage = () => {
  const [giving, setGiving] = useState({
    name: "",
    phone: "",
    amount: "",
    frequency: "one-time",
    method: "mpesa",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const formatPhoneNumber = (phone) => {
    if (phone.startsWith("0")) {
      return "254" + phone.substring(1);
    }
    if (phone.startsWith("+254")) {
      return phone.replace("+", "");
    }
    return phone;
  };

  const handleChange = (e) => {
    setGiving({ ...giving, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");

    if (!giving.amount || giving.amount <= 0) {
      return setResponseMessage("Please enter a valid amount.");
    }

    try {
      setLoading(true);

      if (giving.method === "mpesa") {
        const formattedPhone = formatPhoneNumber(giving.phone);

        const res = await fetch(
          "http://localhost:5000/api/donations/mpesa",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...giving,
              phone: formattedPhone,
            }),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "M-Pesa request failed");

        setResponseMessage(
          "Payment request sent. Please check your phone and enter your M-Pesa PIN."
        );
      }

      if (giving.method === "online") {
        const res = await fetch(
          "http://localhost:5000/api/donations/stripe",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(giving),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error("Stripe session failed");

        window.location.href = data.url;
      }

      setGiving({
        name: "",
        phone: "",
        amount: "",
        frequency: "one-time",
        method: "mpesa",
        message: "",
      });

    } catch (error) {
      setResponseMessage(error.message);
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
            Partner with the Gospel
          </h1>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Your giving supports Generals’ Arena in spreading the Gospel and
            impacting lives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT SIDE INFO CARD */}
          <div className="bg-[#0b1a33]/70 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 space-y-8 shadow-xl">

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Why Your Giving Matters
              </h2>
              <p className="text-gray-400">
                Your partnership helps us reach more people with the Gospel,
                support community outreach, and build a strong spiritual
                foundation for the next generation.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#101f3f] border border-gray-700">
                <HeartHandshake size={20} />
              </div>
              <div>
                <p className="font-semibold">Kingdom Impact</p>
                <p className="text-gray-400 text-sm">
                  Supporting evangelism, discipleship & outreach programs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#101f3f] border border-gray-700">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-semibold">M-PESA Giving</p>
                <p className="text-gray-400 text-sm">
                  Quick and secure giving directly from your phone.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#101f3f] border border-gray-700">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="font-semibold">Card Payments</p>
                <p className="text-gray-400 text-sm">
                  Secure Visa & Mastercard payments via Stripe.
                </p>
              </div>
            </div>

          </div>

          {/* FORM CARD */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#0b1a33]/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 space-y-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4">Give Now</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={giving.name}
              onChange={handleChange}
              required
              className="w-full bg-[#101f3f] border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {giving.method === "mpesa" && (
              <input
                type="tel"
                name="phone"
                placeholder="07XXXXXXXX"
                value={giving.phone}
                onChange={handleChange}
                required
                className="w-full bg-[#101f3f] border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}

            <input
              type="number"
              name="amount"
              placeholder="Amount (KES)"
              value={giving.amount}
              onChange={handleChange}
              required
              className="w-full bg-[#101f3f] border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              name="frequency"
              value={giving.frequency}
              onChange={handleChange}
              className="w-full bg-[#101f3f] border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="one-time">One-time</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <select
              name="method"
              value={giving.method}
              onChange={handleChange}
              className="w-full bg-[#101f3f] border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="mpesa">M-PESA</option>
              <option value="online">Visa / Mastercard</option>
            </select>

            <textarea
              name="message"
              placeholder="Optional Message"
              value={giving.message}
              onChange={handleChange}
              rows={3}
              className="w-full bg-[#101f3f] border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Processing..." : "Give in Partnership"}
            </button>

            {responseMessage && (
              <p className="text-center text-sm mt-3 text-gray-400">
                {responseMessage}
              </p>
            )}
          </form>

        </div>
      </div>
    </div>
  );
};

export default GivingPage;
