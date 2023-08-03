const { celebrate, Joi } = require('celebrate');

const idUserValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(12),
  }),
});

module.exports = idUserValidation;
