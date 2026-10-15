import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = "http://localhost:5000/api/events/list";
const BASE_URL = "http://localhost:5000";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(API);

      if (data.success) {
        const sorted = data.data.sort(
          (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
        );
        setEvents(sorted);
      } else {
        setError("Failed to load events");
      }
    } catch (err) {
      setError("Server error. Could not fetch events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen w-full pt-2 md:pt-24 bg-gradient-to-br from-[#050816] via-[#07132b] to-[#050816] px-6 md:px-12 pb-20 text-white">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Upcoming Events
        </h1>
        <p className="text-gray-400 text-lg">
          Stay updated on our upcoming gatherings and special programs.
        </p>
      </motion.div>

      {/* EVENTS LIST */}
      <div className="max-w-5xl mx-auto space-y-16">

        {loading && (
          <p className="text-center text-gray-400 text-lg">
            Loading events...
          </p>
        )}

        {error && (
          <p className="text-center text-red-400">{error}</p>
        )}

        {!loading && events.length === 0 && (
          <div className="bg-[#0b1a33]/70 backdrop-blur-xl border border-gray-700 shadow-xl rounded-2xl p-10 text-center text-gray-400 text-lg">
            There are no upcoming events.
          </div>
        )}

        {!loading &&
          events.map((event) => {
            const dateObj = new Date(event.eventDate);
            const month = dateObj
              .toLocaleString("default", { month: "short" })
              .toUpperCase();
            const day = dateObj.getDate();
            const year = dateObj.getFullYear();

            return (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex gap-8 relative"
              >
                {/* LEFT DATE COLUMN */}
                <div className="min-w-[80px] text-center">
                  <p className="text-sm text-gray-400">{month}</p>
                  <p className="text-3xl font-bold text-white">{day}</p>
                  <p className="text-sm text-gray-400">{year}</p>
                </div>

                {/* VERTICAL LINE */}
                <div className="w-[2px] bg-blue-500 relative">
                  <div className="absolute -left-[5px] top-2 w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex flex-col md:flex-row justify-between gap-6 flex-1 bg-[#0b1a33]/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-lg">

                  {/* TEXT SECTION */}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                      {event.title}
                    </h2>

                    <p className="text-gray-400 mb-2">
                      <span className="font-semibold text-white">
                        {event.location || "Event Location"}
                      </span>
                    </p>

                    <p className="text-gray-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* IMAGE / VIDEO */}
                  {event.mediaUrl && (
                    <div className="w-full md:w-[280px] flex-shrink-0">
                      {event.mediaType === "image" ? (
                        <img
                          src={`${BASE_URL}/uploads/events/${event.mediaUrl}`}
                          alt={event.title}
                          className="rounded-lg object-cover w-full h-[180px]"
                        />
                      ) : (
                        <video
                          src={`${BASE_URL}/uploads/events/${event.mediaUrl}`}
                          controls
                          className="rounded-lg w-full h-[180px] object-cover"
                        />
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default UpcomingEvents;
