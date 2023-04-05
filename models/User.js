const { Schema, model } = require('mongoose');
const userSchema = new Schema({
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
});


const User = model('User', userSchema);

module.exports = User;