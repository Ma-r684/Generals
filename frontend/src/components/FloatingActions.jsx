import { useEffect, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaEnvelope } from "react-icons/fa";
import axios from "axios";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/contact"
    : "/api/contact";

const FloatingActions = () => {
  const [visible, setVisible] = useState(false);
  const [hideOnFooter, setHideOnFooter] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [step, setStep] = useState("form");
  const [contactId, setContactId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= SCROLL DETECTION ================= */
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= HIDE ON FOOTER ================= */
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHideOnFooter(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(API_BASE, formData);
      const createdContact = res.data.data;
      setContactId(createdContact._id);

      setChatMessages([
        { sender: "user", text: formData.message },
        {
          sender: "admin",
          text:
            "Thank you for contacting Generals' Arena. An admin will respond shortly.",
        },
      ]);

      setStep("chat");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text: chatInput },
    ]);
    setChatInput("");
  };

  return (
    <>
      {/* ================= FLOATING BUTTONS ================= */}
      <div
        className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-6 
        flex flex-col gap-3 sm:gap-4 z-50 transition-all duration-500 ${
          visible && !hideOnFooter
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {[ 
          {
            icon: <FaEnvelope />,
            action: () => setOpenModal(true),
            bg: "bg-[#000080] hover:bg-[#001a66]",
          },
          {
            icon: <FaWhatsapp />,
            link: "https://wa.me/254759245572",
            bg: "bg-green-500",
          },
          {
            icon: <FaFacebookF />,
            link: "https://web.facebook.com/profile.php?id=100083551713768e",
            bg: "bg-blue-600",
          },
          {
            icon: <ArrowUp />,
            action: scrollToTop,
            bg: "bg-gray-800",
          },
        ].map((btn, i) =>
          btn.link ? (
            <a
              key={i}
              href={btn.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center text-white 
              w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg ${btn.bg}`}
            >
              {btn.icon}
            </a>
          ) : (
            <button
              key={i}
              onClick={btn.action}
              className={`flex items-center justify-center text-white 
              w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg ${btn.bg}`}
            >
              {btn.icon}
            </button>
          )
        )}
      </div>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm 
                        flex items-end sm:items-center justify-center z-50">

          <div
            className="bg-white w-full sm:w-[95%] sm:max-w-md 
                       h-[90vh] sm:h-[600px] 
                       rounded-t-2xl sm:rounded-xl 
                       shadow-xl flex flex-col relative"
          >
            {/* Close */}
            <button
              onClick={() => {
                setOpenModal(false);
                setStep("form");
                setContactId(null);
                setChatMessages([]);
              }}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            {/* ================= FORM STEP ================= */}
            {step === "form" && (
              <form
                onSubmit={handleSubmit}
                className="p-4 sm:p-6 space-y-4 mt-6 overflow-y-auto"
              >
                <h2 className="text-lg sm:text-xl font-semibold text-[#000080]">
                  Contact Generals' Arena
                </h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#000080]"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#000080]"
                />

                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#000080]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#000080] text-white py-2 rounded-lg hover:bg-[#001a66]"
                >
                  {loading ? "Sending..." : "Start Chat"}
                </button>

                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}
              </form>
            )}

            {/* ================= CHAT STEP ================= */}
            {step === "chat" && (
              <>
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 mt-10">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-sm sm:text-base max-w-[85%] ${
                        msg.sender === "user"
                          ? "bg-[#000080] text-white ml-auto"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#000080] text-sm"
                  />
                  <button
                    onClick={sendChatMessage}
                    className="bg-[#000080] text-white px-4 rounded-lg text-sm"
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActions;
