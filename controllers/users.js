const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require('../config/errors');

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
        next(new NotFoundError('User Not Found'));
      } else {
        next(e);
      }
    });
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        next(new NotFoundError('User Not Found'));
      } else if (e.name === 'CastError') {
        next(new BadRequestError('Used Incorrect Id'));
      } else {
        next(e);
      }
    });
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
        next(new ConflictError('User With This Email Already Exists'));
      } else if (e.name === 'ValidationError') {
        const message = Object.values(e.errors).map((error) => error.message).join('; ');
        next(new BadRequestError(message));
      } else {
        next(e);
      }
    });
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
        next(new BadRequestError(message));
      } else if (e.name === 'DocumentNotFoundError') {
        next(new NotFoundError('User Not Found'));
      } else {
        next(e);
      }
    });
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
        next(new BadRequestError(message));
      } else if (e.name === 'DocumentNotFoundError') {
        next(new NotFoundError('User Not Found'));
      } else {
        next(e);
      }
    });
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
