const router = require('express').Router();
const { getThoughts } = require('../controllers/thougthts-routes');

router.get('/', getThoughts);

module.exports = router;
