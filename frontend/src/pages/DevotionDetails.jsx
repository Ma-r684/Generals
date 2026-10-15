import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/devotion"
    : "/api/devotion";

export default function DevotionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [devotion, setDevotion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevotion = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${id}`);
        if (res.data.success) {
          setDevotion(res.data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevotion();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <p className="text-gray-500 text-sm sm:text-base">
          Loading devotion...
        </p>
      </div>
    );
  }

  if (!devotion) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <p className="text-red-600 text-sm sm:text-base">
          Devotion not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}
      <div className="bg-[#001f54] py-12 sm:py-14 px-4 sm:px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Generals Arena Devotion
          </h1>
          <p className="text-white/80 mt-3 text-xs sm:text-sm md:text-base">
            Daily Word • Spiritual Growth • Divine Insight
          </p>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="max-w-3xl xl:max-w-4xl mx-auto 
                      px-4 sm:px-6 md:px-10 lg:px-12 
                      py-10 sm:py-14 md:py-16">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-[#001f54] hover:underline 
                     mb-8 sm:mb-10 text-sm sm:text-base"
        >
          ← Back to Devotions
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl 
                       font-semibold text-[#001f54] 
                       leading-snug sm:leading-tight break-words">
          {devotion.title}
        </h2>

        {/* Scripture */}
        {devotion.scripture && (
          <div className="mt-6 p-4 sm:p-6 
                          bg-blue-50 border-l-4 border-blue-600 
                          rounded-lg">
            <p className="text-blue-900 font-medium 
                          text-sm sm:text-base md:text-lg 
                          leading-relaxed">
              {devotion.scripture}
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="my-8 sm:my-10 border-t border-gray-300" />

        {/* Content */}
        <div
          className="text-gray-700 
                     text-sm sm:text-base md:text-lg 
                     leading-relaxed sm:leading-loose 
                     space-y-5 sm:space-y-6 
                     whitespace-pre-line break-words"
        >
          {devotion.content}
        </div>
      </div>
    </div>
  );
}
