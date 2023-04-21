const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Fill User Name Field'],
    minlength: [2, 'User Name Length Must Be More Then 2'],
    maxlength: [30, 'User Name Length Must Not Be More Then 30'],
  },
  about: {
    type: String,
    required: [true, 'Please Fill About Field'],
    minlength: [2, 'About Length Must Be More Then 2'],
    maxlength: [30, 'About Length Must Not Be More Then 30'],
  },
  avatar: {
    type: String,
    required: [true, 'Please Fill Avatar Field'],
  },
});

module.exports = mongoose.model('user', userSchema);
