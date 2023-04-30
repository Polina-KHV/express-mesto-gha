const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');

const handleAuthError = () => {
  throw new UnauthorizedError('Authorization Required');
};

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return handleAuthError();
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  return next();
};
