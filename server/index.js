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
  let counter = 10;
  const countDown = setInterval(async () => {
    if (counter >= 0) {
      io.emit('timer', { counter });
      counter -= 1;
    } else {
      // io.emit('done');
      clearInterval(countDown);
    }
  }, 1000);

  let totalTime = 70;
  const remainingTime = setInterval(async () => {
    if (totalTime >= 0) {
      io.emit('remainingTime', { totalTime });
      totalTime -= 1;
    } else {
      // io.emit('done');
      clearInterval(remainingTime);
    }
  }, 1000);

  // socket.emit('test', 'this is from the server');
});

io.on('disconnect', socket => {
  socket.removeAllListeners();
});

// app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);

module.exports = app;
