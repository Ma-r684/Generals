import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.jpg";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [sermonOpen, setSermonOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  // AUTH CHECK
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/check-auth", {
          withCredentials: true,
        });
        setIsLoggedIn(res.data.success);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      setProfileOpen(false);
      window.location.href = "/";
    } catch {
      console.log("Logout failed");
    }
  };

  const closeAllMenus = () => {
    setMobileOpen(false);
    setAboutOpen(false);
    setSermonOpen(false);
    setProfileOpen(false);
  };

  const navLinkClass = (path) =>
    `hover:text-[#DAA520] transition ${
      location.pathname.startsWith(path) ? "text-[#DAA520]" : "text-[#001F3F]"
    }`;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="flex items-center px-4 md:px-8 h-20">
          {/* LOGO */}
          <Link to="/" onClick={closeAllMenus} className="mr-6">
            <img
              src={Logo}
              alt="Logo"
              className="h-12 w-auto cursor-pointer brightness-110"
            />
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden xl:flex items-center space-x-8 font-semibold">
            <li>
              <NavLink
                to="/"
                onClick={closeAllMenus}
                className={navLinkClass("/")}
              >
                HOME
              </NavLink>
            </li>

            {/* ABOUT */}
            <li className="relative">
              <div
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex items-center cursor-pointer hover:text-[#DAA520]"
              >
                ABOUT US <ChevronDown size={16} className="ml-1" />
              </div>

              <AnimatePresence>
                {aboutOpen && (
                  <motion.ul
                    variants={fadeIn}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0 }}
                    className="absolute left-0 top-8 bg-white shadow-lg rounded-md w-52 py-2 z-50"
                  >
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/history" onClick={closeAllMenus}>
                        Our Believes
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/biography" onClick={closeAllMenus}>
                        Biography
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li>
              <NavLink
                to="/devotions"
                onClick={closeAllMenus}
                className={navLinkClass("/devotions")}
              >
                DEVOTIONALS
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/events"
                onClick={closeAllMenus}
                className={navLinkClass("/events")}
              >
                UPCOMING EVENTS
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                onClick={closeAllMenus}
                className={navLinkClass("/contact")}
              >
                CONTACT US
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/give"
                onClick={closeAllMenus}
                className={navLinkClass("/give")}
              >
                PARTNERSHIP
              </NavLink>
            </li>
          </ul>

          {/* RIGHT SIDE */}
          <div className="hidden xl:flex items-center space-x-4 ml-auto">
            {/* SERMON DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setSermonOpen(!sermonOpen)}
                className="bg-[#FFD700] px-6 py-3 rounded-lg text-black font-semibold hover:shadow-lg transition"
              >
                Get Sermons
              </button>

              <AnimatePresence>
                {sermonOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border"
                  >
                    <Link
                      to="/audio"
                      onClick={closeAllMenus}
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      AUDIO
                    </Link>
                    <Link
                      to="/video"
                      onClick={closeAllMenus}
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      VIDEO
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!isLoggedIn && (
              <Link to="/signup">
                <button className="border px-4 py-2 rounded-md">Sign In</button>
              </Link>
            )}

            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#001F3F] text-white"
                >
                  <User size={18} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border text-black"
                    >
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-3 hover:bg-gray-100"
                      >
                        Update Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* MOBILE ICON */}
          <button
            className="xl:hidden ml-auto"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE SIDE DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 xl:hidden"
              onClick={closeAllMenus}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 h-full w-72 bg-[#000080] text-white z-50 xl:hidden shadow-xl"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-white/20">
                <h2 className="text-lg font-semibold">MENU</h2>
                <X
                  size={26}
                  className="cursor-pointer"
                  onClick={closeAllMenus}
                />
              </div>

              <div className="flex flex-col px-6 py-6 space-y-6 text-lg font-medium">
                <Link to="/" onClick={closeAllMenus}>
                  Home
                </Link>
                {/* ABOUT US */}
                <div>
                  <div
                    onClick={() => setAboutOpen(!aboutOpen)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    About Us
                    {aboutOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </div>

                  <AnimatePresence>
                    {aboutOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-3 flex flex-col space-y-3 text-base text-white/80"
                      >
                        <Link to="/history" onClick={closeAllMenus}>
                          Our Believes
                        </Link>
                        <Link to="/biography" onClick={closeAllMenus}>
                          Biography
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link to="/devotions" onClick={closeAllMenus}>
                  Devotions
                </Link>
                <Link to="/events" onClick={closeAllMenus}>
                  Upcoming Events
                </Link>
                <Link to="/contact" onClick={closeAllMenus}>
                  Contact Us
                </Link>
                <Link to="/give" onClick={closeAllMenus}>
                  Partnership
                </Link>
                 {/* SERMONS */}
                <div>
                  <div
                    onClick={() => setSermonOpen(!sermonOpen)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    Get Sermons
                    {sermonOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </div>

                  <AnimatePresence>
                    {sermonOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-3 flex flex-col space-y-3 text-base text-white/80"
                      >
                        <Link to="/audio" onClick={closeAllMenus}>
                          Audio
                        </Link>
                        <Link to="/video" onClick={closeAllMenus}>
                          Video
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                 {/* AUTH */}
                {!isLoggedIn ? (
                  <Link to="/signup" onClick={closeAllMenus}>
                    <button className="mt-4 bg-[#FFD700] text-black px-4 py-2 rounded-md w-full">
                      Sign In
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 px-4 py-2 rounded-md w-full"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
