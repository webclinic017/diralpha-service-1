const accountCreationSchema = require('../../../schemas/accounts/account-creation');

const accountValidation = {

  validate(req, res, next) {
    const { error } = accountCreationSchema.validate(req.body);

    if (!error) {
      next();
    } else {
      res.status(422).send(error);
    }
  },

};

module.exports = accountValidation;
