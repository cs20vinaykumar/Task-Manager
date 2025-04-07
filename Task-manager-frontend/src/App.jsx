import React, { useEffect } from "react";
import Routers from "./routers/Routers";
import { useNavigate, useLocation } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // Allow unauthenticated users to access login and register pages
    const publicRoutes = ["/login", "/register", "/landingpage"];

    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate("/landingpage", { replace: true });
    }
  }, [location.pathname, navigate]);

  return <Routers />;
}
