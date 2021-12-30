const { Schema, model } = require('mongoose');

// Schema to create a course model
const userSchema = new Schema(
  {    
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'A valid email address is required']
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