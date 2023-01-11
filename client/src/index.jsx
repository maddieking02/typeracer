import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { createBrowserHistory } from 'history';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Race from './components/Race.jsx';
const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter history={history}>
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/race" element={<Race />} />
    </Routes>
  </BrowserRouter>,
);