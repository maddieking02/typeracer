const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: Number,
  username: String,
  avg_wpm: Number,
  races: Number,
  currentWordIndex: { type: Number, default: 0 }, // keeps track on word user is on
  socketID: { type: String },
  isPartyLeader: { type: Boolean, default: false }, // every socket has a unique identifier
  wpm: { type: Number, default: -1 },
});

module.exports = mongoose.model('users', userSchema);