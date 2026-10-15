import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Homepage from "./pages/Homepage";
import AboutUs from "./pages/AboutUs";
import Biography from "./pages/Biography";
import Devotions from "./pages/Devotions";
import DevotionDetails from "./pages/DevotionDetails";
import UpcomingEvents from "./pages/UpcomingEvents";
import ContactUs from "./pages/ContactUs";
import GivingPage from "./pages/Give";
import Video from "./pages/Video";
import Profile from "./pages/Pofile";
import ContactReply from "./pages/ContactReply";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";

import { useAuthStore } from "./store/authStore";

/* ================= PROTECTED ROUTE ================= */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;

  return children;
};

/* ================= MAIN CONTENT ================= */
const AppContent = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/contact"
      : "/api/contact";

  //AUTH CHECK
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //GLOBAL UNREAD REPLY CHECK
  useEffect(() => {
    const checkUnreadReplies = async () => {
      if (!isAuthenticated) return;

      try {
        const res = await axios.get(`${API_BASE}/my-messages`, {
          withCredentials: true,
        });

        const hasUnreadReply = res?.data?.data?.some(
          (msg) => msg.adminReply && msg.isReadByUser === false
        );

        // Prevent infinite redirect
        if (
          hasUnreadReply &&
          location.pathname !== "/my-replies"
        ) {
          navigate("/my-replies");
        }
      } catch (err) {
        console.error("Reply check failed:", err);
      }
    };

    checkUnreadReplies();
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main className="font-sans min-h-screen">
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/biography" element={<Biography />} />
          <Route path="/devotions" element={<Devotions />} />
          <Route path="/devotion/:id" element={<DevotionDetails />} />
          <Route path="/events" element={<UpcomingEvents />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/give" element={<GivingPage />} />
          <Route path="/video" element={<Video />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-replies"
            element={
              <ProtectedRoute>
                <ContactReply />
              </ProtectedRoute>
            }
          />

          {/* AUTH ROUTES */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        <Toaster position="top-right" />
      </main>

      <Footer />
    </>
  );
};

/* ================= APP WRAPPER ================= */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
