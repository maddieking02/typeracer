/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FcRefresh } from 'react-icons/fc';
import Timer from './Timer.jsx';
import socket from '../socketConfig.js';
import helperObj from '../helpers.js';
import { updateWPM, updateUser } from '../reducer.js';

const TypeRacer = () => {
  const location = useLocation();
  const [challenge, setChallenge] = useState('');
  const [language, setLanguage] = useState('');
  const [solution, setSolution] = useState('');
  const [toBeTyped, setToBeTyped] = useState('');
  const [typed, setTyped] = useState('');
  const [userInput, setUserInput] = useState('');
  const [wpm, setWpm] = useState(0);
  const textInput = useRef(null);
  // --timer states
  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  // --redux states
  // const { rWpm, rUser } = useSelector((state) => state.typeracer);
  // const dispatch = useDispatch();

  // STOPPING POINT >>>HERE<<<
  // console.log('check redux state', rWpm, rUser);
  // post to store in database
  // dispatch(updateWPM(30));
  // refactor login GET to update redux state instead of react useState

  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
    // get request and re-update reducer states
  };
  const navHome = () => {
    navigate('/home', { state: { user, avgWpm: location.state.avgWpm } });
  };

  // console.log('i cwant to cry', location);

  const user = location.state.user === 'guest' ? (location.state.user.charAt(0).toUpperCase() + location.state.user.slice(1)) + JSON.stringify(Math.floor(Math.random() * 100) + 1) : location.state.user;

  const getRandomChallenge = () => {
    axios.get('/play')
      .then(res => {
        console.log('success retrieving challenge', res.data);
        setChallenge(res.data[0].challenge);
        setLanguage(res.data[0].language);
        setSolution(res.data[0].solution);
        setToBeTyped(res.data[0].solution);
      })
      .catch(err => {
        console.log('error retrieving challege', err);
      });
  };

  const postResults = () => {
    axios.post('/play')
      .then(res => {

      });
  };

  const resetForm = () => {
    setUserInput('');
  };

  const handleFormChange = (e) => { // takes input and handles spaces
    e.preventDefault();
    const { value } = e.target;
    const lastChar = value.charAt(value.length - 1); // last char that user typed out
    if (lastChar === ' ') {
      socket.emit('userInput', userInput);
      resetForm();
    } else {
      setUserInput(value);
    }
  };

  // console.log('userInput', userInput, 'solution', solution.split(' '));
  // match current user input with first word that has not been typed
  // solution = words to be typed
  const updateToBeTyped = () => {
    if (toBeTyped.split(' ')[0] === userInput) {
      console.log('MATCH', toBeTyped);
      const trim = toBeTyped.split(' ').slice(1);
      console.log('trim', trim);
      setToBeTyped(trim.join(' '));
    }
  };

  const updateTyped = () => { // func to find typed words
    // compare two strings?
    // console.log('this is solution:::', solution);
    // console.log('next word toBeTyped:::', toBeTyped.split(' ')[0]);
    const typedWords = solution.substring(0, solution.indexOf(toBeTyped.split(' ')[0]));
    // console.log('FINAL words that have already been typed::: ', typedWords);
    setTyped(typedWords);
  };

  useEffect(() => {
    updateToBeTyped();
  }, [userInput]);

  useEffect(() => {
    console.log('this should update each time a user submits an input', updateTyped());
  }, [toBeTyped, typed]);

  useEffect(() => {
    getRandomChallenge();
    textInput.current.focus();
  }, []);

  const calculateAvgWpm = (arr) => {
    return arr.reduce((acc, num) => {
      acc += num;
      return acc;
    }, 0);
  };

  return (
    <div className="bg typeracer-container">
      <div className="star-field typeracer-inner-container">
        <div className="layer" />
        <div className="layer" />

        <div className="header-container">
          <h1 id="header" onClick={() => { navHome(); }}>
            typeracer_
          </h1>
          {/* <h1 id="header">
            {user}
          </h1> */}
          <h1 id="sidebar-container">
            {/* <h1 id="header" onClick={() => {toggleSidebar()}}>{user}</h1> */}
            {location.state.avgWpm.length === 0 ? <h1 id="header">{user}</h1> : (
              <div className="header-wpm">
                <h1 id="header-wpm-v">
                  {user}
                </h1>
                <h4>
                  WPM
                  {' '}
                  {calculateAvgWpm(location.state.avgWpm) / location.state.avgWpm.length}
                </h4>
              </div>
            )}
          </h1>

        </div>


        <button type="button" className="btn1" onClick={() => { refreshPage(); }}>
          <FcRefresh style={{ fontSize: '1em', marginRight: '0.5em' }} />
          New Challenge
        </button>
        <div id="timer-wpm-container">
          <Timer timer={timer} setTimer={setTimer} remainingTime={remainingTime} setRemainingTime={setRemainingTime} typed={typed} setWpm={setWpm} />
          <div style={{ margin: '0.5em 0 1em 0' }}>
            WPM
            {' '}
            {typeof remainingTime === 'object' || remainingTime === 0 ? helperObj.calculateWPM(typed.split('').length) : 0}
            {console.log('NEED WPM TO UPDATE HERE PLS: ', wpm)}
          </div>
        </div>
        <div id="challenge-container">
          {challenge !== undefined ? <div>{`Title: ${challenge}`}</div> : null}
          {language !== undefined ? <div style={{ marginBottom: '1.5em' }}>{`Language: ${language}`}</div> : null}
          {typed !== undefined && toBeTyped !== undefined ? (
            <div style={{ border: '3px solid rgba(255, 255, 255, 0.35)', padding: '1em' }}>
              <span style={{ color: 'cyan' }}>{`${typed}`}</span>
              {`${toBeTyped}`}
            </div>
          ) : null}
        </div>

        <form>
          <div>
            <input id="typeracer-input" type="text" disabled={!!(typeof remainingTime === 'object' || remainingTime === 0)} onChange={(e) => { handleFormChange(e); }} value={userInput} ref={textInput} />
          </div>
        </form>

      </div>
    </div>
  );
};

export default TypeRacer;