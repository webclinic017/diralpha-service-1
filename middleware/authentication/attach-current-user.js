const { User } = require('../../models');

const failedAuthenticationResponse = {
  success: false,
  message: {
    content: 'Failed authentication by jwt.',
  },
};

const attachCurrentUser = async (req, res, next) => {
  const decodedTokenData = req.token.data;
  const userRecord = await User.findOne({ id: decodedTokenData.id });

  req.currentUser = userRecord;

  if (!userRecord) {
    return res.status(401).json(failedAuthenticationResponse);
  }
  return next();
};

module.exports = attachCurrentUser;
