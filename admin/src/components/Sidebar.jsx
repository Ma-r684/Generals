import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Mic,
  Mail,
  Heart,
  DollarSign,
  Users,
  Settings
} from "lucide-react";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
     ${isActive
       ? "bg-blue-700 text-white"
       : "text-blue-100 hover:bg-blue-800 hover:text-white"}`;

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex flex-col">
      
      {/* Logo */}
      <div className="px-6 py-5 border-b border-blue-700">
        <h1 className="text-xl font-bold text-white tracking-wide">
          Admin Panel
        </h1>
        <p className="text-xs text-blue-200">Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavLink to="/admin" className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/events" className={linkClass}>
          <Calendar size={18} />
          Upcoming Events
        </NavLink>

        <NavLink to="/devotions" className={linkClass}>
          <BookOpen size={18} />
          Devotionals
        </NavLink>

        <NavLink to="/sermons" className={linkClass}>
          <Mic size={18} />
          Sermons
        </NavLink>

        <NavLink to="/messages" className={linkClass}>
          <Mail size={18} />
          Messages
        </NavLink>

        <NavLink to="/giving" className={linkClass}>
          <DollarSign size={18} />
          Giving Reports
        </NavLink>

        <NavLink to="/users" className={linkClass}>
          <Users size={18} />
          Admin Users
        </NavLink>
      </nav>

      {/* Settings */}
      <div className="px-3 py-4 border-t border-blue-700">
        <NavLink
          to="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-800 hover:text-white transition-all"
        >
          <Settings size={18} />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}
