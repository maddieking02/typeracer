/* eslint-disable max-len */
import React from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import user1 from '../assets/typeracer-user1.png';

const Account = () => {
  const {
    firstnameReducer, lastnameReducer, emailReducer, avgWpmReducer, userReducer,
  } = useSelector((state) => state.typeracer);

  const dispatch = useDispatch();
  const avgWpmCopy = avgWpmReducer;

  const calculateAvgWpm = (arr) => {
    return arr.reduce((acc, num) => {
      acc += num;
      return acc;
    }, 0);
  };

  // potential babel issue?
  // const renderLineChart = () => {
  //   return (
  //     <LineChart>
  //       <Line type="monotone" dataKey="uv" stroke="#8884d8" />
  //     </LineChart>
  //   );
  // };

  return (
    <div className="bg home-container">
      <div className="star-field home-inner-container">
        <div className="layer" />
        <div className="layer" />
        <div className="header-container">
          <h1 id="header">
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

        <div id="user-account">
          <img id="account-img" src={user1} alt="" />
          <h2>{`${firstnameReducer}  ${lastnameReducer}`}</h2>
          <div>{emailReducer}</div>
        </div>

        <div id="user-statistics">
          <h1>{`${userReducer}'s Statistics`}</h1>
          {/* {renderLineChart()} */}
          {/* <LineChart width={400} height={400} data={avgWpmCopy}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart> */}
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
