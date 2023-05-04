const { Joi } = require('celebrate');

const cardSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(30)
    .messages({
      'string.empty': 'Please Fill Card Name Field',
      'any.required': 'Please Fill Card Name Field',
      'string.min': 'Card Name Length Must Be More Then 1',
      'string.max': 'Card Name Length Must Not Be More Then 30',
    }),
  link: Joi.string().required().pattern(/https?:\/\/(?:www\.)?[-a-zA-Z0-9$+._~*:/?#[\]@!&',;=()]+/).messages({
    'string.empty': 'Please Fill Card Link Field',
    'any.required': 'Please Fill Card Link Field',
    'string.pattern.base': 'Please Enter A Valid Card Link',
  }),
});

const cardIdSchema = Joi.object().keys({
  cardId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
    'string.pattern.base': 'Please Enter A Valid Card Id',
  }),
});

module.exports = {
  cardSchema,
  cardIdSchema,
};
