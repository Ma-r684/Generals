import { useState, useEffect } from "react";
import { ChevronDown, LogOut, User, Camera, Bell } from "lucide-react";
import axios from "axios";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/message"
    : "/api/message";

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const admin = {
    name: "Admin User",
    email: "admin@example.com",
    avatar: null,
  };

  // 🔔 Fetch unread messages
  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get(`${API_BASE}/unread-count`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setUnreadCount(res.data.count);
      }
    } catch (err) {
      console.error("Failed to fetch unread messages");
    }
  };

  useEffect(() => {
    fetchUnreadCount();

    // Poll every 10 seconds
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
      
      {/* Page Title */}
      <h1 className="text-lg font-semibold text-gray-800">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-6">
        
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 transition" />

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 focus:outline-none"
          >
            {/* Avatar */}
            {admin.avatar ? (
              <img
                src={admin.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {admin.name.charAt(0)}
              </div>
            )}

            {/* Name */}
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                {admin.name}
              </p>
              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
              
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-medium text-gray-800">
                  {admin.name}
                </p>
                <p className="text-xs text-gray-500">
                  {admin.email}
                </p>
              </div>

              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition">
                    <User className="w-4 h-4" />
                    Update Profile
                  </button>
                </li>

                <li>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition">
                    <Camera className="w-4 h-4" />
                    Change Profile Image
                  </button>
                </li>
              </ul>

              <div className="border-t">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}
