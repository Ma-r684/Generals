import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/contact"
    : "/api/contact";

const AdminMessages = () => {
  const [contacts, setContacts] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sendingId, setSendingId] = useState(null);

  // ================= FETCH =================
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(API_BASE);

      if (res?.data?.success && Array.isArray(res.data.data)) {
        setContacts(res.data.data);
      } else {
        setContacts([]);
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setError("Failed to load messages.");
      toast.error("Failed to load messages");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ================= REPLY =================
  const handleReply = async (id) => {
    if (!replyText[id]?.trim()) {
      toast.warning("Reply cannot be empty");
      return;
    }

    try {
      setSendingId(id);

      await axios.put(`${API_BASE}/${id}/reply`, {
        adminReply: replyText[id],
      });

      toast.success("Reply sent successfully");
      setReplyText((prev) => ({ ...prev, [id]: "" }));
      fetchContacts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reply");
    } finally {
      setSendingId(null);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success("Message deleted successfully");
      fetchContacts();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // ================= STATUS COLOR =================
  const getStatusStyle = (status) => {
    switch (status) {
      case "unread":
        return "bg-yellow-100 text-yellow-700";
      case "read":
        return "bg-blue-100 text-blue-700";
      case "replied":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600 text-lg">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 text-[#000080]">
          Contact Messages
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        {contacts.length === 0 && (
          <div className="bg-gray-50 p-6 rounded shadow-sm text-gray-500">
            No messages found.
          </div>
        )}

        {contacts.map((contact) => {
          const formattedDate = contact?.createdAt
            ? new Date(contact.createdAt).toLocaleString()
            : "Unknown date";

          return (
            <div
              key={contact._id}
              className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200 shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-semibold text-lg">
                    {contact?.name || "No Name"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {contact?.email || "No Email"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formattedDate}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full capitalize ${getStatusStyle(
                    contact?.status
                  )}`}
                >
                  {contact?.status || "unknown"}
                </span>
              </div>

              {/* Subject */}
              <p className="mb-2">
                <strong>Subject:</strong>{" "}
                {contact?.subject || "N/A"}
              </p>

              {/* Message */}
              <p className="mb-4 whitespace-pre-line text-gray-700">
                {contact?.message || "No message"}
              </p>

              {/* Admin Reply */}
              {contact?.adminReply && (
                <div className="bg-green-50 p-4 rounded mb-4 border border-green-100">
                  <strong className="text-green-700">
                    Admin Reply:
                  </strong>
                  <p className="mt-1">{contact.adminReply}</p>
                </div>
              )}

              {/* Reply Box */}
              {!contact?.adminReply && (
                <>
                  <textarea
                    placeholder="Write reply..."
                    value={replyText[contact._id] || ""}
                    onChange={(e) =>
                      setReplyText((prev) => ({
                        ...prev,
                        [contact._id]: e.target.value,
                      }))
                    }
                    className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#000080]"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReply(contact._id)}
                      disabled={sendingId === contact._id}
                      className="bg-[#000080] text-white px-5 py-2 rounded hover:opacity-90 disabled:opacity-60"
                    >
                      {sendingId === contact._id
                        ? "Sending..."
                        : "Send Reply"}
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(contact._id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded hover:opacity-90"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminMessages;
