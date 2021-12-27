const { Schema, model } = require('mongoose');
const reactionSchema = require('./Thought');

// Schema to create a course model
const userSchema = new Schema(
  {    
    username: {
        type: String,
        required: true,
        unique: true,
        //trimmed
      },

      email: {
        type: String,
        required: true,
        unique: true,
        //trimmed
      },

      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],

      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thought',
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
  
  //Create friendCount virtual
  userSchema
    .virtual('friendCount')
    .get(function () {
      return `${this.friends.length}`;
    })

const User = model('user', userSchema);

module.exports = User;