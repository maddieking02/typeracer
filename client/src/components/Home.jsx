import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/typeracer-logo.png';

const Home = () => {
  const location = useLocation();
  // location.state.user
  console.log('THIS IS LLOCATION?????????', location.state.user);

  const navigate = useNavigate();
  const routeChange = (e) => {
    console.log(e.target.name)
    const path = e.target.name;
    navigate(`${path}`);
  }

  return (
    <div>
      <h1>typeracer_</h1>
      {/* <h2>{location.state.user}</h2> */}
      <img src={logo} alt="" />
      <h1>A typeracing game for programmers.</h1>
      <button type="button" name="/game/create" onClick={(e) => {routeChange(e)}}>CREATE GAME ></button>
      <button type="button" name="/game/join" onClick={(e) => {routeChange(e)}}>JOIN GAME ></button>
      <button type="button" name="/race" onClick={(e) => {routeChange(e)}}>START RACING ></button>
    </div>
  );
};

export default Home;