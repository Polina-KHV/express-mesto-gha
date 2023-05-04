const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find()
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const message = Object.values(e.errors).map((error) => error.message).join('; ');
        throw new BadRequestError({ message });
      }
    })
    .catch(next);
};

const removeCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Can Remove Only Your Card');
      }
      res.send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Card Not Found');
      } else if (e.name === 'CastError') {
        throw new BadRequestError('Used Incorrect Id');
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
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Card Not Found');
      } else if (e.name === 'CastError') {
        throw new BadRequestError('Used Incorrect Id');
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
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Card Not Found');
      } else if (e.name === 'CastError') {
        throw new BadRequestError('Used Incorrect Id');
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
