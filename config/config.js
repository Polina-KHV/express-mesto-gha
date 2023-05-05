module.exports = {
  global: {
    PORT: process.env.PORT || 3000,
  },
  db: {
    url: 'mongodb://127.0.0.1:27017/mestodb',
  },
  regex: {
    url: /https?:\/\/(?:www\.)?[-a-zA-Z0-9$+._~*:/?#[\]@!&',;=()]+/,
    objectId: /^[0-9a-fA-F]{24}$/,
  },
};
