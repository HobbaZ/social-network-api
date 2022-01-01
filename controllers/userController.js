const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.status(200).json({ message: 'Getting all users...', users}))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user
  getaUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.status(200).json({ message: 'Found user...', user })
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(200).json({ message: 'Creating user', user}))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      /*.then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          //: res.status(200).json({ message: 'User deleted', user})
      //)
          : User.findOneAndUpdate(
            { _id: req.body.userId },
            { $pull: { thoughts: _Id } },
            { new: true }
          )
        )*/
      .then((user) => res.status(200).json({ message: 'user deleted', user}))
      .catch((err) => res.status(500).json(err));
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
          : res.status(200).json({ message: 'User updated', user})
      )
      .catch((err) => res.status(500).json(err));
  },

  //Add friend to user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No friend with that id!' })
        : res.status(200).json({ message: `Friend added`, user})
        )
    .catch((err) => res.status(500).json(err));
},

  //Delete friend from user
  deleteFriend(req, res) {
    User.findOneAndRemove(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No friend with that id!' })
        : res.status(200).json({ message: 'Friend deleted', user})
        )
    .catch((err) => res.status(500).json(err));
},
};