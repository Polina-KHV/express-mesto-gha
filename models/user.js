const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const { regex } = require('../config/config');
const { UnauthorizedError } = require('../config/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'User Name Length Must Be More Then 1'],
    maxlength: [30, 'User Name Length Must Not Be More Then 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'About Field Length Must Be More Then 1'],
    maxlength: [30, 'About Field Length Must Not Be More Then 30'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url) {
        const reg = regex.url;
        return reg.test(url);
      },
      message: 'Please Enter A Valid Link',
    },
  },
  email: {
    type: String,
    required: [true, 'Please Fill Email Field'],
    unique: [true, 'User With This Email Already Exists'],
    validate: {
      validator: (email) => isEmail(email),
      message: 'Please Enter A Valid Email Adress',
    },
  },
  password: {
    type: String,
    required: [true, 'Please Fill Password Field'],
    select: false,
  },
}, { toJSON: { useProjection: true }, toObject: { useProjection: true } });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Wrong Email Or Password');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Wrong Email Or Password');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
