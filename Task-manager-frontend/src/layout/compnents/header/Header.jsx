import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../../redux/authSlice";
import "./Header.css";
import { openModal } from "../../../redux/modalSlice";
import AddTask from "../../../pages/user/addTask/AddTask";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/landingpage");
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="header-left">
          <Link to="/" className="logo">
            📝 Task<span className="title-color">Master</span>
          </Link>
        </div>

        {user && (
          <div className="header-center">
            <input
              type="text"
              placeholder="Search tasks..."
              className="search-input"
            />
          </div>
        )}

        <div className="header-right">
          <Link to="/" className="nav-home nav-link">
            Home
          </Link>
          {user && (
            <button onClick={handleOpenModal} className="nav-link add-task">
              Add Task
            </button>
          )}

          {user ? (
            <div className="profile-dropdown">
              <div
                className="profile-icon"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FaUserCircle size={30} />
              </div>

              {showDropdown && (
                <div className="dropdown-menuu">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {isModalOpen && <AddTask />}
    </header>
  );
};

export default Header;
