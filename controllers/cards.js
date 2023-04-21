const Card = require('../models/card');
const {
  ERROR_INCORRECT,
  ERROR_NOTFOUND,
  ERROR_DEFAULT,
} = require('../error-codes');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'Something Went Wrong' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const message = Object.values(e.errors).map((error) => error.message).join('; ');
        res.status(ERROR_INCORRECT).send({ message });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Something Went Wrong' });
      }
    });
};

const removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Card Not Found' });
      } else if (e.name === 'CastError') {
        res.status(ERROR_INCORRECT).send({ message: 'Used Incorrect Id' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Something Went Wrong' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Card Not Found' });
      } else if (e.name === 'CastError') {
        res.status(ERROR_INCORRECT).send({ message: 'Used Incorrect Id' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Something Went Wrong' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Card Not Found' });
      } else if (e.name === 'CastError') {
        res.status(ERROR_INCORRECT).send({ message: 'Used Incorrect Id' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Something Went Wrong' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
};
