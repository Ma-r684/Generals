import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/devotion"
    : "/api/devotion";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "";

export default function Devotions() {
  const [devotions, setDevotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevotions = async () => {
      try {
        const res = await axios.get(`${API_BASE}/list`);
        if (res.data.success) {
          setDevotions(res.data.data);
        } else {
          setError("Failed to load devotions.");
        }
      } catch (err) {
        setError("Server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevotions();
  }, []);

  const filteredDevotions = useMemo(() => {
    return devotions.filter((d) =>
      d.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      d.scripture?.toLowerCase().includes(searchText.toLowerCase()) ||
      d.content?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [devotions, searchText]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-[#001f54] py-10 sm:py-14 px-4 sm:px-6 lg:px-16 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">

          {/* Title */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Generals Arena Devotion
            </h1>
            <p className="text-white/80 text-xs sm:text-sm mt-2">
              Home → <span className="font-semibold">Devotion</span>
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full sm:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search devotion..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-white rounded-full pl-11 pr-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-10 sm:py-14 lg:py-16">

        {loading && (
          <p className="text-center text-gray-500 text-sm sm:text-base">
            Loading devotions...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 text-sm sm:text-base">
            {error}
          </p>
        )}

        {!loading && filteredDevotions.length === 0 && (
          <p className="text-center text-gray-500 text-sm sm:text-base">
            No devotions found.
          </p>
        )}

        {/* RESPONSIVE GRID */}
        <div className="grid gap-6 sm:gap-8 md:gap-10 
                        grid-cols-1 
                        sm:grid-cols-2 
                        xl:grid-cols-3">

          {filteredDevotions.map((devotion) => (
            <motion.div
              key={devotion._id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
              onClick={() => navigate(`/devotion/${devotion._id}`)}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden group transition"
            >

              {/* IMAGE */}
              {devotion.image && (
                <div className="overflow-hidden">
                  <img
                    src={`${BASE_URL}/uploads/devotion/${devotion.image}`}
                    alt={devotion.title}
                    className="w-full 
                               h-48 sm:h-52 md:h-56 lg:h-60 
                               object-cover 
                               group-hover:scale-105 
                               transition duration-500"
                  />
                </div>
              )}

              {/* CARD BODY */}
              <div className="p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-[#001f54] line-clamp-2 group-hover:underline">
                  {devotion.title}
                </h2>

                {devotion.scripture && (
                  <p className="text-sm sm:text-base text-[#001f54] mt-2 line-clamp-2">
                    {devotion.scripture}
                  </p>
                )}

                {/* Optional preview snippet */}
                {devotion.content && (
                  <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                    {devotion.content}
                  </p>
                )}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
