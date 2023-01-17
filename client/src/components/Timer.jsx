import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateWPM, updateUser, updatePassword } from '../reducer.js';
import socket from '../socketConfig.js';
import helperObj from '../helpers.js';

const Timer = ({
  timer, setTimer, remainingTime, setRemainingTime, typed, setWpm,
}) => {
  // --redux states
  const { avgWpmReducer, userReducer, passwordReducer } = useSelector((state) => state.typeracer);
  const dispatch = useDispatch();

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
      setRemainingTime(30);
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
    if (timer === 0 && remainingTime === 0) {
      // console.log('MASSIVE ENEREGY typed prop', typed, 'CALculation', );
      setWpm(helperObj.calculateWPM(typed.split('').length));
      // console.log('this is REDUX STATES WOOOOO', userReducer, passwordReducer, 'AVG WPM', avgWpmReducer);
      // TO POST: need username & password..
      const newEntryWpm = helperObj.calculateWPM(typed.split('').length);

      const userInfo1 = {
        username: userReducer,
        password: passwordReducer,
        avgWpm: avgWpmReducer,
        newEntry: newEntryWpm,
      };
      const userInfo2 = {
        username: userReducer,
        password: passwordReducer,
      };
      axios.put(`/home/${userReducer}`, userInfo1)
        .then(postres => {
          console.log('success inside axios get user', postres.data);
          // axios.get(`/home/${userReducer}`, userInfo2)
          //   .then(getres => {
          //     dispatch(updateWPM(getres.data[0].wpm));
          //   });
        })
        .catch(err => {
          console.log('err inside axios post user', err);
        });
      // console.log('why is my axios not working: ', userReducer, userInfo)
    }
  }, [remainingTime]);

  // {typeof remainingTime === 'object' || remainingTime === 0 ? helperObj.calculateWPM(typed.split('').length) : 0}

  return (
    <div id="timer-container">
      <button className="btn1" type="button" onClick={() => { handleStart(); }}>Start Game</button>
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