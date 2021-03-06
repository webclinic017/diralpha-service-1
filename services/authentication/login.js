const { User } = require('../../models');
const jwtService = require('./jwt');

const loginService = {
  failedLoginResponse: {
    user: null,
    success: false,
    message: 'Incorrect email address or password.',
    timestamp: Date.now(),
    token: null,
  },

  sucessfulLoginResponse(emailAddress, token) {
    return {
      user: {
        emailAddress,
      },
      success: true,
      message: 'Successful login.',
      timestamp: Date.now(),
      token,
    };
  },

  async login(emailAddress, password) {
    const userRecord = await User.findOne({ where: { emailAddress } });

    // if no user record found, return 401 error response
    if (userRecord === null) {
      return this.failedLoginResponse;
    }

    const isValidPassword = await userRecord.isValidPassword(password);

    // if incorrect password, send 401 error response
    if (!isValidPassword) {
      return this.failedLoginResponse;
    }
    // Successful login
    userRecord.updateLastLogin();

    // generate JWT token from jwt service
    const token = jwtService.generateBearerToken(userRecord);

    return this.sucessfulLoginResponse(emailAddress, token);
  },

};

module.exports = loginService;
