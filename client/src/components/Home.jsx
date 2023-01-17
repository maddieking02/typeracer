import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import logo from '../assets/typeracer-logo.png';
import Sidebar from './Sidebar.jsx';
// import { HiOutlineDotsVertical } from "react-icons/hi";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  console.log('user value', location.state.user, 'avg value', location.state.avgWpm);

  const navigate = useNavigate();
  const routeChange = (e) => {
    console.log(e.target.name)
    const path = e.target.name;
    navigate(`${path}`, { state: { user, avgWpm: location.state.avgWpm } });
  }

  // this is being rendered each time SIGH bug fix
  const user = location.state.user === 'guest' ? (location.state.user.charAt(0).toUpperCase() + location.state.user.slice(1)) + JSON.stringify(Math.floor(Math.random() * 100) + 1) : location.state.user;

  const calculateAvgWpm = (arr) => {
    return arr.reduce((acc, num) => {
      acc += num;
      return acc;
    }, 0)
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="bg home-container">

      <div className="star-field home-inner-container">
        <div className="layer" />
        <div className="layer" />
        <div className="header-container">
          <h1 id="header">
            typeracer_
          </h1>

          <h1 id="sidebar-container">
            {/* <h1 id="header" onClick={() => {toggleSidebar()}}>{user}</h1> */}
            {location.state.avgWpm.length === 0 ? <h1 id="header" onClick={() => {toggleSidebar()}}>{user}</h1> : <div className="header-wpm" onClick={() => {toggleSidebar()}}>
            <h1 id="header-wpm-v">
              {user}
            </h1>
            <h4>WPM {location.state.avgWpm.length === 1 ? 0 : Math.round(calculateAvgWpm(location.state.avgWpm.slice(1)) / (location.state.avgWpm.length - 1))}</h4>
          </div>}
          </h1>
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} user={user} avgWpm={location.state.avgWpm} />
        </div>

        <div id="home-content-container">
          <h2 id="home-welcome">Welcome {user}</h2>
          <img id="home-logo" src={logo} alt="" />
          <h1 id="slogan">A typeracing game for programmers.</h1>
          <div id="home-btn-container">
            <button className="home-btn glow-on-hover" type="button" name="/game/create" onClick={(e) => {routeChange(e)}}>CREATE GAME  ></button>
            <button className="home-btn glow-on-hover" type="button" name="/game/join" onClick={(e) => {routeChange(e)}}>JOIN GAME  ></button>
            <button className="home-btn glow-on-hover" type="button" name="/race" onClick={(e) => {routeChange(e)}}>START RACING  ></button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Home;