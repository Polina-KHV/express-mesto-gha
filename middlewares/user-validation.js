const { Joi } = require('celebrate');

const userFullInfoSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(2),
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string(),
});

const userProfilInfoSchema = Joi.object().keys({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
});

const userAvatarSchema = Joi.object().keys({
  avatar: Joi.string(),
});

module.exports = {
  userFullInfoSchema,
  userProfilInfoSchema,
  userAvatarSchema,
};
