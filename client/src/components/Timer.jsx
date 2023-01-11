import React, { useState, useEffect } from 'react';
import socket from '../socketConfig.js';

const Timer = () => {
  const [timer, setTimer] = useState('');

  useEffect(() => {
    socket.on('timer', data => {
      setTimer(data.counter);
    });
    socket.on('done', () => {
      socket.removeListener('timer');
    });
  }, [timer]);

  return (
    <div>
      {timer !== 0 ? (
        <h1>
          Starting in...
          {' '}
          {timer}
        </h1>
      ) : <h1>Start</h1>}
    </div>
  );
};

export default Timer;