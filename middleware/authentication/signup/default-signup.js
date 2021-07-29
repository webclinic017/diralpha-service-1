const { User } = require('../../../models');

const isUniqueEmail = (emailAddress) => User.findOne({ where: { emailAddress } })
  .then((token) => token !== null)
  .then((found) => !found);

const failedSignupResponse = {
  user: null,
  message: {
    content: 'Failed signup. This email address is already in use.',
  },
};

const sucessfulSignupResponse = (emailAddress) => ({
  user: {
    emailAddress,
  },
  message: {
    content: 'Successful signup.',
  },
});

const signupErrorResponse = (error) => ({
  user: null,
  message: {
    content: `An error occured: ${error}.`,
  },
});

const signup = async (req, res) => {
  const { emailAddress, password } = req.body;

  const isUnique = await isUniqueEmail(emailAddress);

  if (!isUnique) {
    res.json(failedSignupResponse);
  } else {
    try {
      await User.create({ emailAddress, password });
      res.json(sucessfulSignupResponse(emailAddress));
    } catch (error) {
      res.json(signupErrorResponse(error));
    }
  }
};

module.exports = signup;
