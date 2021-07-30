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
      },
    };
  },

  async signup(req, res) {
    const { emailAddress, password } = req.body;

    const isUnique = await this.isUniqueEmail(emailAddress);

    if (!isUnique) {
      res.json(this.failedSignupResponse);
    } else {
    // no need to await, can do async
    // if this throws error, use try/catch and send code 500 error response
      User.create({ emailAddress, password });

      res.json(this.sucessfulSignupResponse(emailAddress));
    }
  },
};

module.exports = signupService;
