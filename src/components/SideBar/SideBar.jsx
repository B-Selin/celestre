import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

import logoImage from '../../assets/logo.jpg';
import './SideBar.css'

export default function SideBar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [isOverlayVisible, setIsOverlayVisible] = useState(false); // State for overlay


  function toggleSidebar() {
    setIsOpen(!isOpen);
    setIsOverlayVisible(!isOverlayVisible);

  }

  function handleLogOut() {
    userService.logOut();
    setUser(null);
    navigate('/'); // Navigate to home page after logout

  }

  // Close the sidebar when the screen size becomes smaller
  const closeSidebarOnSmallScreen = () => {
    if (window.innerWidth <= 1500 && isOpen) {
      setIsOpen(false);
    }
  };

  // Attach the event listener when the component mounts
  useEffect(() => {
    window.addEventListener('resize', closeSidebarOnSmallScreen);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', closeSidebarOnSmallScreen);
    };
  }, [isOpen]);

  return (
    <div>
      <div className={`overlay ${isOverlayVisible ? 'show' : ''}`} onClick={toggleSidebar}></div>
      <div className={`l-navbar ${isOpen ? 'show' : ''}`} id="nav-bar">
        <nav className="nav">
          <div>
            <div className="nav_logo" >
              <img
                src={logoImage}
                alt="Logo"
                className="nav_logo-icon glow"
                onClick={toggleSidebar}
              />
            </div>
            {/*leave a gap between logo and the links*/}


            {isOpen && (
              <div className="nav_list" onClick={toggleSidebar}>

                {/* Link to the Astronomy picture of the day page */}
                <Link to="/" className="nav_link">Astronomy Picture <br /> of the Day</Link>
                {/* link to about us page */}
                <Link to="/about" className="nav_link">About Celestre</Link>
                <Link to="/search" className="nav_link">Search for More</Link>


                {/* If there is a logged in user, show the dashboard link */}
                {user && (
                  <Link to="/dashboard" className="nav_link">Dashboard</Link>
                )}
              </div>
            )}
          </div>
          {isOpen && (
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
          )}
        </nav>
      </div>
    </div>
  );
}