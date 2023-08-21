import React from 'react';
import { useState, useEffect } from 'react';
import * as userService from '../../utilities/users-service';
import logoImage from '../../assets/logo.jpg';
import './SideBar.css'

export default function SideBar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <div className={`l-navbar ${isOpen ? 'show' : ''}`} id="nav-bar">
      <nav className="nav">
        <div>
          <div className="nav_logo">
            <img src={logoImage} alt="Logo" className="nav_logo-icon" />
            <span className="logoImage">Celestre</span>
          </div>
          <div className="nav_list">
            <a href="#" className="nav_link active">
              <i className="bx bx-grid-alt nav_icon"></i>
              <span className="nav_name">Dashboard</span>
            </a>
            {/* Add more nav links here */}
          </div>
        </div>

        <a href="#" className="nav_link" onClick={handleLogOut}>
          <i className="bx bx-log-out nav_icon"></i>
          <span className="nav_name">Sign Out</span>
        </a>
      </nav>
    </div>
  );
}