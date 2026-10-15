import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = "http://localhost:5000/api/events/list";
const BASE_URL = "http://localhost:5000";

// 👉 Replace with your actual background image
const HERO_BG = "/images/unity-bg.jpg";

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
        setEvents(data.data);
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
    <>
      {/* ===================== */}
      {/* SCRIPTURE HERO SECTION */}
      {/* ===================== */}
      <section
        className="relative w-full h-[70vh] bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Scripture Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl text-center px-6"
        >
          <h1 className="text-3xl md:text-5xl font-semibold text-white leading-relaxed">
            “'Behold, how good and how pleasant it is For brethren to dwell together in unity!”
          </h1>

          <p className="mt-6 text-lg text-gray-200 tracking-wide">
            — Psalm 133:1
          </p>
        </motion.div>
      </section>

      {/* ===================== */}
      {/* EVENTS SECTION */}
      {/* ===================== */}
      <section className="w-full bg-gray-50 py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-10">
          {loading && (
            <p className="text-center text-gray-500">Loading events...</p>
          )}

          {error && (
            <p className="text-center text-red-600">{error}</p>
          )}

          {!loading &&
            events.map((event) => (
              <motion.article
                key={event._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
              >
                {/* IMAGE */}
                <div className="md:w-[42%] w-full h-[280px] md:h-[260px] overflow-hidden">
                  {event.mediaType === "image" ? (
                    <img
                      src={`${BASE_URL}/uploads/events/${event.mediaUrl}`}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <video
                      src={`${BASE_URL}/uploads/events/${event.mediaUrl}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* CONTENT */}
                <div className="md:w-[58%] w-full p-8 flex flex-col justify-center">
                  <p className="text-sm font-medium text-gray-500 mb-3 tracking-wide">
                    {new Date(event.eventDate).toDateString()}
                  </p>

                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug mb-4">
                    {event.title}
                  </h2>

                  <p className="text-gray-600 text-base leading-relaxed line-clamp-4">
                    {event.description}
                  </p>

                  <div className="mt-6">
                    <button className="text-primary font-semibold hover:underline transition">
                      Learn More →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}

          {!loading && events.length === 0 && (
            <div className="bg-white shadow-sm p-10 text-center text-gray-500">
              No upcoming events available.
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default UpcomingEvents;
