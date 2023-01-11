const mongoose = require('mongoose');
const userSchema = require('./users.js');

const gameSchema = mongoose.Schema({
  isOpen: [{ type: Boolean, default: true }],
  isOver: [{ type: Boolean, default: false }],
  // players: [userSchema],
  startTime: { type: Number },
});

module.exports = mongoose.model('game', gameSchema);