const Card = require('../models/card');
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require('../config/errors');

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
        next(new BadRequestError(message));
      }
    });
};

const removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Can Remove Only Your Card');
      }
      return card.deleteOne()
        .then(() => {
          card.populate(['owner', 'likes'])
            .then(() => res.send({ data: card }));
        });
    })
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Card Not Found'));
      } else if (e.name === 'CastError') {
        next(new BadRequestError('Used Incorrect Id'));
      } else { next(e); }
    });
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
        next(new NotFoundError('Card Not Found'));
      } else if (e.name === 'CastError') {
        next(new BadRequestError('Used Incorrect Id'));
      }
    });
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
        next(new NotFoundError('Card Not Found'));
      } else if (e.name === 'CastError') {
        next(new BadRequestError('Used Incorrect Id'));
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
