const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards.js');
const cardRouter = require('express').Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', removeCard);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRouter;