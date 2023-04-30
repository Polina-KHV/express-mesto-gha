const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const app = express();
app.use(cookieParser());

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
