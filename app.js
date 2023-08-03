const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const createUserValidation = require('./validation/createUserValidation');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();

// app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, 'public'));

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use(routes);
app.use(errors());
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
