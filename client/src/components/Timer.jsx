import React, { useState, useEffect } from 'react';
import socket from '../socketConfig.js';
import helperObj from '../helpers.js';

const Timer = () => {
  const [timer, setTimer] = useState('');
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    console.log('useEffect timer', timer);
    console.log('useEffect remaining', remainingTime);
  }, [timer, remainingTime]);

  const handleStart = () => {
    socket.on('timer', data => {
      setTimer(data.counter);
    });
    socket.on('done', () => {
      socket.removeListener('timer');
    });
  };

  const handleTimeRemaining = () => {
    socket.on('remainingTime', data => {
      setRemainingTime(data.totalTime);
    });
    socket.on('done', () => {
      socket.removeListener('remainingTime');
    });
  };

  return (
    <div>
      <button type="button" onClick={() => { handleStart(); }}>Start Game</button>
      {timer !== 0 && timer !== '' ? (
        <h1>
          Starting in...
          {' '}
          {timer}
        </h1>
      ) : null}
      {timer === 0 ? handleTimeRemaining() : null}
      {timer === 0 && remainingTime !== '' ? (
        <h1>
          Time Remaining
          {' '}
          {helperObj.calculateTime(remainingTime)}
        </h1>
      ) : null}
    </div>
  );
};

export default Timer;