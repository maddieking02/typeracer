/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FcRefresh } from 'react-icons/fc';
import ProgressBar from 'react-bootstrap/ProgressBar';
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
  const { avgWpmReducer, userReducer, passwordReducer } = useSelector((state) => state.typeracer);
  const dispatch = useDispatch();
  const user = location.state.user === 'guest' ? (location.state.user.charAt(0).toUpperCase() + location.state.user.slice(1)) + JSON.stringify(Math.floor(Math.random() * 100) + 1) : location.state.user;

  const navigate = useNavigate();
  const navHome = () => {
    navigate('/home', { state: { user, avgWpm: location.state.avgWpm } });
  };

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

  const refreshPage = () => {
    getRandomChallenge();
    // navigate(0);
    setTyped('');
    setUserInput('');
    setWpm(0);
    setTimer(null);
    setRemainingTime(null);
  };

  const resetForm = () => {
    setUserInput('');
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const lastChar = value.charAt(value.length - 1);
    if (lastChar === ' ') {
      // socket.emit('userInput', userInput);
      resetForm();
    } else {
      setUserInput(value);
    }
  };

  // console.log('userInput', userInput, 'solution', solution.split(' '));
  // match current user input with first word that has not been typed
  // solution = words to be typed
  const updateToBeTyped = async () => {
    if (toBeTyped.split(' ')[0] === userInput) {
      // console.log('MATCH', toBeTyped);
      const trim = toBeTyped.split(' ').slice(1);
      // console.log('trim', trim);
      await setToBeTyped(trim.join(' '));
      const words = `${typed} ${userInput}`; // [typed, ...userInput]
      await setTyped(words);
    }
  };

  const updateTyped = async () => { // func to find typed words
    // compare two strings?
    // console.log('this is solution:::', solution);
    // console.log('next index toBeTyped:::', solution.indexOf(toBeTyped.split(' ')[0])); // ISSUE
    // console.log('next word toBeTyped:::', toBeTyped.split(' ')[0]);
    // const typedWords = solution.substring(0, solution.indexOf(toBeTyped.split(' ')[0]));
    // we have a solution prompt
    // we have words that have yet to be typed

    // console.log('FINAL words that have already been typed::: ', typedWords);
    // await setTyped(typedWords);
  };

  useEffect(() => {
    updateToBeTyped();
  }, [userInput]);

  // useEffect(() => {
  //   updateTyped();
  //   // console.log('this should update each time a user submits an input', updateTyped());
  // }, [typed, toBeTyped]);

  // useEffect(() => {
  // }, typed);

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

  useEffect(() => {

  }, [avgWpmReducer]);

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
            {avgWpmReducer.length === 0 ? <h1 id="header">{user}</h1> : (
              <div className="header-wpm">
                <h1 id="header-wpm-v">
                  {user}
                </h1>
                <h4>
                  WPM
                  {' '}
                  {avgWpmReducer.length === 1 ? 0 : Math.round(calculateAvgWpm(avgWpmReducer.slice(1)) / (avgWpmReducer.length - 1))}
                </h4>
              </div>
            )}
          </h1>

        </div>

        <div id="timer-wpm-container">
          <Timer timer={timer} setTimer={setTimer} remainingTime={remainingTime} setRemainingTime={setRemainingTime} typed={typed} setWpm={setWpm} />
          <div style={{ margin: '0.5em 0 1em 0', fontSize: '30px' }}>
            WPM
            {' '}
            {typeof remainingTime === 'object' || remainingTime === 0 ? helperObj.calculateWPM(typed.split('').length) : 0}
            {/* {console.log('NEED WPM TO UPDATE HERE PLS: ', wpm)} */}
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
        }}
        >
          <button type="button" className="btn1" onClick={() => { refreshPage(); }}>
            <FcRefresh style={{
              fontSize: '1em',
            }}
            />
            {/* New Challenge */}
          </button>
          <ProgressBar
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '75%',
              color: 'grey',
              backgroundColor: 'rgba(72, 72, 72, 0.7)',
              borderRadius: '6px',
              overflow: 'hidden',
              transition: 'all 0.10s',
              willChange: 'transform',
            }}
          >
            <ProgressBar
              style={{
                width: `${typed.length === 1 ? 0 : Math.round(((typed.length / solution.length) * 100.0))}%`,
                color: 'grey',
                backgroundColor: 'rgba(0, 255, 255, 0.9)',
                borderRadius: 'inherit',
                textAlign: 'center',
              }}
              variant="progress-bar"
              now={typed.length === 1 ? 0 : Math.round(((typed.length / solution.length) * 100.0))}
              label={`${typed.length === 1 ? 0 : Math.round(((typed.length / solution.length) * 100.0))}%`}
            />
          </ProgressBar>
        </div>

        <div id="challenge-container">
          {challenge !== undefined ? <div>{`Title: ${challenge}`}</div> : null}
          {language !== undefined ? <div style={{ marginBottom: '1.5em' }}>{`Language: ${language}`}</div> : null}
          {toBeTyped !== undefined ? (
            <div style={{ border: '3px solid rgba(255, 255, 255, 0.35)', padding: '1em' }}>
              <span style={{ color: 'cyan' }}>{`${typed} `}</span>
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