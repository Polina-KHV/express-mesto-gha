const Card = require('../models/card');
const {
  handleBadRequestError,
  handleNotFoundError,
  handleForbiddenError,
} = require('../utils/handleErrors');

const getCards = (req, res, next) => {
  Card.find()
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      card.populate(['owner', 'likes'])
        .then(() => res.status(201).send({ data: card }));
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const message = Object.values(e.errors).map((error) => error.message).join('; ');
        handleBadRequestError(message);
      }
    })
    .catch(next);
};

const removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        handleForbiddenError('Can Remove Only Your Card');
      }
      card.deleteOne();
      card.populate(['owner', 'likes'])
        .then(() => res.send({ data: card }));
    })
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        handleNotFoundError('Card Not Found');
      } else if (e.name === 'CastError') {
        handleBadRequestError('Used Incorrect Id');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      card.populate(['owner', 'likes'])
        .then(() => res.send({ data: card }));
    })
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        handleNotFoundError('Card Not Found');
      } else if (e.name === 'CastError') {
        handleBadRequestError('Used Incorrect Id');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      card.populate(['owner', 'likes'])
        .then(() => res.send({ data: card }));
    })
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        handleNotFoundError('Card Not Found');
      } else if (e.name === 'CastError') {
        handleBadRequestError('Used Incorrect Id');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
};
