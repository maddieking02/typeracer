const db = require('../db/pgdb.js');

module.exports = {
  getChallenge: (callback, data) => {
    const count = Math.floor(Math.random() * 10) + 1;
    console.log('I am inside model GET: ', data);

    db.query(`SELECT * FROM challenges WHERE id=${count}`, (err, res) => {
      callback(err, res.rows);
    });
  },
  getUserData: (callback, { username, password }) => {
    // console.log('models userdata', username, password);
    db.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`, (err, res) => {
      callback(err, res.rows);
    });
  },
  postUserData: (callback, {
    firstname, lastname, email, newuser, newpassword,
  }) => {
    console.log('I am inside model POST: ');
    db.query(`INSERT INTO users(username, password, firstname, lastname, email, wpm) VALUES ('${newuser}', '${newpassword}', '${firstname}', '${lastname}', '${email}', '${JSON.stringify([0])}')`, (err, res) => {
      callback(err, res);
    });
  },
};