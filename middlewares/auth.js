const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const handleAuthError = () => {
  throw new UnauthorizedError('Authorization Required');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  next();
};
