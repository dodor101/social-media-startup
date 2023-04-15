const router = require('express').Router();
const {
  createThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../controllers/thoughts-routes');

//get all thought
router.get('/', getAllThoughts);

// creating thought
router.post('/', createThought);

// get a thought by it's ID
router.get('/:id', getThoughtById);

// this is to update a thought by ID
router.put('/:id', updateThought);

// route for deleting thought by ID
router.delete('/:id', deleteThought);

// route to create reaction on a thought
router.post('/:id/reactions', createReaction);

// route for deleting reaction
router.delete('/:id/reactions/:reactionId', deleteReaction);

module.exports = router;
