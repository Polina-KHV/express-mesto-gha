const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  handleBadRequestError,
  handleNotFoundError,
  handleConflictError,
} = require('../utils/handleErrors');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .end();
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const message = Object.values(e.errors).map((error) => error.message).join('; ');
        handleBadRequestError(message);
      }
      next(e);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        handleNotFoundError('User Not Found');
      }
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        handleNotFoundError('User Not Found');
      } else if (e.name === 'CastError') {
        handleBadRequestError('Used Incorrect Id');
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((e) => {
      if (e.code === 11000) {
        handleConflictError('User With This Email Already Exists');
      } else if (e.name === 'ValidationError') {
        const message = Object.values(e.errors).map((error) => error.message).join('; ');
        handleBadRequestError(message);
      }
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const message = Object.values(e.errors).map((error) => error.message).join('; ');
        handleBadRequestError(message);
      } else if (e.name === 'DocumentNotFoundError') {
        handleNotFoundError('User Not Found');
      }
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const message = Object.values(e.errors).map((error) => error.message).join('; ');
        handleBadRequestError(message);
      } else if (e.name === 'DocumentNotFoundError') {
        handleNotFoundError('User Not Found');
      }
    })
    .catch(next);
};

module.exports = {
  login,
  getUsers,
  getCurrentUser,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
