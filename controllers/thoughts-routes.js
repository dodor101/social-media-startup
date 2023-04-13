const { Thought, User } = require('../models');

// create a thought route
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.status(200).json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Route to get allThoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    if (!thoughts) {
      res.status(404).json({ message: "Couldn't find thoughts" });
    }
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Route to find a single thought
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!thought) {
      res.status(404).json({ message: `Couldn't find thought with this ID` });
    }
    res.status(200).json(thought);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

// route to update a thought
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate({ _id: req.params.id }, { body: req.body }, { new: true });
    if (!thought) {
      res.status(404).json({ message: `No thought with this ID is found` });
    }
    res.status(200).json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Route for deleting a thought
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.id }, { new: true });
    if (!thought) {
      res.status(404).json({ message: `No thought with this ID is found` });
    }
    res.status(200).json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// exports these functions to be used in a different file.
module.exports = {
  createThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
};
