import React from 'react';
import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logoImage from '../../assets/logo.jpg';
import './SideBar.css'

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen); // Toggle the value
  }


  return (
    <>
      <button onClick={() => toggleSidebar()}>
        <img src={logoImage} alt="Logo" className='logo' />
      </button>

      <Sidebar collapsed={!isOpen}>
        <Menu>
          <MenuItem>Home</MenuItem>
          <MenuItem>About</MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}
