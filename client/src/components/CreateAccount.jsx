import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccount = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, newuser, newpassword } = e.target;

    console.log(firstname.value, lastname.value, email.value, newuser.value, newpassword.value);

    const newUserAccount = {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      newuser: newuser.value,
      newpassword: newpassword.value,
    };

    axios.post('/create/account', newUserAccount)
      .then(res => {
        console.log('success inside axios get user', res.data);
      })
      .catch(err => {
        console.log('error inside axios get user', err);
      });
  };

  return (
    <div>
      <form className="account-form" onSubmit={handleSubmit}>
        <label id="account-label">First Name</label>
        <input id="account-input" type="text" name="firstname" />
        <label id="account-label">Last Name</label>
        <input id="account-input" type="text" name="lastname" />

        <label id="account-label">Email</label>
        <input id="account-input" type="text" name="email" />

        <label id="account-label">Create a username</label>
        <input id="account-input" type="text" name="newuser" />

        <label id="account-label">Create a password</label>
        <input id="account-input" type="text" name="newpassword" />

        <button className="btn1 account-btn1" type="submit">CREATE ACCOUNT</button>
      </form>
    </div>
  );
};

export default CreateAccount;