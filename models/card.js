const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Fill Card Name Field'],
    minlength: [2, 'Card Name Length Must Be More Then 2'],
    maxlength: [30, 'Card Name Length Must Not Be More Then 30'],
  },
  link: {
    type: String,
    required: [true, 'Please Fill Card Link Field'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
