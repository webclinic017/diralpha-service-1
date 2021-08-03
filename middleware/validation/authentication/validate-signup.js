const userSignupSchema = require('../../../schemas/authentication/user-signup');

const signupValidation = {
  validate(req, res, next) {
    const validationObj = { body: req.body };

    const { value, error } = userSignupSchema.validate(validationObj);
    if (!error) {
      next(value);
    } else {
      res.status(422).send(error);
    }
  },
};
module.exports = signupValidation;
