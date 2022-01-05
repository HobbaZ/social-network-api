const { populate } = require('../models/Thought');
const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.status(200).json({ message: 'Getting all thoughts...', thoughts}))
      .catch((err) => res.status(500).json({message: 'Error finding all thoughts', err}));
  },
  // Get a single Thought
  getaThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.status(200).json({ message: `Found ${thought.username}'s thought`, thought})
      )
      .catch((err) => res.status(500).json({message: 'Error finding single thought', err}));
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
          : res.status(200).json({ message: `${thought.username} created a thought`, thought})
      )
      .catch((err) => res.status(500).json({message: 'Error creating a thought', err}));
  })
},

  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((removeThought) => 
        ! removeThought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : User.findOneAndUpdate(
          //Remove thought from thoughts array by thought ID string
          { thoughts: req.params.thoughtId },  
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        )
      )
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.status(200).json({ message: 'Thought Deleted', thought})
        )
        .catch((err) => res.status(500).json({message: 'Error deleting a thought', err}));
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
          : res.status(200).json({ message: `${thought.username} edited ${thought.thoughtText} thought`, thought})
          )
      .catch((err) => res.status(500).json({message: 'Error updating thought', err}));
  },

  //Add reaction to thought
  addReaction(req, res) {
      Thought.findOneAndUpdate(
        //add reaction to thought
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that id!' })
          : res.status(200).json({ message: `${thought.username} added a reaction to ${thought.thoughtText}`, thought})
          )
      .catch((err) => res.status(500).json({message: 'Error adding reaction to thought', err}));
  },

  //Delete reaction from thought
  deleteReaction(req, res) {
      Thought.findOneAndUpdate( 
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { new: true }
    )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that id!' })
        : res.status(200).json({ message: `Reaction deleted!`, thought})
        )
    .catch((err) => res.status(500).json({message: 'Error deleting reaction from thought', err}));
},
};