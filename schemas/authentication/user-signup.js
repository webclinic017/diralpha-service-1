const Joi = require('joi');

const userSignupSchema = Joi.object({
  body: Joi.object({
    emailAddress: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .alphanum()
      .required(),
  }),
});

module.exports = userSignupSchema;
