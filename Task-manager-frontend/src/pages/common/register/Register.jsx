import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../../services/apiEndpoints";
import Swal from "sweetalert2";
import { create } from "../../../services/services";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, emailAddress, phoneNo, password, confirmPassword } =
      formData;

    // Validation
    if (
      !fullName ||
      !emailAddress ||
      !phoneNo ||
      !password ||
      !confirmPassword
    ) {
      Swal.fire({
        title: "Validation Error",
        text: "All fields are required!",
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Password Mismatch",
        text: "Passwords do not match!",
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const response = await create(registerApi, formData);

      if (response?.success) {
        Swal.fire({
          title: "Registration Successful",
          text: "Redirecting to login...",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      console.error("Register Error:", error);

      Swal.fire({
        title: "Registration Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h4>Create Your Account</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="emailAddress"
              name="emailAddress"
              placeholder="Enter your email"
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNo">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNo"
              name="phoneNo"
              placeholder="Enter your phone number"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-block">
            Register
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="link-text">
              Login
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
