import React from 'react';
import logo from '../assets/typeracer-logo.png';

const Home = ({ setRender }) => {
  return (
    <div>
      <img src={logo}></img>
      <h1>A typeracing game for programmers.</h1>
      <button type="submit" onClick={() => {setRender('race')}}>ENTER A TYPING RACE ></button>
    </div>
  );
};

export default Home;