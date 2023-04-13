const { Schema, model } = require('mongoose');

// User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      Unique: true,
      Required: true,
      trim: true,
    },

    email: {
      type: String,
      Required: true,
      Unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
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

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

// export User Schema
module.exports = User;
