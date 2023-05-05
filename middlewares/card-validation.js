const { Joi } = require('celebrate');
const { regex } = require('../config/config');

const cardSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(30)
    .messages({
      'string.empty': 'Please Fill Card Name Field',
      'any.required': 'Please Fill Card Name Field',
      'string.min': 'Card Name Length Must Be More Then 1',
      'string.max': 'Card Name Length Must Not Be More Then 30',
    }),
  link: Joi.string().required().pattern(regex.url).messages({
    'string.empty': 'Please Fill Card Link Field',
    'any.required': 'Please Fill Card Link Field',
    'string.pattern.base': 'Please Enter A Valid Card Link',
  }),
});

const cardIdSchema = Joi.object().keys({
  cardId: Joi.string().required().pattern(regex.objectId).messages({
    'any.required': 'Card Id Is Required',
    'string.pattern.base': 'Please Enter A Valid Card Id',
  }),
});

module.exports = {
  cardSchema,
  cardIdSchema,
};
