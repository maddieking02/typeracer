import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/typeracer-logo.png';

const Home = () => {
  const location = useLocation();
  console.log('user value', location.state.user, 'avg value', location.state.avgWpm);

  const navigate = useNavigate();
  const routeChange = (e) => {
    console.log(e.target.name)
    const path = e.target.name;
    navigate(`${path}`, { state: { user } });
  }

  // this is being rendered each time SIGH bug fix
  const user = location.state.user === 'guest' ? (location.state.user.charAt(0).toUpperCase() + location.state.user.slice(1)) + JSON.stringify(Math.floor(Math.random() * 100) + 1) : location.state.user;

  const calculateAvgWpm = (arr) => {
    return arr.reduce((acc, num) => {
      acc += num;
      return acc;
    }, 0)
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
          {/* {location.state.avgWpm.length === 0 ? <h1 id="header">{user}</h1> : <div className="header-wpm">
            <h1 id="header-wpm-v">
              {user}
            </h1>
            <h4>WPM {calculateAvgWpm(location.state.avgWpm) / location.state.avgWpm.length}</h4>
          </div>} */}
          <h1 id="header">{user}</h1>
        </div>
        <h2>Welcome {user}</h2>
        <img id="home-logo" src={logo} alt="" />
        <h1 id="slogan">A typeracing game for programmers.</h1>
        <button className="home-btn glow-on-hover" type="button" name="/game/create" onClick={(e) => {routeChange(e)}}>CREATE GAME  ></button>
        <button className="home-btn glow-on-hover" type="button" name="/game/join" onClick={(e) => {routeChange(e)}}>JOIN GAME  ></button>
        <button className="home-btn glow-on-hover" type="button" name="/race" onClick={(e) => {routeChange(e)}}>START RACING  ></button>
      </div>
    </div>
  );
};

export default Home;