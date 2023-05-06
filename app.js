const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, isCelebrateError } = require('celebrate');
const { global, db } = require('./config/config');
const { userFullInfoSchema } = require('./middlewares/user-validation');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { userRouter, cardRouter } = require('./routes');
const { NotFoundError, BadRequestError } = require('./config/errors');

const app = express();

mongoose.connect(db.url);

app.use(express.json());
app.use(cookieParser());

app.post('/signin', celebrate({ body: userFullInfoSchema }), login);
app.post('/signin', celebrate({ body: userFullInfoSchema }), login);
app.post('/signup', celebrate({ body: userFullInfoSchema }), createUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Page Not Found'));
});

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    let message;
    if (err.details.has('body')) {
      message = err.details.get('body').details.map((details) => details.message).join('; ');
    } else if (err.details.has('params')) {
      message = err.details.get('params').details.map((details) => details.message).join('; ');
    }
    next(new BadRequestError(message));
  }
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Something Went Wrong'
        : message,
    });
  next();
});

app.listen(global.PORT, () => {
  console.log('Server started on port', global.PORT);
});
