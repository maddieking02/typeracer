const router = require('express').Router();
const { data } = require('./controllers');

// console.log('data', data);

router.get('/play', data.get);
// router.get('/play/:id', data.getId);
router.post('/play', data.post);
// router.post('/play/:id', data.postId);

module.exports = router;
