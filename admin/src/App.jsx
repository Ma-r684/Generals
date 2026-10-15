// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Events from "./pages/admins/Events.jsx";
import AddDevotion from "./pages/admins/Devotion.jsx";
import AdminSermons from "./pages/admins/Sermons.jsx";
import Messages from "./pages/admins/Messages.jsx";
import AdminGivingReport from "./pages/admins/Giving.jsx";
import AdminUsers from "./pages/admins/AdminUsers.jsx";
import AdminDashboard from "./pages/admins/Dashboard.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ADMIN ROUTES */}
        <Route path="/" element={<Navigate to="admin"/>} />
        <Route path="login" element={<Login/>} />
        <Route path="/*" element={<AdminLayout />}>
        <Route path="admin" element={<AdminDashboard/>} />
          <Route path="events" element={<Events />} />
          <Route path="devotions" element={<AddDevotion/>} />
          <Route path="sermons" element={<AdminSermons/>} />
          <Route path="messages" element={<Messages/>} />
          <Route path="giving" element={<AdminGivingReport/>} />
          <Route path="users" element={<AdminUsers/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
