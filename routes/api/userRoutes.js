const router = require('express').Router();
const {
  createUser,
  getUsers,
  getaUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

//Get all users
router.route('/').get(getUsers).post(createUser);

//Get a single user
router.route('/:userId').get(getaUser);

//Delete a user
router.route('/:userId').delete(deleteUser);

//Update a user
router.route('/:userId').put(updateUser);

//Add friend to user friend list
router.route('/:userId/friends/:friendId').post(getaUser);

//Delete friend from user friend list
router.route('/:userId/friends/:friendId').delete(getaUser);

module.exports = router;