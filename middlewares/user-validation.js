const { Joi } = require('celebrate');

const userFullInfoSchema = Joi.object().keys({
  email: Joi.string().required().email().messages({
    'string.empty': 'Please Fill Email Field',
    'any.required': 'Please Fill Email Field',
    'string.email': 'Please Enter A Valid Email Adress',
  }),
  password: Joi.string().required().min(2).messages({
    'string.empty': 'Please Fill Password Field',
    'string.required': 'Please Fill Password Field',
    'string.min': 'Password Length Must Be More Then 1',
  }),
  name: Joi.string().min(2).max(30).messages({
    'string.empty': 'Please Fill User Name Field',
    'string.min': 'User Name Length Must Be More Then 1',
    'string.max': 'User Name Length Must Not Be More Then 30',
  }),
  about: Joi.string().min(2).max(30).messages({
    'string.empty': 'Please Fill About Field',
    'string.min': 'About Field Length Must Be More Then 1',
    'string.max': 'About Field Length Must Not Be More Then 30',
  }),
  avatar: Joi.string().pattern(/https?:\/\/(?:www\.)?[-a-zA-Z0-9$+._~*:/?#[\]@!&',;=()]+/).messages({
    'string.empty': 'Please Fill Avatar Field',
    'string.pattern.base': 'Please Enter A Valid Link',
  }),
});

const userProfilInfoSchema = Joi.object().keys({
  name: Joi.string().min(2).max(30).messages({
    'string.empty': 'Please Fill User Name Field',
    'string.min': 'User Name Length Must Be More Then 1',
    'string.max': 'User Name Length Must Not Be More Then 30',
  }),
  about: Joi.string().min(2).max(30).messages({
    'string.empty': 'Please Fill About Field',
    'string.min': 'About Field Length Must Be More Then 1',
    'string.max': 'About Field Length Must Not Be More Then 30',
  }),
});

const userAvatarSchema = Joi.object().keys({
  avatar: Joi.string().pattern(/https?:\/\/(?:www\.)?[-a-zA-Z0-9$+._~*:/?#[\]@!&',;=()]+/).messages({
    'string.empty': 'Please Fill Avatar Field',
    'string.pattern.base': 'Please Enter A Valid Link',
  }),
});

module.exports = {
  userFullInfoSchema,
  userProfilInfoSchema,
  userAvatarSchema,
};
