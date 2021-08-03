const userSignupSchema = require('../../../schemas/authentication/user-auth');

const authValidation = {
  validate(req, res, next) {
    const validationObj = { body: req.body };

    const { error } = userSignupSchema.validate(validationObj);
    if (!error) {
      next();
    } else {
      res.status(422).send(error);
    }
  },
};
module.exports = authValidation;
