const { User } = require('../../models');

const failedAuthorizationResponse = {
  success: false,
  message: 'Failed authorization by token.',
  timestamp: Date.now(),
};

const attachCurrentUser = async (req, res, next) => {
  const decodedTokenData = req.token.data;
  const userRecord = await User.findOne({ id: decodedTokenData.id });

  req.currentUser = userRecord;

  if (!userRecord) {
    return res.status(401).json(failedAuthorizationResponse);
  }
  return next();
};

module.exports = attachCurrentUser;
