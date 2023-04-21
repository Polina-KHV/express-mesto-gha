const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6440fb2e771a0e32961a6787'
  };
  next();
});
app.use(userRouter);
app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});