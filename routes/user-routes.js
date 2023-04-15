const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require('../controllers/user-routes');

// route for creating a user
router.post('/', createUser);

// route for getting all users
router.get('/', getAllUsers);

// route for getting a single user
router.get('/:id', getUserById);

// route for updating a user
router.put('/:id', updateUser);

// route for delete a single user
router.delete('/:id', deleteUser);

// handling friends
router.route('/:id/friends/:friendId').post(createFriend).delete(deleteFriend);

module.exports = router;
