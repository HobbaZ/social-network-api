const router = require('express').Router();
const {
  createThought,
  getThoughts,
  getaThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

//Get a user 
router.route('/').get(getThoughts).post(createThought);

//Get all users
router.route('/').get(getThoughts)

//Get a thought
router.route('/:thoughtId').get(getaThought);

//Delete a thought
router.route('/:thoughtId').delete(deleteThought);

//Update a thought
router.route('/:thoughtId').put(updateThought);

//Add reaction to thought
router.route('/:thoughtId/reactions').post(addReaction);

//Delete reaction from thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;