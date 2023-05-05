const NotFoundError = require('../config/errors/not-found-error');
const BadRequestError = require('../config/errors/bad-request-error');
const UnauthorizedError = require('../config/errors/unauthorized-error');
const ConflictError = require('../config/errors/conflict-error');
const ForbiddenError = require('../config/errors/forbidden-error');

const handleNotFoundError = (message) => {
  throw new NotFoundError(message);
};

const handleBadRequestError = (message) => {
  throw new BadRequestError(message);
};

const handleUnauthorizedError = (message) => {
  throw new UnauthorizedError(message);
};

const handleConflictError = (message) => {
  throw new ConflictError(message);
};

const handleForbiddenError = (message) => {
  throw new ForbiddenError(message);
};

module.exports = {
  handleBadRequestError,
  handleUnauthorizedError,
  handleNotFoundError,
  handleConflictError,
  handleForbiddenError,
};
