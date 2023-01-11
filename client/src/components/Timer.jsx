import React, { useState, useEffect } from 'react';
import socket from '../socketConfig.js';

const Timer = () => {
  const [timer, setTimer] = useState('');

  useEffect(() => {
    // socket.on('timer', data => {
    //   setTimer(data.counter);
    // });
    // socket.on('done', () => {
    //   socket.removeListener('timer');
    // });
    console.log('useEffect timer', timer);
  }, [timer]);

  const handleStart = () => {
    socket.on('timer', data => {
      setTimer(data.counter);
    });
    socket.on('done', () => {
      socket.removeListener('timer');
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
      {timer === 0 ? <h1>Another timer?</h1> : null}
    </div>
  );
};

export default Timer;