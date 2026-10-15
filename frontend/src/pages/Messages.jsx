import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/contact"
    : "/api/contact";

const Messages = () => {
  const [contactId, setContactId] = useState("");
  const [conversation, setConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Load conversation
  const fetchConversation = async () => {
    if (!contactId) return;

    try {
      const res = await axios.get(`${API_BASE}/${contactId}`);
      setConversation(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!contactId) return;

    fetchConversation();

    const interval = setInterval(fetchConversation, 5000);
    return () => clearInterval(interval);
  }, [contactId]);

  // Send reply (user reply)
  const sendReply = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(`${API_BASE}/${contactId}/reply`, {
        sender: "user",
        text: newMessage,
      });

      setNewMessage("");
      fetchConversation();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        <h1 className="text-3xl font-bold text-[#000080] mb-6">
          Your Messages
        </h1>

        {/* Enter Conversation ID */}
        <input
          type="text"
          placeholder="Enter your conversation ID"
          value={contactId}
          onChange={(e) => setContactId(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />

        {conversation && (
          <>
            <div className="space-y-3 h-[400px] overflow-y-auto border rounded-lg p-4 mb-4">
              {conversation.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-[#000080] text-white ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your reply..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button
                onClick={sendReply}
                className="bg-[#000080] text-white px-6 rounded-lg"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
