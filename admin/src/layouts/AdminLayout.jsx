import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar.jsx";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="h-screen bg-gray-100">

      {/* Sidebar - Fixed */}
      <div className="fixed top-0 left-0 h-screen w-64 z-30">
        <Sidebar />
      </div>

      {/* Right Side */}
      <div className="ml-64 flex flex-col h-screen">

        {/* Navbar - Fixed */}
        <div className="fixed top-0 left-64 right-0 z-20">
          <AdminNavbar />
        </div>

        {/* Scrollable Content */}
        <main className="mt-16 p-8 overflow-y-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
