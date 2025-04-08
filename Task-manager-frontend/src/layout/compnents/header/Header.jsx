import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../../redux/authSlice";
import { openModal } from "../../../redux/modalSlice";
import AddTask from "../../../pages/user/addTask/AddTask";
import { setSearchTerm } from "../../../redux/searchSlice";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    dispatch(logout());
    setShowDropdown(false);
    setShowMobileMenu(false);
    navigate("/landingpage");
  };

  const handleOpenModal = () => {
    dispatch(openModal({ type: "ADD_TASK" }));
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
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
              onChange={handleSearch}
            />
          </div>
        )}

        <div className="header-right">
          {!user && (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
          {user && (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <button onClick={handleOpenModal} className="nav-link add-task">
                Add Task
              </button>
            </>
          )}

          {user && (
            <div className="profile-dropdown">
              <div
                className="profile-icon"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FaUserCircle size={35} />
              </div>
              {user?.fullName && (
                <div className="profile-name">{user.fullName}</div>
              )}
              {showDropdown && (
                <div className="dropdown-menuu">
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Menu for mobile */}
        <div className="hamburger-menu" onClick={toggleMobileMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="mobile-dropdown active">
          <Link
            to="/"
            className="dropdown-item"
            onClick={() => setShowMobileMenu(false)}
          >
            Home
          </Link>
          {user && (
            <button
              onClick={() => {
                handleOpenModal();
                setShowMobileMenu(false);
              }}
              className="dropdown-item"
            >
              Add Task
            </button>
          )}
          {!user ? (
            <>
              <Link
                to="/login"
                className="dropdown-item"
                onClick={() => setShowMobileMenu(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="dropdown-item"
                onClick={() => setShowMobileMenu(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              className="dropdown-item"
              onClick={() => {
                handleLogout();
                setShowMobileMenu(false);
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}

      {isModalOpen && <AddTask />}
    </header>
  );
};

export default Header;
