const db = require('../db/db.js');

module.exports = {
  get: (callback, data) => {
    console.log('I am inside model GET: ', data);

    db.retrieve()
      .then((response) => {
        console.log('GET RESPONSE: ', response);
        callback(null, response);
      })
      .catch((error) => {
        console.log('GET ERROR: ', error);
        callback(null, 'failed to retrieve data');
      });
  },
  post: (callback, data) => {
    console.log('I am inside model POST: ', data);

    db.save(data)
      .then((response) => {
        console.log('POST RESPONSE: ', response);
        callback(null, 'sucessfully added');
      })
      .catch((error) => {
        console.log('POST ERROR: ', error);
        callback(error, 'this word is already in your glossary!');
      });
  },
};