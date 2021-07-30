const signupService = require('../../services/authentication/signup');
const loginService = require('../../services/authentication/login');

const authenticationController = {

  signup(req, res) {
    const { emailAddress, password } = req.body;

    const response = signupService.signup(emailAddress, password);

    res.json(response);
  },

  login(req, res) {
    const { emailAddress, password } = req.body;

    const response = loginService.login(emailAddress, password);

    const responseCode = response.success ? 200 : 401;

    res.status(responseCode).json(response);
  },

};

module.exports = authenticationController;
