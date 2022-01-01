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
    .then(newThought => {
      User.findOneAndUpdate(
        //Push thought id string to thoughts array
        { _id: req.body.userId }, 
        { $push: { thoughts: newThought._id } },
        { new: true }
      )
      .then((thought) => 
      !thought
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.status(200).json({ message: 'Thought created', thought})
      )
      .catch((err) => res.status(500).json(err));
  })
},

  // Delete a Thought and associated reactions
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
    Thought.deleteMany({reactions: { reactionId: req.body.thoughtId}})
      .then(newThought => {
        User.findOneAndUpdate(
          //Remove thought from thoughts array by thought ID string
          { _id: req.params.thoughtId }, 
          { $pull: { thoughts: _id } },
          { new: true }
        )
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.status(200).json({ message: 'Thought Deleted', thought})
        )
        .catch((err) => res.status(500).json(err));
    })
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
          : res.status(200).json({ message: `${thought.username} edited '${thought.thoughtText}' thought`, thought})
          )
      .catch((err) => res.status(500).json(err));
  },

  //Add reaction to thought
  addReaction(req, res) {
      Thought.findOneAndUpdate(
        //add reactions to thought
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that id!' })
          : res.status(200).json({ message: `${thought.username} added a reaction to ${thought.thoughtText}`, thought})
          )
      .catch((err) => res.status(500).json(err));
  },

  //Delete reaction from thought
  deleteReaction(req, res) {
      Thought.findOneAndUpdate({ _id: req.params.thoughtId },
          { _id: req.body.reactionId },
          { $pull: { reactions: { reactionId: _id } } },
          { new: true }
    )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that id!' })
        : res.status(200).json({ message: 'Reaction deleted', thought})
        )
    .catch((err) => res.status(500).json(err));
},

};