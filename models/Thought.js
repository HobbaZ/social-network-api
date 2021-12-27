const { Schema, model } = require('mongoose');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      //need to add getter method to format date
    },
    username: {
        type: String,
        required: true,
      },

    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

//Create reactionCount virtual
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return `${this.reactions.length}`;
  });

// Schema to create a reaction subdocument
const reactionSchema = new Schema(
  {

    reactionId: {
      type: String,
      default: ObjectId,
    },

    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
        type: String,
        required: true,
      },
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;