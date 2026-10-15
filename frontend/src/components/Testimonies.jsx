import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Testimonies = () => {
  const navigate = useNavigate();
  const [loadingPage, setLoadingPage] = useState(null);

  const handleNavigation = (path) => {
    setLoadingPage(path);

    setTimeout(() => {
      navigate(path);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center px-6 py-16 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">

        {/* Card 1 - Devotions */}
        <div className="text-center bg-white/70 backdrop-blur-md shadow-lg rounded-lg p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#000080] mb-6">
            Get In Touch By Our Daily Devotions
          </h2>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Since we are a ministry founded on the Word of God, we embrace daily
            fellowship through our devotionals. You can have access to a copy to
            enhance your relationship with God on a daily basis.
          </p>

          <button
            onClick={() => handleNavigation("/devotions")}
            disabled={loadingPage !== null}
            className={`px-8 py-3 font-semibold rounded-md transition-all duration-300 shadow-md
              ${
                loadingPage === "/devotions"
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-800 hover:scale-105"
              } text-white`}
          >
            {loadingPage === "/devotions" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Loading...
              </span>
            ) : (
              "Get A Copy"
            )}
          </button>
        </div>

        {/* Card 2 - Sermons */}
        <div className="text-center bg-white/70 backdrop-blur-md shadow-lg rounded-lg p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#000080] mb-6">
            Access Sermons
          </h2>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Our messages and teachings are usually uploaded in Generals' Arena
            digital library. Stay connected and grow deeper in faith by
            accessing our latest teachings.
          </p>

          <button
            onClick={() => handleNavigation("/video")}   // ✅ CHANGED HERE
            disabled={loadingPage !== null}
            className={`px-8 py-3 font-semibold rounded-md transition-all duration-300 shadow-md
              ${
                loadingPage === "/video"
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-800 hover:scale-105"
              } text-white`}
          >
            {loadingPage === "/video" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Loading...
              </span>
            ) : (
              "Get Sermons"
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Testimonies;
