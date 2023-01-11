import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/typeracer-logo.png';

const Home = () => {
  const location = useLocation();
  console.log('user value', location.state.user);

  const navigate = useNavigate();
  const routeChange = (e) => {
    console.log(e.target.name)
    const path = e.target.name;
    navigate(`${path}`, { state: { user } });
  }

  // this is being rendered each time SIGH bug fix
  const user = location.state.user === 'guest' ? (location.state.user.charAt(0).toUpperCase() + location.state.user.slice(1)) + JSON.stringify(Math.floor(Math.random() * 100) + 1) : location.state.user;

  return (
    <div>
      <h1>typeracer_</h1>
      <h2>Welcome {user}</h2>
      <img src={logo} alt="" />
      <h1>A typeracing game for programmers.</h1>
      <button type="button" name="/game/create" onClick={(e) => {routeChange(e)}}>CREATE GAME ></button>
      <button type="button" name="/game/join" onClick={(e) => {routeChange(e)}}>JOIN GAME ></button>
      <button type="button" name="/race" onClick={(e) => {routeChange(e)}}>START RACING ></button>
    </div>
  );
};

export default Home;