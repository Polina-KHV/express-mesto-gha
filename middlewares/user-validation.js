const { Joi } = require('celebrate');
const { regex } = require('../config/config');

const userFullInfoSchema = Joi.object().keys({
  email: Joi.string().required().email().messages({
    'string.empty': 'Please Fill Email Field',
    'any.required': 'Please Fill Email Field',
    'string.email': 'Please Enter A Valid Email Adress',
  }),
  password: Joi.string().required().min(2).messages({
    'string.empty': 'Please Fill Password Field',
    'any.required': 'Please Fill Password Field',
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
  avatar: Joi.string().pattern(regex.url).messages({
    'string.empty': 'Please Fill Avatar Field',
    'string.pattern.base': 'Please Enter A Valid Link',
  }),
});

const userProfilInfoSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(30)
    .messages({
      'string.empty': 'Please Fill User Name Field',
      'any.required': 'Please Fill User Name Field',
      'string.min': 'User Name Length Must Be More Then 1',
      'string.max': 'User Name Length Must Not Be More Then 30',
    }),
  about: Joi.string().required().min(2).max(30)
    .messages({
      'string.empty': 'Please Fill About Field',
      'any.required': 'Please Fill About Field',
      'string.min': 'About Field Length Must Be More Then 1',
      'string.max': 'About Field Length Must Not Be More Then 30',
    }),
});

const userAvatarSchema = Joi.object().keys({
  avatar: Joi.string().required().pattern(regex.url).messages({
    'string.empty': 'Please Fill Avatar Field',
    'any.required': 'Please Fill Avatar Field',
    'string.pattern.base': 'Please Enter A Valid Link',
  }),
});

const userIdSchema = Joi.object().keys({
  userId: Joi.string().required().pattern(regex.objectId).messages({
    'any.required': 'User Id Is Required',
    'string.pattern.base': 'Please Enter A Valid User Id',
  }),
});

module.exports = {
  userFullInfoSchema,
  userProfilInfoSchema,
  userAvatarSchema,
  userIdSchema,
};
