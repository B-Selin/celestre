import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

import logoImage from '../../assets/logo.jpg';
import './SideBar.css'

export default function SideBar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate


  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  function handleLogOut() {
    userService.logOut();
    setUser(null);
    navigate('/'); // Navigate to home page after logout

  }

  return (
    <div className={`l-navbar ${isOpen ? 'show' : ''}`} id="nav-bar">
      <nav className="nav">
        <div>
          <div className="nav_logo">
            <img src={logoImage} alt="Logo" className="nav_logo-icon" />
            <span className="logoImage"></span>
          </div>
          <div className="nav_list">
            <a href="#" className="nav_link active">
              <i className="bx bx-grid-alt nav_icon"></i>
              <Link to="/search" className="nav_name">Search for More</Link>
            </a>
            {/* Add more nav links here */}
          </div>
        </div>
        <a
          href="#"
          className="nav_link"
          onClick={user ? handleLogOut : () => navigate('/login')} // Navigate to '/login'
        >
          <i className="bx bx-log-out nav_icon"></i>
          <span className="nav_name">
            {user ? 'Sign Out' : 'Log In'}
          </span>
        </a>
      </nav>
    </div>
  );
}