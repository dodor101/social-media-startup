const { Thought, User } = require('../models');

// create a thought route
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { runValidators: true, new: true }
    );

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
    const thought = await Thought.findOne({ _id: req.params.id });

    if (!thought) {
      return res.status(404).json({ message: `Couldn't find thought with this ID` });
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
    const thought = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: `Could not update thought` });
    }
    res.status(200).json(thought);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// Route for deleting a thought
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.id }, { new: true });

    if (!thought) {
      res.status(404).json({ message: `No thought with this ID is found` });
    } else {
      const user = await User.findOneAndUpdate(
        { thoughts: { $elemMatch: { $eq: thought._id } } },
        { $pull: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
    }
    res.status(200).json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// function for creating a reaction
const createReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v');

    if (!thought) {
      return res.status(404).json({ message: `Thought not found with this ID` });
    }
    res.status(200).json(thought);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: `The is no thought with this ID` });
    }
    res.status(200).json(thought);
  } catch (error) {
    console.log(error);
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
  createReaction,
  deleteReaction,
};
