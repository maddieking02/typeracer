const router = require('express').Router();
const path = require('path');
const { data } = require('./controllers');

// console.log('data', data);
const client = path.join(__dirname, '../client/dist/index.html');
const sendPage = (req, res) => {
  res.sendFile(client);
};

router.get('/login', sendPage);
router.get('/home', sendPage);
router.get('/race', sendPage);
router.get('/play', data.get);
// router.get('/play/:id', data.getId);
// router.post('/play', data.post);
// router.post('/play/:id', data.postId);

module.exports = router;
