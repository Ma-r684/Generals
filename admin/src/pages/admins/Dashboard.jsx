import { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  BookOpen,
  Mic,
  Mail,
  DollarSign,
  Users,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const DEVOTION_API =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/devotion"
    : "/api/devotion";

const EVENTS_API =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/events"
    : "/api/events";

const SERMON_API =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/sermon"
    : "/api/sermon";

const CONTACT_API =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/contact"
    : "/api/contact";

const GIVING_API =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/admin"
    : "/api/admin";

export default function AdminDashboard() {
  const { user, loading } = useAuth(); 
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalDevotions: 0,
    totalSermons: 0,
    totalMessages: 0,
    totalGiving: 0,
    totalAdmins: 3,
  });

  /* REDIRECT SAFELY */

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  /* FETCH FUNCTIONS  */

  const fetchDevotions = async () => {
    try {
      const { data } = await axios.get(`${DEVOTION_API}/list`);
      if (data.success) {
        setStats((prev) => ({
          ...prev,
          totalDevotions: data.data.length,
        }));
      }
    } catch (error) {
      console.error("Devotions fetch failed", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`${EVENTS_API}/list`);
      if (data.success) {
        setStats((prev) => ({
          ...prev,
          totalEvents: data.data.length,
        }));
      }
    } catch (error) {
      console.error("Events fetch failed", error);
    }
  };

  const fetchSermons = async () => {
    try {
      const { data } = await axios.get(`${SERMON_API}/list`);
      if (data.success) {
        setStats((prev) => ({
          ...prev,
          totalSermons: data.data.length,
        }));
      }
    } catch (error) {
      console.error("Sermons fetch failed", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(CONTACT_API);
      if (data.success && Array.isArray(data.data)) {
        setStats((prev) => ({
          ...prev,
          totalMessages: data.data.length,
        }));
      }
    } catch (error) {
      console.error("Messages fetch failed", error);
    }
  };

  const fetchGiving = async () => {
    try {
      const { data } = await axios.get(`${GIVING_API}/donations`, {
        withCredentials: true,
      });

      if (Array.isArray(data.donations)) {
        const total = data.donations.reduce(
          (sum, d) => sum + Number(d.amount || 0),
          0,
        );

        setStats((prev) => ({
          ...prev,
          totalGiving: total,
        }));
      }
    } catch (error) {
      console.error("Giving fetch failed", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDevotions();
      fetchEvents();
      fetchSermons();
      fetchMessages();
      fetchGiving();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        {user?.name} Dashboard Overview
      </h1>

      {/* TOP SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <StatCard
          title="Upcoming Events"
          value={stats.totalEvents}
          icon={<Calendar size={22} />}
          color="bg-blue-600"
        />

        <StatCard
          title="Total Devotionals"
          value={stats.totalDevotions}
          icon={<BookOpen size={22} />}
          color="bg-indigo-600"
        />

        <StatCard
          title="Total Sermons"
          value={stats.totalSermons}
          icon={<Mic size={22} />}
          color="bg-purple-600"
        />
      </div>

      {/* SYSTEM OVERVIEW */}
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        System Overview
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <StatCard
          title="Messages Received"
          value={stats.totalMessages}
          icon={<Mail size={22} />}
          color="bg-teal-600"
        />

        <StatCard
          title="Total Giving"
          value={`Ksh ${Number(stats.totalGiving).toLocaleString()}`}
          icon={<DollarSign size={22} />}
          color="bg-green-600"
        />

        <StatCard
          title="Admin Users"
          value={stats.totalAdmins}
          icon={<Users size={22} />}
          color="bg-amber-500"
        />
      </div>

      {/* ACTIVITY */}
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Activity Snapshot
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <StatCard
          title="Growth This Month"
          value="+12%"
          icon={<TrendingUp size={22} />}
          color="bg-emerald-600"
        />

        <StatCard
          title="Platform Activity"
          value="Active"
          icon={<Activity size={22} />}
          color="bg-gray-700"
        />
      </div>
    </div>
  );
}

/* STAT CARD */

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-all duration-200">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
      </div>

      <div className={`${color} p-4 rounded-xl text-white shadow-md`}>
        {icon}
      </div>
    </div>
  );
}
