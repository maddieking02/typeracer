import React, { useState, useEffect } from 'react';
import socket from '../socketConfig.js';
import helperObj from '../helpers.js';

const Timer = ({
  timer, setTimer, remainingTime, setRemainingTime,
}) => {

  // --socket.io implementation
  // useEffect(() => {
  //   console.log('useEffect timer', timer);
  //   console.log('useEffect remaining', remainingTime);
  // }, [timer, remainingTime]);

  // const handleStart = () => {
  //   socket.on('timer', data => {
  //     setTimer(data.counter);
  //   });
  //   socket.on('done', () => {
  //     socket.removeListener('timer');
  //   });
  // };

  // const handleTimeRemaining = () => {
  //   socket.on('remainingTime', data => {
  //     setRemainingTime(data.totalTime);
  //   });
  //   socket.on('done', () => {
  //     socket.removeListener('remainingTime');
  //   });
  // };

  // --react refactor
  const handleStart = () => {
    if (timer === null) {
      setTimer(5);
    }
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    }
    if (timer === 0) {
      setRemainingTime(5);
    }
  };

  const handleTimeRemaining = () => {
    if (remainingTime > 0) {
      setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
    }
  };

  useEffect(() => {
    if (timer !== null) {
      handleStart();
    }
  }, [timer]);

  useEffect(() => {
    if (timer === 0 && remainingTime !== null) {
      handleTimeRemaining();
    }
  }, [remainingTime]);

  return (
    <div id="timer-container">
      <button className="timer-btn" type="button" onClick={() => { handleStart(); }}>Start Game</button>
      {timer !== null && remainingTime === null ? (
        <h1>
          Starting in...
          {' '}
          {timer}
        </h1>
      ) : null}
      {timer === 0 && remainingTime !== 0 ? (
        <h1>
          Time Remaining
          {' '}
          {helperObj.calculateTime(remainingTime)}
        </h1>
      ) : null}
      {timer === 0 && remainingTime === 0 ? <h1>Time Remaining 0:00</h1> : null}
    </div>
  );
};

export default Timer;