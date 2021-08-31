const accountUpdateSchema = require('../../../schemas/accounts/account-update');

const accountCreationUpdateValidation = {

  validate(req, res, next) {
    const { error } = accountUpdateSchema.validate(req.body);

    if (!error) {
      next();
    } else {
      res.status(422).send(error);
    }
  },

};

module.exports = accountCreationUpdateValidation;
