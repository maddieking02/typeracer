import React from 'react';

const Login = () => {

  const handleChange = () => {

  };

  const handleSubmit = () => {

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} />
        <label>Password</label>
        <input type="text" name="password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>

      <button type="submit">PLAY AS GUEST</button>
      <button type="submit">CREATE AN ACCOUNT</button>
    </div>
  );
};

export default Login;