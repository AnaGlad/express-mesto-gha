const { celebrate, Joi } = require('celebrate');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    about: Joi.string(),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\-._~:/?#[\]@!$&'(*+,;=]*)$/),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

module.exports = createUserValidation;
