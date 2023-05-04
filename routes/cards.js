const cardRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { cardSchema, cardIdSchema } = require('../middlewares/card-validation');
const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', celebrate({ body: cardSchema }), createCard);
cardRouter.delete('/:cardId', celebrate({ params: cardIdSchema }), removeCard);
cardRouter.put('/:cardId/likes', celebrate({ params: cardIdSchema }), likeCard);
cardRouter.delete('/:cardId/likes', celebrate({ params: cardIdSchema }), dislikeCard);

module.exports = cardRouter;
