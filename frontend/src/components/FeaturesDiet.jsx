import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/sermon"
    : "/api/sermon";

export default function FeaturesDiet() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const scrollRefs = useRef({});

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/list`);
        if (res.data.success) {
          setSermons(res.data.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ================= FILTER ================= */
  const videos = useMemo(
    () => sermons.filter((item) => item.type === "video"),
    [sermons]
  );

  /* ================= GROUP ================= */
  const chunkVideos = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const groupedVideos = chunkVideos(videos, 6);

  /* ================= YOUTUBE HELPERS ================= */
  const getVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /(?:youtube\.com\/(?:.*v=|.*\/|.*embed\/|shorts\/)|youtu\.be\/)([^#&?]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const getThumbnail = (url) => {
    const id = getVideoId(url);
    return id
      ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      : "https://via.placeholder.com/480x360?text=No+Thumbnail";
  };

  const getEmbed = (url) => {
    const id = getVideoId(url);
    return id
      ? `https://www.youtube.com/embed/${id}?autoplay=1`
      : "";
  };

  const scroll = (key, dir) => {
    const container = scrollRefs.current[key];
    if (!container) return;

    container.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center px-4 text-center">
        Loading videos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white pt-20 sm:pt-24 px-4 sm:px-6 md:px-10 relative">

      <div className="space-y-12 sm:space-y-16">
        {groupedVideos.map((row, rowIndex) => {
          const rowKey = `row-${rowIndex}`;

          return (
            <div key={rowKey}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
                Latest Uploads {rowIndex + 1}
              </h2>

              <div className="relative group">

                {/* LEFT ARROW */}
                <button
                  onClick={() => scroll(rowKey, "left")}
                  className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 
                             bg-black/70 p-2 sm:p-3 rounded-full 
                             opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* RIGHT ARROW */}
                <button
                  onClick={() => scroll(rowKey, "right")}
                  className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 
                             bg-black/70 p-2 sm:p-3 rounded-full 
                             opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
                >
                  <ChevronRight size={22} />
                </button>

                {/* SCROLL CONTAINER */}
                <div
                  ref={(el) => (scrollRefs.current[rowKey] = el)}
                  className="flex space-x-4 sm:space-x-6 overflow-x-auto 
                             scroll-smooth pb-4 scrollbar-hide"
                >
                  {row.map((video) => (
                    <motion.div
                      key={video._id}
                      whileHover={{ scale: 1.04 }}
                      onClick={() => setSelectedVideo(video)}
                      className="min-w-[220px] sm:min-w-[260px] md:min-w-[300px] 
                                 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer 
                                 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-36 sm:h-44 md:h-48">
                        <img
                          src={getThumbnail(video.mediaUrl)}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-blue-600 p-2 sm:p-3 rounded-full shadow-lg">
                            <Play size={22} className="sm:w-6 sm:h-6" fill="white" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-4">
                        <h3 className="text-xs sm:text-sm font-semibold line-clamp-2">
                          {video.title || "Untitled Sermon"}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-300 pt-1 font-bold mt-2">
                          Click to watch
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= RESPONSIVE FLOATING PLAYER ================= */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 sm:inset-auto 
                       sm:bottom-16 sm:right-6 
                       flex items-center justify-center 
                       sm:block z-50 px-4"
          >
            <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl 
                            w-full max-w-lg sm:w-[420px] md:w-[480px]">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 z-10 bg-black/60 p-1 rounded-full"
              >
                <X size={20} />
              </button>

              <div className="aspect-video">
                <iframe
                  src={getEmbed(selectedVideo.mediaUrl)}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
