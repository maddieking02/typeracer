import React, { useState, useEffect } from 'react';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Race from './Race.jsx';

const App = () => {
  const [render, setRender] = useState('home');

  const renderPage = () => {
    if (render === 'login') {
      return (
        <div>
          <Login />
        </div>
      );
    } if (render === 'home') {
      return (
        <div>
          <Home />
        </div>
      );
    } if (render === 'race') {
      return (
        <div>
          <Race />
        </div>
      );
    }
  };

  return (
    <div>
      <h1>typeracer_</h1>
      {renderPage()}
    </div>
  );
};

export default App;