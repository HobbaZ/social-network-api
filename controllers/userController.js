const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.status(200).json({ message: 'Getting all users...', users}))
      .catch((err) => res.status(500).json({message: 'Error finding all users', err}));
  },

  // Get a single user
  getaUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.status(200).json({ message: `Found ${user.username}`, user })
      )
      .catch((err) => res.status(500).json({message: 'Error getting single user', err}));
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(200).json({ message: `User has been created`, user}))
      .catch((err) => res.status(500).json({message: 'Error creating user', err}));
  },

  // Delete a user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } }),
            res.status(200).json({ message: `User and thoughts have been deleted!`})
      )
      .catch((err) => res.status(500).json({message: 'Error deleting user and thoughts', err}));
  },

  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that id!' })
          : res.status(200).json({ message: `${user.username}'s details have been updated`, user})
      )
      .catch((err) => res.status(500).json({message: 'Error updating user', err}));
  },

  //Add friend to user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that id!' })
        : res.status(200).json({ message: `${user.username} has added a friend`, user})
        )
    .catch((err) => res.status(500).json({message: 'Error adding friend', err}));
},

  //Delete friend from user
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that id!' })
        : res.status(200).json({ message: `${user.username} has removed a friend`, user})
        )
    .catch((err) => res.status(500).json({message: 'Error deleting friend', err}));
},
};