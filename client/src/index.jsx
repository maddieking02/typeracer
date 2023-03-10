import { Provider } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { createBrowserHistory } from 'history';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import './assets/styles.css';
import TypeRacer from './components/TypeRacer.jsx';
import CreateAccount from './components/CreateAccount.jsx';
import Account from './components/Account.jsx';
import Settings from './components/Settings.jsx';
import store from './store.js';

const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/race" element={<TypeRacer />} />
        <Route path="/create/account" element={<CreateAccount />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);