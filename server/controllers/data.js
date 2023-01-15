const models = require('../models/data.js');

module.exports = {
  getChallenge: (req, res) => {
    models.getChallenge((err, data) => {
      if (err) {
        console.log('error inside controllers GET');
        res.status(400).send();
      } else {
        console.log('success inside controllers GET');
        res.status(200).send(data);
      }
    });
  },
  getUserData: (req, res) => {
    // console.log('req inside getUserData', req.query);
    models.getUserData((err, data) => {
      if (err) {
        console.log('error inside getUserData', err);
        res.status(404).send();
      } else {
        console.log('success inside getUserData', data);
        res.status(200).send(data);
      }
    }, req.query);
  },
  postUserData: (req, res) => {
    console.log('req body inside postData', req.body);
    models.postUserData((err, data) => {
      if (err) {
        console.log('error inside controllers POST', err);
        res.status(400).send();
      } else {
        console.log('success inside controllers POST');
        res.status(201).send();
      }
    }, req.body);
  },
  updateUserData: (req, res) => {
    console.log('req inside updateUserData', req.body);
    models.updateUserData((err, data) => {
      if (err) {
        console.log('error inside updateUserData', err);
        res.status(404).send();
      } else {
        console.log('success inside updateUserData', data);
        res.status(200).send(data);
      }
    }, req.body);
  },
};