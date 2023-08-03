const { celebrate, Joi } = require('celebrate');

const idCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(12),
  }),
});

module.exports = idCardValidation;
