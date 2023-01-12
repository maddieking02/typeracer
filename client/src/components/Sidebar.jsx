import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAccountCircle, MdLogout } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarClass = isOpen ? 'sidebar open' : 'sidebar';

  const navigate = useNavigate();
  const routeChange = () => {
    navigate('/login');
  };

  return (
    <div className={sidebarClass}>
      {/* <ul> */}
      <div className="content">
        <MdAccountCircle style={{ marginRight: '0.5em' }} />
        Account
      </div>
      <div className="content">
        <IoMdSettings style={{ marginRight: '0.5em' }} />
        Settings
      </div>
      <div className="content" onClick={() => {routeChange()}}>
        <MdLogout style={{ marginRight: '0.5em' }} />
        Logout
      </div>
    </div>
  );
};

export default Sidebar;