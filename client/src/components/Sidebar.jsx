/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdAccountCircle, MdLogout } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';

const Sidebar = ({
  isOpen, toggleSidebar, user, avgWpm,
}) => {
  const sidebarClass = isOpen ? 'sidebar open' : 'sidebar';

  const navigate = useNavigate();
  const routeChange = (e) => {
    const path = e.target.getAttribute('data-name');
    navigate(`${path}`, { state: { user, avgWpm } });
  };

  return (
    <div className={sidebarClass}>
      {/* <ul> */}
      <div className="content" data-name="/account" onClick={(e) => { routeChange(e); }}>
        <MdAccountCircle style={{ marginRight: '0.5em' }} />
        Account
      </div>
      <div className="content" data-name="/settings" onClick={(e) => { routeChange(e); }}>
        <IoMdSettings style={{ marginRight: '0.5em' }} />
        Settings
      </div>
      <div className="content" data-name="/login" onClick={(e) => { routeChange(e); }}>
        <MdLogout style={{ marginRight: '0.5em' }} />
        Logout
      </div>
    </div>
  );
};

export default Sidebar;