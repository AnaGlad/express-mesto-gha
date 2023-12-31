const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (url) => isURL(url),
        message: 'Неправильный формат URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    createdAt: {
      default: Date.now,
      type: Date,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
