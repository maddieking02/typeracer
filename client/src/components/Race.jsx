import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Race = () => {
  const location = useLocation();
  const [challenge, setChallenge] = useState('');
  const [language, setLanguage] = useState('');
  const [solution, setSolution] = useState('');

  console.log('i cwant to cry', location.state.user);

  const user = location.state.user === 'guest' ? (location.state.user.charAt(0).toUpperCase() + location.state.user.slice(1)) + JSON.stringify(Math.floor(Math.random() * 100) + 1) : location.state.user;

  const getRandomChallenge = () => {
    axios.get('/play')
      .then(res => {
        console.log('success retrieving challenge', res.data);
        setChallenge(res.data[0].challenge);
        setLanguage(res.data[0].language);
        setSolution(res.data[0].solution);
      })
      .catch(err => {
        console.log('error retrieving challege', err);
      });
  };

  useEffect(() => {
    getRandomChallenge();
  }, []);

  return (
    <div>
      <h1>typeracer_</h1>
      <h2>
        Welcome
        {' '}
        {user}
      </h2>
      <div>
        <div>Timer</div>
        <div>WPM</div>
      </div>
      {challenge !== undefined ? <div>{`${challenge}`}</div> : null}
      {language !== undefined ? <div>{`${language}`}</div> : null}
      {solution !== undefined ? <div>{`${solution}`}</div> : null}
    </div>
  );
};

export default Race;