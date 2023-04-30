const cardRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { cardSchema } = require('../middlewares/card-validation');
const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', celebrate({ body: cardSchema }), createCard);
cardRouter.delete('/:cardId', removeCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;
