const router = require('express').Router();
const thoughtsRoutes = require('./thoughts-routes')

router.use(thoughtsRoutes);

module.exports = router;