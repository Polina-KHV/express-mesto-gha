const User = require('../models/user');
const {
  ERROR_INCORRECT,
  ERROR_NOTFOUND,
  ERROR_DEFAULT,
} = require('../error-codes');

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'Something Went Wrong' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'User Not Found' });
      } else if (e.name === 'CastError') {
        res.status(ERROR_INCORRECT).send({ message: 'Used Incorrect Id' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Something Went Wrong' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const message = Object.values(e.errors).map((error) => error.message).join('; ');
        res.status(ERROR_INCORRECT).send({ message });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Something Went Wrong' });
      }
    });
};

const updateUserInfo = (req, res) => {
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
        res.status(ERROR_INCORRECT).send({ message });
      } else if (e.name === 'CastError') {
        res.status(ERROR_INCORRECT).send({ message: 'Used Incorrect Id' });
      } else if (e.name === 'DocumentNotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'User Not Found' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Something Went Wrong' });
      }
    });
};

const updateUserAvatar = (req, res) => {
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
        res.status(ERROR_INCORRECT).send({ message });
      } else if (e.name === 'CastError') {
        res.status(ERROR_INCORRECT).send({ message: 'Used Incorrect Id' });
      } else if (e.name === 'DocumentNotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'User Not Found' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Something Went Wrong' });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
