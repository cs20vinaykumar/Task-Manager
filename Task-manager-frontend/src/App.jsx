import React, { useEffect } from "react";
import Routers from "./routers/Routers";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/authSlice";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");

    // Rehydrate Redux store if user and token exist
    if (token && user) {
      dispatch(
        loginSuccess({
          token,
          user: JSON.parse(user),
        })
      );
    }

    // Public routes that don't need auth
    const publicRoutes = ["/login", "/register", "/landingpage"];

    // Redirect to landing page if not authenticated
    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate("/landingpage", { replace: true });
    }
  }, [location.pathname, navigate, dispatch]);

  return <Routers />;
}
