const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '64b52cb90c57cf52e045f8e0',
  };

  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
