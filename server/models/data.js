const db = require('../db/pgdb.js');

module.exports = {
  get: (callback, data) => {
    const count = Math.floor(Math.random() * 10) + 1;
    console.log('I am inside model GET: ', data);

    db.query(`SELECT * FROM challenges WHERE id=${count}`, (err, res) => {
      callback(err, res.rows);
    });
  },
  post: (callback, data) => {
    console.log('I am inside model POST: ', data);

  },
};