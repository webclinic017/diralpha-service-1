const { User } = require('../../models');

const attachCurrentUser = async (req, res, next) => {
  const decodedTokenData = req.tokenData;
  const userRecord = await User.findOne({ id: decodedTokenData.id });

  req.currentUser = userRecord;

  if (!userRecord) {
    return res.status(401).end('User not found');
  }
  return next();
};

module.exports = attachCurrentUser;
