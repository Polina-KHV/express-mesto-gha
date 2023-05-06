const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const {
  UnauthorizedError,
} = require('../config/errors');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError('Authorization Required');
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Authorization Required');
  }

  req.user = payload;

  return next();
};
