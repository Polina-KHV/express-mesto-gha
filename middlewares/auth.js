const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { handleUnauthorizedError } = require('../utils/handleErrors');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return handleUnauthorizedError('Authorization Required');
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return handleUnauthorizedError('Authorization Required');
  }

  req.user = payload;

  return next();
};
