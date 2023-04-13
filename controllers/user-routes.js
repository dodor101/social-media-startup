const Router = require('express').Router();
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
    const users = await User.find({})
      .populate({ path: 'thoughts', select: '-__v' })
      // populate user friends
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v');
    if (!users) {
      res.status(404).json({ message: "Couldn't find users" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Route to find a single user

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v');

    if (!user) {
      res.status(404).json({ message: `Couldn't find user with this ID` });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// route to update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, { body: req.body }, { new: true });
    if (!user) {
      res.status(404).json({ message: `No user with this ID is found` });
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
      res.status(404).json({ message: `No user with this ID is found` });
    }
    res.status(200).json(user);
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
};
