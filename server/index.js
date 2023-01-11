require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const socketio = require('socket.io');
const router = require('./router.js');

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
router.use(cors());
app.use(morgan('dev'));
app.use(router);
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
// app.set('port', PORT);

// app.listen(app.get('port'), () => {
//   console.log(`Listening on http://localhost:${app.get('port')}`);
// });
const io = socketio(app.listen(process.env.PORT));
io.on('connection', socket => {

  // socket.on('timer', async () => {
  //   let count = 5;
  //   const startTimer = setInterval(async () => {
  //     if (count >= 0) {
  //       io.emit('timer', { count, msg: 'Starting Game' });
  //       count -= 1;
  //     } else {
  //       clearInterval();
  //     }
  //   });
  // }, 1000);
  // socket.emit('timer', async () => {
  //   let count = 5;
  //   const startTimer = setInterval(async () => {
  //     if (count >= 0) {
  //       socket.emit('timer', { count, msg: 'start game' });
  //       count -= 1;
  //     }
  //   });
  // }, 1000);
  let counter = 10;
  const countDown = setInterval(async () => {
    if (counter >= 0) {
      io.emit('timer', { counter });
      counter -= 1;
    } else {
      clearInterval(countDown);
    }
  }, 1000);

  socket.emit('test', 'this is from the server');
});

// app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);

module.exports = app;
