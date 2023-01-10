const router = require('express').Router();
const { data } = require('./controllers');

// console.log('data', data);

router.get('/play', data.get);
router.get('/play/:id', data.get);
router.post('/play', data.post);
router.post('/play/:id', data.get);

module.exports = router;
