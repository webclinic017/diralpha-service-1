// const joi = require('joi');

const accountValidation = {

  validate(req, res, next) {
    console.log('HI VALIDATOR!');
    next();
  },

};

module.exports = accountValidation;
