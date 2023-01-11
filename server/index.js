require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
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
app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);

module.exports = app;
