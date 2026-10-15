import { useEffect, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaEnvelope } from "react-icons/fa";

const FloatingActions = () => {
  const [visible, setVisible] = useState(false);
  const [hideOnFooter, setHideOnFooter] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto hide when footer appears
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideOnFooter(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Floating Buttons */}
      <div
        className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-6 flex flex-col gap-3 sm:gap-4 z-50 transition-all duration-500 ${
          visible && !hideOnFooter
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Contact Modal Trigger */}
        <button
          onClick={() => setOpenModal(true)}
          className="group relative flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg transition"
        >
          <FaEnvelope />
          <span className="absolute right-full mr-3 px-3 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Contact Us
          </span>
        </button>

        {/* WhatsApp */}
        <a
          href="https://wa.me/2547XXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center bg-green-500 hover:bg-green-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg transition"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50 animate-pulse"></span>
          <FaWhatsapp className="relative" />
          <span className="absolute right-full mr-3 px-3 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            WhatsApp
          </span>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg transition"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-50 animate-pulse"></span>
          <FaFacebookF className="relative" />
          <span className="absolute right-full mr-3 px-3 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Facebook
          </span>
        </a>

        {/* Scroll Top */}
        <button
          onClick={scrollToTop}
          className="group relative flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg transition"
        >
          <ArrowUp />
          <span className="absolute right-full mr-3 px-3 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Back to Top
          </span>
        </button>
      </div>

      {/* Floating Contact Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition">
          <div className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative animate-fadeIn">
            
            {/* Close */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Contact Us
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActions;
