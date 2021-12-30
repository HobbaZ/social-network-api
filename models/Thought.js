const { Schema, model, Types } = require('mongoose');

function convertDate(createdAt) {
  today = new Date(createdAt)
  return today.toDateString();
}

// Schema to create a reaction subdocument
const reactionSchema = new Schema(
  {

    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: convertDate,
    },
    username: {
        type: String,
        required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  });

// Schema to create a thought model
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
      get: convertDate,

      //need to add getter method to format date
    },
    username: {
        type: String,
        required: true,
    },

    reactions: [ reactionSchema ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  });

//Create reactionCount virtual
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return `${this.reactions.length}`;
  });



const Thought = model('thought', thoughtSchema);

module.exports = Thought;