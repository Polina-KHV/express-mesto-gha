const NotFoundError = require('./not-found-error');
const BadRequestError = require('./bad-request-error');
const UnauthorizedError = require('./unauthorized-error');
const ConflictError = require('./conflict-error');
const ForbiddenError = require('./forbidden-error');

module.exports = {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  ForbiddenError,
};
