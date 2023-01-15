import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import axios from 'axios';
import {
  updateFirstname, updateLastname, updateEmail, updateWPM, updateUser, updatePassword,
} from '../reducer.js';
import socket from '../socketConfig.js';

const Login = () => {
  const [user, setUser] = useState('');
  const [path, setPath] = useState('');
  const [avgWpm, setAvgWpm] = useState([]);
  // --redux states
  const { avgWpmReducer, userReducer, passwordReducer } = useSelector((state) => state.typeracer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    // socket.on('disconnect', () => {
    //   console.log('socket has been disconnected');
    // });
    if (user.length > 0 && path.length > 0) {
      navigate(`${path}`, { state: { user, path, avgWpm } }); // cannot pass function?
    }
  }, [user, path, avgWpm]);

  const routeChange = (e) => {
    console.log(e.target.name);
    setUser(e.target.name);
    setPath(e.target.name === 'guest' ? '/home' : '/create/account');
  };

  // const handleChange = () => {

  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    console.log('username', username.value, 'password', password.value);
    const userInfo = {
      username: username.value,
      password: password.value,
    };
    axios.get(`/home/${username.value}`, { params: userInfo })
      .then(res => {
        console.log('success inside axios get user', res.data);
        setUser(res.data[0].username);
        setPath('/home');
        setAvgWpm(res.data[0].wpm);
        dispatch(updateFirstname(res.data[0].firstname));
        dispatch(updateLastname(res.data[0].lastname));
        dispatch(updateEmail(res.data[0].email));
        dispatch(updateUser(res.data[0].username));
        dispatch(updatePassword(res.data[0].password));
        dispatch(updateWPM(res.data[0].wpm));
      })
      .catch(err => {
        console.log('error inside axios get user', err);
      });

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
          <input id="login-input" type="text" name="username" />
          <label id="login-label">Password</label>
          <input id="login-input" type="password" name="password" />
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
