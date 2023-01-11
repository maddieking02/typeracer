const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
  id: Number,
  challenge: String,
  language: String,
  solution: String,
});

module.exports = mongoose.model('challenges', challengeSchema);
