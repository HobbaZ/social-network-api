const { Schema, model } = require('mongoose');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 250,
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
  }
);

//Create reactionCount virtual
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;