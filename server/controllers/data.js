const models = require('../models/data.js');

module.exports = {
  get: (req, res) => {
    // models.get((err, data) => {
    //   if (err) {
    //     console.log('error inside controllers GET');
    //     res.status(400).send();
    //   } else {
    //     console.log('success inside controllers GET');
    //     res.status(200).send(data);
    //   }
    // });
    console.log('ugh');
  },
  post: (req, res) => {
    // models.post((err, data) => {
    //   if (err) {
    //     console.log('error inside controllers POST');
    //     res.status(400).send();
    //   } else {
    //     console.log('success inside controllers POST');
    //     res.status(200).send(data);
    //   }
    // }, req.body);
    console.log('ugh2');
  },
};