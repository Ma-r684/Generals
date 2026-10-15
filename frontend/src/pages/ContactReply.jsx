import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Loader2 } from "lucide-react";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/contact"
    : "/api/contact";

const ContactReply = () => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReply, setSelectedReply] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await axios.get(`${API_BASE}/my-replies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReplies(res.data);
      } catch (err) {
        console.error("Failed to fetch replies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReplies();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${API_BASE}/mark-read/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReplies((prev) =>
        prev.map((reply) =>
          reply._id === id ? { ...reply, isRead: true } : reply
        )
      );
    } catch (err) {
      console.error("Error marking as read", err);
    }
  };

  const handleOpenReply = (reply) => {
    setSelectedReply(reply);
    if (!reply.isRead) {
      markAsRead(reply._id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 md:px-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10"
      >
        Admin Feedback
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader2 className="animate-spin text-gray-500" size={40} />
        </div>
      ) : replies.length === 0 ? (
        <div className="flex flex-col items-center mt-20 text-gray-500">
          <MessageCircle size={60} />
          <p className="mt-4 text-lg">No replies yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {replies.map((reply) => (
            <motion.div
              key={reply._id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleOpenReply(reply)}
              className={`bg-white rounded-2xl shadow-md p-6 cursor-pointer transition ${
                !reply.isRead ? "ring-2 ring-blue-400" : ""
              }`}
            >
              <h2 className="font-semibold text-lg mb-2">
                {reply.subject}
              </h2>
              <p className="text-gray-600 line-clamp-3">
                {reply.replyMessage}
              </p>

              <div className="mt-4 text-sm text-gray-400">
                {new Date(reply.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedReply && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
            onClick={() => setSelectedReply(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8"
            >
              <h2 className="text-2xl font-bold mb-4">
                {selectedReply.subject}
              </h2>

              <p className="text-gray-700 leading-relaxed">
                {selectedReply.replyMessage}
              </p>

              <div className="mt-6 text-sm text-gray-400">
                {new Date(selectedReply.createdAt).toLocaleString()}
              </div>

              <button
                onClick={() => setSelectedReply(null)}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactReply;
