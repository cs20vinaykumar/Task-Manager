import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../../services/services";
import { loginApi } from "../../../services/apiEndpoints";
import Swal from "sweetalert2";
import "./Login.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (!emailAddress || !password) {
      Swal.fire({
        title: "Validation Error",
        text: "Email and Password are required!",
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }
    try {
      const response = await create(loginApi, { emailAddress, password });

      if (response?.success && response?.data?.authToken) {
        const decodedUser = jwtDecode(response.data.authToken);
        dispatch(
          loginSuccess({
            user: decodedUser,
            token: response.data.authToken,
          })
        );
        localStorage.setItem("authToken", response.data.authToken);
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);

      Swal.fire({
        title: "Login Failed",
        text: error.message || "Invalid credentials, please try again.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back!</h1>
        <input
          type="email"
          value={emailAddress}
          className="input-field"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          className="input-field"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={loginUser}>
          Login
        </button>

        <p className="signup-text">
          {" "}
          Don't have an account?{" "}
          <button className="signup-btn" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </p>
        <button
          className="forgot-button"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default Login;
