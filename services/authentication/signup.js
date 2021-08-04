const { User } = require('../../models');

const signupService = {

  isUniqueEmail(emailAddress) {
    return User.findOne({ where: { emailAddress } })
      .then((token) => token !== null)
      .then((found) => !found);
  },

  failedSignupResponse: {
    user: null,
    success: false,
    message: {
      content: 'Failed signup. This email address is already in use.',
      timestamp: Date.now(),
    },
  },

  sucessfulSignupResponse(emailAddress) {
    return {
      user: {
        emailAddress,
      },
      success: true,
      message: {
        content: 'Successful signup.',
        timestamp: Date.now(),
      },
    };
  },

  async signup(emailAddress, password) {
    const isUnique = await this.isUniqueEmail(emailAddress);

    if (!isUnique) {
      return this.failedSignupResponse;
    }
    // no need to await, can do async
    // if this throws error, use try/catch and send code 500 error response
    User.create({ emailAddress, password });

    return this.sucessfulSignupResponse(emailAddress);
  },
};

module.exports = signupService;
