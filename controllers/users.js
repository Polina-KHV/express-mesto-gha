const User = require('../models/user.js');

const getUsers = (req, res) => {
  User.find()
  .then(users => res.send({data: users}))
  .catch(() => res.status(500).send({ message: 'Something went wrong' }))
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
  .orFail(() => {
    throw new Error('Not found');
  })
  .then(user => res.send({data: user}))
  .catch((e) => {
    if (e.message === 'Not found') {
      res.status(404).send({message: 'User not found'});
    } else {
      res.status(500).send({ message: 'Something went wrong' })
    }
  });
};

const createUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
  .then(user => res.status(201).send({data: user}))
  .catch((e) => {
    if (e.name === 'ValidationError') {
      const message = Object.values(e.errors).map(error => error.message).join('; ');
      res.status(400).send({message});
    } else {
      res.status(500).send({ message: 'Something went wrong' })
    }
  })
};
 
const updateUserInfo = (req, res) => {
  const {name, about} = req.body;

  User.findByIdAndUpdate(req.user._id, {name, about}, {
    new: true,
    runValidators: true
})
  .orFail(() => {
    throw new Error('Not found');
  })
  .then(user => res.status(200).send({data: user}))
  .catch((e) => {
    if (e.name === 'ValidationError') {
      const message = Object.values(e.errors).map(error => error.message).join('; ');
      res.status(400).send({message});
    } else if (e.message === 'Not found') {
      res.status(404).send({message: 'User not found'});
    } else {
      res.status(500).send({ message: 'Something went wrong' })
    }
  })
};

const updateUserAvatar = (req, res) => {
  const {avatar} = req.body;

  User.findByIdAndUpdate(req.user._id, {avatar}, {
    new: true,
    runValidators: true
})
  .orFail(() => {
    throw new Error('Not found');
  })
  .then(user => res.status(200).send({data: user}))
  .catch((e) => {
    if (e.name === 'ValidationError') {
      const message = Object.values(e.errors).map(error => error.message).join('; ');
      res.status(400).send({message});
    } else if (e.message === 'Not found') {
      res.status(404).send({message: 'User not found'});
    }  else {
      res.status(500).send({ message: 'Something went wrong' })
    }
  })
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar
}