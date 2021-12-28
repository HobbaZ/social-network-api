const router = require('express').Router();
const {
  createThought,
  getThoughts,
  getaThought,
  updateThought,
  deleteThought,
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
router.route('/:thoughtId/reactions').post(getaThought);

//Delete reaction from thought
router.route('/:thoughtId/reactions').delete(getaThought);

module.exports = router;