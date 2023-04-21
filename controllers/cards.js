const Card = require('../models/card.js');

const getCards = (req, res) => {
  Card.find()
  .then(cards => res.send({data: cards}))
  .catch(() => res.status(500).send({ message: 'Something went wrong' }))
};

const createCard = (req, res) => {
  const {name, link} = req.body;

  Card.create({name, link, owner: req.user._id})
  .then(card => res.status(201).send({data: card}))
  .catch((e) => {
    if (e.name === 'ValidationError') {
      const message = Object.values(e.errors).map(error => error.message).join('; ');
      res.status(400).send({message});
    } else {
      res.status(500).send({ message: 'Something went wrong' })
    }
  })
};

const removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .orFail(() => {
    throw new Error('Not found');
  })
  .then(card => res.status(200).send({data: card}))
  .catch((e) => {
    if (e.message === 'Not found') {
      res.status(404).send({message: 'Card not found'});
    } else {
      res.status(500).send({ message: 'Something went wrong' })
    }
  })
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .orFail(() => {
    throw new Error('Not found');
  })
  .then(card => res.status(200).send({data: card}))
  .catch((e) => {
    if (e.message === 'Not found') {
      res.status(404).send({message: 'Card not found'});
    } else {
      res.status(500).send({ message: 'Something went wrong' })
    }
  })
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .orFail(() => {
    throw new Error('Not found');
  })
  .then(card => res.status(200).send({data: card}))
  .catch((e) => {
    if (e.message === 'Not found') {
      res.status(404).send({message: 'Card not found'});
    } else {
      res.status(500).send({ message: 'Something went wrong' })
    }
  })
};

module.exports = {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard
}