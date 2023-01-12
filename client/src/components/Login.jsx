import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import socket from '../socketConfig.js';

const Login = () => {
  const [user, setUser] = useState('');
  const [path, setPath] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // socket.on('disconnect', () => {
    //   console.log('socket has been disconnected');
    // });

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
    <div className="bg login-container">
      <div className="star-field login-inner-container">
        <div className="layer" />
        <div className="layer" />
        <div className="header-container">
          <h1 id="header">
            typeracer_
          </h1>
          <h1 id="header">
            {}
          </h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label id="login-label">Username</label>
          <input id="login-input" type="text" name="username" onChange={handleChange} />
          <label id="login-label">Password</label>
          <input id="login-input" type="text" name="password" onChange={handleChange} />
          <button className="btn1 login-btn1" type="submit">Login</button>
        </form>

        <div id="login-btn-container">
          <button className="btn1 login-btn1" type="button" name="guest" value="guest" onClick={(e) => { routeChange(e); }}>PLAY AS GUEST</button>
          <button className="btn1 login-btn1" type="button" name="newUser" onClick={(e) => { routeChange(e); }}>CREATE AN ACCOUNT</button>
        </div>

      </div>
    </div>

  );
};

export default Login;
