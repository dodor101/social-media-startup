const router = require('express').Router();
const thoughtsRoutes = require('./thoughts-routes');
const userRoutes = require('./user-routes');

router.use('/thought', thoughtsRoutes);
router.use('/user', userRoutes);

module.exports = router;
