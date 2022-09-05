const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 12,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
