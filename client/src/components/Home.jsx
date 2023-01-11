import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/typeracer-logo.png';

const Home = () => {
  const history = useNavigate();

  return (
    <div>
      <h1>typeracer_</h1>
      <img src={logo} alt="" />
      <h1>A typeracing game for programmers.</h1>
      <button type="submit" onClick={() => history.push('/game/create')}>CREATE GAME ></button>
      <button type="submit" onClick={() => history.push('/game/join')}>JOIN GAME ></button>
    </div>
  );
};

export default Home;