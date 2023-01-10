import React from 'react';
import logo from '../assets/typeracer-logo.png';

const Home = () => {
  return (
    <div>
      <img src={logo}></img>
      <h1>A typeracing game for programmers.</h1>
      <button type="submit">ENTER A TYPING RACE ></button>
    </div>
  );
};

export default Home;