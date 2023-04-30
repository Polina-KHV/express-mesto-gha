const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const { userFullInfoSchema } = require('./middlewares/user-validation');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
// const BadRequestError = require('./errors/bad-request-error');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(cookieParser());
app.post('/signin', celebrate({ body: userFullInfoSchema }), login);
app.post('/signup', celebrate({ body: userFullInfoSchema }), createUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Page Not Found'));
});

// app.use((err, req, res, next) => {
//   try {
//     isCelebrateError(err);
//   } catch (e) {
//     const message = e.details.get('body').details.map((details) => details.message).join('; ');
//     throw new BadRequestError({ message });
//   }
//   return next(err);
// });

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
app.use(errors());

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
