const { User } = require('../../../models');

const failedLoginResponse = {
  user: null,
  message: {
    content: 'Incorrect email address or password.',
  },
  token: null,
};

const sucessfulLoginResponse = (emailAddress) => ({
  user: {
    emailAddress,
  },
  message: {
    content: 'Successful login.',
  },
  token: 'SUPER SECRET JWT TOKEN',
});

const login = async (req, res) => {
  const { emailAddress, password } = req.body;

  const userRecord = await User.findOne({ where: { emailAddress } });

  if (userRecord === null) {
    res.json(failedLoginResponse);
    return;
  }

  const isValidPassword = await userRecord.isValidPassword(password);

  if (!isValidPassword) {
    res.json(failedLoginResponse);
    return;
  }
  // Successful login
  userRecord.updateLastLogin();

  res.json(sucessfulLoginResponse(emailAddress));
};

module.exports = login;
