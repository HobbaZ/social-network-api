const { populate } = require('../models/Thought');
const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.status(200).json({ message: 'Getting all thoughts...', thoughts}))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single Thought
  getaThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.status(200).json({ message: 'Thought found...', thought})
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((_id) => {
      return Thought.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
      .then((thought) => res.status(200).json({ message: 'Thought created', thought}))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a Thought and associated reactions
  deleteThought(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.status(200).json({ message: 'Thought deleted', thought})
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that id!' })
          : res.status(200).json({ message: 'Thought updated', thought})
          )
      .catch((err) => res.status(500).json(err));
  },
};