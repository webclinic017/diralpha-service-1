const signupService = require('../../services/authentication/signup');
const loginService = require('../../services/authentication/login');

const authenticationController = {

  signup(req, res) {
    signupService.signup(req, res);
  },

  login(req, res) {
    loginService.login(req, res);
  },

};

module.exports = authenticationController;
