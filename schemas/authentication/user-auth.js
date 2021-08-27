const Joi = require('joi');

const userAuthSchema = Joi.object({
  body: Joi.object({
    emailAddress: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
  }),
});

module.exports = userAuthSchema;
