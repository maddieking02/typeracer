import React, { useState, useEffect } from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import history from './history';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Race from './Race.jsx';

const App = () => {
  // const [render, setRender] = useState('home');

  // const renderPage = () => {
  //   if (render === 'login') {
  //     return (
  //       <div>
  //         <Login />
  //       </div>
  //     );
  //   } if (render === 'home') {
  //     return (
  //       <div>
  //         <Home setRender={setRender} />
  //       </div>
  //     );
  //   } if (render === 'race') {
  //     return (
  //       <div>
  //         <Race />
  //       </div>
  //     );
  //   }
  // };

  return (
    <div>
      <h1>typeracer_</h1>
    </div>
  );
};

export default App;