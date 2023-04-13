const router = require('express').Router();
const {
  createThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
} = require('../controllers/thoughts-routes');

//get all thought
router.get('/', getAllThoughts);

// creating thought
router.post('/', createThought);

// get a thought by it's ID
router.get('/:id', getThoughtById);

module.exports = router;
