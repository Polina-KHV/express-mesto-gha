const { Joi } = require('celebrate');

const cardSchema = Joi.object().keys({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string(),
});

module.exports = {
  cardSchema,
};
