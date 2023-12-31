const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const createUserValidation = require('./validation/createUserValidation');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();

app.use(bodyParser.json());

app.post('/signin', createUserValidation, login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
