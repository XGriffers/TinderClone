// ./models/users_Model.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  interests: { type: String, required: true },
  // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
