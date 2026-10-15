import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading

  // Check auth only once on app load
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
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
