import React, { useState, useEffect } from 'react';
import socket from '../socketConfig.js';

const Timer = () => {
  const [timer, setTimer] = useState({
    count: '',
    msg: '',
  });

  useEffect(() => {
    socket.on('timer', data => {
      setTimer(data);
    });
    socket.on('done', () => {
      socket.removeListener('timer');
    });
  }, []);

  const { count, msg } = timer;

  return (
    <div>
      <h1>{count}</h1>
      <h3>{msg}</h3>
    </div>
  );
};

export default Timer;