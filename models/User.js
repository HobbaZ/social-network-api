const { Schema, model } = require('mongoose');

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
          ref: 'User',
        },
      ],

      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
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