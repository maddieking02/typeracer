import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socketConfig.js';

const Login = () => {
  const [user, setUser] = useState('');
  const [path, setPath] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('test', msg => {
      console.log(msg);
    });

    if (user.length > 0 && path.length > 0) {
      navigate(`${path}`, { state: { user, path } }); // cannot pass function?
    }
  }, [user, path]);

  const routeChange = (e) => {
    console.log(e.target.name);
    setUser(e.target.name);
    setPath(e.target.name === 'guest' ? '/home' : '/create/account');
  };

  const handleChange = () => {

  };

  const handleSubmit = () => {

  };

  return (
    <div>
      <h1>typeracer_</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} />
        <label>Password</label>
        <input type="text" name="password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>

      <button type="button" name="guest" value="guest" onClick={(e) => { routeChange(e); }}>PLAY AS GUEST</button>
      <button type="button" name="newUser" onClick={(e) => { routeChange(e); }}>CREATE AN ACCOUNT</button>
    </div>
  );
};

export default Login;
