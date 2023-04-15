const { User } = require('../models');

// create a user route

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Route to get allUsers

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(404).json({ message: "Couldn't find users" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Route to find a single user

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params._id });
    if (!user) {
      return res.status(404).json({ message: `Couldn't find user with this ID` });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// route to update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: `No user with this ID is found` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Route for deleting a user

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id }, { new: true });
    if (!user) {
      return res.status(404).json({ message: `No user with this ID is found` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// route for add a friend
const createFriend = async (req, res) => {
  try {
    const addFriend = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!addFriend) {
      return res.status(404).json(addFriend);
    }
    res.status(200).json(addFriend);
  } catch (error) {
    res.status(400).json(error);
  }
};
// route for deleting a friend
const deleteFriend = async (req, res) => {
  try {
    const removeFriend = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    if (!removeFriend) {
      res.status(404).json({ message: `Couldn't delete friend` });
      return;
    }
    res.status(200).json(removeFriend);
  } catch (error) {
    res.status(400).json(error);
  }
};

// exports these functions to be used in a different file.
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
};
