/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React from 'react';
// import { LineChart, Line } from 'recharts';
// import recharts, { Line } from 'recharts';
// import recharts from 'recharts';
// import {
//   Line, LineChart, Area, Pie, Treemap, Cell,
// } from 'recharts';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts/es6';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import user1 from '../assets/typeracer-user1.png';

const Account = () => {
  const {
    firstnameReducer, lastnameReducer, emailReducer, avgWpmReducer, userReducer,
  } = useSelector((state) => state.typeracer);

  const location = useLocation();
  const navigate = useNavigate();
  const navHome = () => {
    navigate('/home', { state: { user: location.state.user, avgWpm: location.state.avgWpm } });
  };

  const dispatch = useDispatch();
  const avgWpmCopy = avgWpmReducer;
  const data = avgWpmCopy.reduce((acc, wpm, idx) => {
    const newEntry = {
      name: `R${idx}`,
      value: wpm,
    };
    acc.push(newEntry);
    return acc;
  }, []);

  const calculateAvgWpm = (arr) => {
    return arr.reduce((acc, num) => {
      acc += num;
      return acc;
    }, 0);
  };

  const renderLineChart = (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 50, right: 20, bottom: 5, left: 0,
      }}
    >
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return (
    <div className="bg home-container">
      <div className="star-field home-inner-container">
        <div className="layer" />
        <div className="layer" />
        <div className="header-container">
          <h1 id="header" onClick={() => { navHome(); }}>
            typeracer_
          </h1>
          <h1 id="sidebar-container">
            {/* <h1 id="header" onClick={() => {toggleSidebar()}}>{user}</h1> */}
            {avgWpmCopy.length === 0 ? <h1 id="header">{userReducer}</h1> : (
              <div className="header-wpm">
                <h1 id="header-wpm-v">
                  {userReducer}
                </h1>
                <h4>
                  WPM
                  {' '}
                  {avgWpmCopy.length === 1 ? 0 : Math.round(calculateAvgWpm(avgWpmCopy.slice(1)) / (avgWpmCopy.length - 1))}
                </h4>
              </div>
            )}
          </h1>
        </div>

        <div id="user-account-stats-container">

          <div id="user-account">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white',
              width: 'fit-content',
              height: 'fit-content',
              padding: '2em',
              borderRadius: '50%',
              opacity: '85%',
              margin: '0 0 1em 0',
            }}
            >
              <img
                id="account-img"
                src={user1}
                alt=""
              />
            </div>

            <h2 id="account-fullname">{`${firstnameReducer}  ${lastnameReducer}`}</h2>
            <div id="account-email">{emailReducer}</div>

          </div>

          <div id="user-statistics">
            <h1 id="account-stats">{`${userReducer}'s Races`}</h1>
            {renderLineChart}
          </div>


        </div>


      </div>
    </div>
  );
};

export default Account;


// if playing as guest, show create an account to view statistics
// otherwise
// one page
// user profile image...
// MY PROFILE
// first name last name
// email
// username
// STATISTICS
// graph at the bottom
