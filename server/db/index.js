const cluster = require('cluster');

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const DB_NAME = process.env.DB_NAME || 'typeracer';
const DB_URL = `mongodb://localhost/${DB_NAME}`;

mongoose.connect(DB_URL)
  .catch(() => {
    console.error(`Worker ${cluster.worker.process.pid} failed to connect to MongoDB`);
    cluster.worker.kill();
  });

module.exports.challenges = require('./challenges.js');
module.exports.users = require('./users.js');
module.exports.game = require('./game.js');